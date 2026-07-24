# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/i18n.spec.ts >> Internationalization (i18n) Tests >> Pluralization: Correct grammatical rules
- Location: tests/i18n.spec.ts:66:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at /ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-linux64/chrome-headless-shell
╔════════════════════════════════════════════════════════╗
║ Looks like Playwright was just updated to 1.61.1.      ║
║ Please update docker image as well.                    ║
║ -  current: mcr.microsoft.com/playwright:v1.42.1-jammy ║
║ - required: mcr.microsoft.com/playwright:v1.61.1-jammy ║
║                                                        ║
║ <3 Playwright Team                                     ║
╚════════════════════════════════════════════════════════╝
```