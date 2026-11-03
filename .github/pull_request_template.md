<!-- PR title must be a conventional commit (feat:, fix:, docs:, chore:, ...).
     Release Please builds CHANGELOG.md and version bumps from it. -->

## Summary

<!-- What changed and why. Link the issue if there is one. -->

## How it was tested

- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] Checked the changed pages in the browser, light and dark theme, phone width
- [ ] Lighthouse scores in the CI job summary look fine

## Checklist

- [ ] No secrets, API keys or tokens in code, logs or screenshots
- [ ] New pages pass SEO props (title, description, path)
- [ ] `.env.example` updated for new `NEXT_PUBLIC_*` variables
