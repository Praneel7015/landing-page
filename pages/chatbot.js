import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import linksStyles from '../styles/links.module.css';

// Configure the chat endpoint via env var; falls back to localhost for dev
const CHAT_ENDPOINT = process.env.NEXT_PUBLIC_CHATBOT_ENDPOINT || 'http://localhost:5678/webhook/chat';

// Tiny markdown parser for bold/italic/inline & fenced code
function parseMarkdown(text) {
  if (!text) return '';
  return text
    // fenced code blocks ```code```
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // bold **text** or __text__
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    // italics *text* or _text_ (non-greedy, not overlapping bold)
    .replace(/(?<!\*)\*(?!\*)([^*\n]+?)\*(?!\*)/g, '<em>$1</em>')
    .replace(/(?<!_)_(?!_)([^_\n]+?)_(?!_)/g, '<em>$1</em>')
    // inline code `code`
    .replace(/`([^`\n]+?)`/g, '<code>$1</code>')
    // line breaks
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome',
      sender: 'bot',
      html: `<div class="markdown" style="text-align:center; color: var(--muted-text);">
        <h4 style="color: var(--text); margin-bottom: 0.25rem; font-weight: 700;">Hi There👋 I am Praneel-Bot!</h3>
        <p style="font-size: 0.95rem;">This is the start of our legendary conversation!</p>
      </div>`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [scrollMax, setScrollMax] = useState('72vh');

  const listRef = useRef(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const max = 140;
    el.style.height = Math.min(el.scrollHeight, max) + 'px';
  }, [input]);

  // Dynamic max-height for the messages scroll area for responsiveness
  useEffect(() => {
    const update = () => {
      const vh = typeof window !== 'undefined' ? window.innerHeight : 700;
  const px = Math.max(360, Math.floor(vh * 0.72));
      setScrollMax(`${px}px`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Smooth-scrolling to the bottom when messages or typing changes
  useEffect(() => {
    const sc = scrollRef.current;
    if (!sc) return;
    // use requestAnimationFrame to ensure DOM painted
    requestAnimationFrame(() => {
      sc.scrollTo({ top: sc.scrollHeight, behavior: 'smooth' });
    });
  }, [messages, typing]);

  const timeNow = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const pushMessage = useCallback((msg) => {
    setMessages((m) => [...m, { id: Math.random().toString(36).slice(2), ...msg }]);
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    // push the users message
    pushMessage({ sender: 'user', text, time: timeNow() });
    setInput('');
    setLoading(true);
    setTyping(true);

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      const reply = typeof data?.reply === 'string' && data.reply.trim().length > 0
        ? data.reply
        : "I didn't receive a proper response. Please try again.";
      pushMessage({ sender: 'bot', html: `<div class="markdown">${parseMarkdown(reply)}</div>`, time: timeNow() });
    } catch (e) {
      const msg = `⚠️ **Connection Error**: ${e.message}\n\nPlease check your connection and try again.`;
      pushMessage({ sender: 'bot', html: `<div class="markdown">${parseMarkdown(msg)}</div>`, time: timeNow() });
    } finally {
      setTyping(false);
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [CHAT_ENDPOINT, input, loading, pushMessage]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Styles aligned with existing theme variables and components
  const styles = useMemo(() => ({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    backLinkBlockTop: { marginTop: '0.5rem', marginBottom: '0.75rem' },
    backLinkBlockBottom: { marginTop: '1rem' },
    backLink: {
      border: '1px solid var(--border)',
      borderRadius: 10,
      padding: '8px 12px',
      textDecoration: 'none',
      color: 'var(--text)'
    },
    pane: {
      border: '1px solid var(--border)',
      borderRadius: 12,
      background: 'var(--bg)',
      overflow: 'hidden',
      marginTop: '1rem',
      transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 12px',
      borderBottom: '1px solid var(--border)',
      transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease'
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: 12 },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 999,
      objectFit: 'cover',
      display: 'block',
      border: '1px solid var(--border)',
      transition: 'border-color 0.25s ease'
    },
    headerTitle: { fontWeight: 700, color: 'var(--text)', margin: 0, marginTop: 6 },
    headerSub: { color: 'var(--muted-text)', fontSize: 12 },
    scroll: {
      // maxHeight set dynamically via scrollMax
      overflowY: 'auto',
      background: 'var(--bg)',
      transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease'
    },
    messages: { padding: '12px' },
    messageRow: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12, width: '100%' },
    rowAlign: (owner) => ({ alignItems: owner === 'user' ? 'flex-end' : 'flex-start' }),
    meta: (owner) => ({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      justifyContent: owner === 'user' ? 'flex-end' : 'flex-start',
      textAlign: owner === 'user' ? 'right' : 'left',
      width: '100%'
    }),
    metaAvatar: {
      width: 18,
      height: 18,
      borderRadius: 999,
      objectFit: 'cover',
      display: 'block',
      border: '1px solid var(--border)'
    },
    bubble: (owner) => ({
      padding: '10px 12px',
      borderRadius: 14,
      border: '1px solid var(--border)',
      background: owner === 'user' ? 'var(--hover-bg)' : 'transparent',
      color: 'var(--text)',
      maxWidth: '85%',
      alignSelf: owner === 'user' ? 'flex-end' : 'flex-start',
      ...(owner === 'user' ? { borderBottomRightRadius: 6 } : { borderBottomLeftRadius: 6 }),
      transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease'
    }),
    author: { fontWeight: 600, color: 'var(--text)', fontSize: 14 },
    time: { color: 'var(--muted-text)', fontSize: 12 },
    inputBar: {
      display: 'flex',
      gap: 10,
      padding: 12,
      borderTop: '1px solid var(--border)',
      background: 'var(--bg)',
      transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease'
    },
    textarea: {
      flex: 1,
      minHeight: 44,
      maxHeight: 140,
      border: '1px solid var(--border)',
      borderRadius: 10,
      padding: '10px 12px',
      background: 'var(--bg)',
      color: 'var(--text)',
      resize: 'none',
      outline: 'none',
      font: 'inherit',
      transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease'
    },
    sendBtn: (disabled) => ({
      // visually align with .linkButton from links.module.css
      border: '1px solid var(--border)',
      borderRadius: 10,
      padding: '12px 16px',
      background: 'transparent',
      color: 'var(--text)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.7 : 1,
      fontWeight: 600,
      transition: 'background-color 0.12s ease, transform 0.08s ease, border-color 0.15s ease',
      width: 'auto',
      flexShrink: 0
    }),
    typing: {
      color: 'var(--muted-text)',
  fontStyle: 'normal',
  fontSize: 14,
  paddingLeft: 4,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontWeight: 400
    }
  }), []);

  return (
  <Layout showBackLink={false} showCountdownFooter={false} compactHeader>
      <Head>
    <title>{`${siteTitle} Chatbot`}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>

        <div style={styles.pane}>
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <img src="/images/profile.jpg" width={56} height={56} alt="Praneel" style={styles.avatar} />
              <div>
                <p style={styles.headerTitle}>Praneel-Bot</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ ...styles.scroll, maxHeight: scrollMax }} aria-live="polite">
            <div ref={listRef} style={styles.messages}>
              {messages.map((m) => (
                <div key={m.id} style={{ ...styles.messageRow, ...styles.rowAlign(m.sender) }}>
                  <div style={styles.meta(m.sender)}>
                    {m.sender === 'user' ? (
                      <img src="/images/profile-photo.svg" alt="You" style={styles.metaAvatar} />
                    ) : (
                      <img src="/images/profile.jpg" alt="Praneel-Bot" style={styles.metaAvatar} />
                    )}
                    <span style={styles.author}>{m.sender === 'user' ? 'You' : 'Praneel-Bot'}</span>
                    {m.time && <span style={styles.time}>{m.time}</span>}
                  </div>
                  <div
                    style={styles.bubble(m.sender)}
                    dangerouslySetInnerHTML={{ __html: m.html ?? (m.text ? `<div>${m.text.replace(/</g, '&lt;')}</div>` : '') }}
                  />
                </div>
              ))}

              {typing && (
                <div style={{ ...styles.messageRow, ...styles.rowAlign('bot') }}>
                  <div style={styles.meta('bot')}>
                    <img src="/images/profile.jpg" alt="Praneel-Bot" style={styles.metaAvatar} />
                    <span style={styles.author}>Praneel-Bot</span>
                    <span style={styles.time}>{timeNow()}</span>
                  </div>
                  <div style={styles.bubble('bot')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={styles.typing}>typing</span>
                      <span className="typingDots" aria-hidden>
                        <span className="typingDot" />
                        <span className="typingDot" />
                        <span className="typingDot" />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div style={styles.inputBar}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              style={styles.textarea}
              placeholder="Type your message…"
              rows={1}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || input.trim().length === 0}
              style={styles.sendBtn(loading || input.trim().length === 0)}
              aria-label="Send message"
              className={linksStyles.linkButton}
            >
              {loading ? 'Sending…' : 'Send'}
            </button>
          </div>
        </div>
      </section>

      <div style={styles.backLinkBlockBottom}>
        <Link href="/" style={styles.backLink}>
          ← Back to home
        </Link>
      </div>

      {/* Scoped styles for typing dots animation */}
      <style jsx global>{`
        .typingDots {
          display: inline-flex;
          gap: 4px;
        }
        .typingDot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--muted-text);
          animation: pb-bounce 1.4s infinite ease-in-out;
        }
        .typingDot:nth-child(2) { animation-delay: 0.2s; }
        .typingDot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pb-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Layout>
  );
}
