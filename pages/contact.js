import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import linksStyles from '../styles/links.module.css';
import contactStyles from '../styles/contact.module.css';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

// Prefer configuring via env: NEXT_PUBLIC_CONTACT_LAMBDA_URL
const LAMBDA_URL = process.env.NEXT_PUBLIC_CONTACT_LAMBDA_URL || '';

export default function Contact() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: '', type: '' }); // type: 'success' | 'error'

  const messageRef = useRef(null);

  const resetMessage = () => setFormMessage({ text: '', type: '' });

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const scrollToMessage = () => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showMessage = (text, type) => {
    setFormMessage({ text, type });
    // Auto-hide after 10s
    setTimeout(() => setFormMessage({ text: '', type: '' }), 10000);
  };

  useEffect(() => {
    if (formMessage.text) {
      scrollToMessage();
    }
  }, [formMessage.text]);

  // Prefetch /cal for instant navigation
  useEffect(() => {
    router.prefetch('/cal').catch(() => {});
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessage();

    // Validate email format
    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    if (!LAMBDA_URL) {
      showMessage('Contact endpoint is not configured.', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(LAMBDA_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        showMessage('Message sent successfully! Thank you for reaching out.', 'success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        showMessage('Failed to send message. Please try again.', 'error');
      }
    } catch (err) {
      showMessage('Network error. Please check your connection and try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Reusable input styles using theme variables
  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid var(--border)',
    borderRadius: 10,
    background: 'var(--bg)',
    color: 'var(--text)',
    fontSize: '1rem',
  };

  const labelStyle = {
    fontWeight: 600,
    marginBottom: 6,
    color: 'var(--text)'
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  };

  const messageBoxStyle = (type) => ({
    display: formMessage.text ? 'block' : 'none',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: '10px 12px',
    marginTop: '10px',
    color: type === 'success' ? 'var(--success-text)' : 'var(--error-text)',
    backgroundColor: type === 'success' ? 'var(--success-bg)' : 'var(--error-bg)',
    fontWeight: 600,
  });

  return (
    <Layout
      showBackLink
      showCountdownFooter={false}
      backLinkExtra={(
        <a
          href="/cal"
          className={`${linksStyles.linkButton} ${contactStyles.inlineSchedule}`}
        >
          Schedule Call
        </a>
      )}
    >
      <Head>
        <title>{`Contact | ${siteTitle}`}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <h3 className={utilStyles.headingLg} style={{ marginTop: 0 }}>Get In Touch</h3>
        <p className={utilStyles.lightText}>Have a question or want to connect? Send me a message!</p>

        {/* Form message container */}
        <div
          id="form-message"
          role="status"
          aria-live="polite"
          ref={messageRef}
          style={messageBoxStyle(formMessage.type)}
        >
          {formMessage.text}
        </div>

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12 }}>
          <div className="form-group" style={formGroupStyle}>
            <label htmlFor="name" style={labelStyle}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              placeholder="Your name"
            />
          </div>

          <div className="form-group" style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="you@example.com"
              inputMode="email"
              autoComplete="email"
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            />
          </div>

          <div className="form-group" style={formGroupStyle}>
            <label htmlFor="message" style={labelStyle}>Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="How can I help?"
            />
          </div>

          <button
            type="submit"
            className={linksStyles.linkButton}
            disabled={loading}
            style={{ alignSelf: 'flex-start', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>
      <a
        href="/cal"
        className={`${linksStyles.linkButton} ${contactStyles.floatingSchedule}`}
      >
        Schedule Call
      </a>
    </Layout>
  );
}