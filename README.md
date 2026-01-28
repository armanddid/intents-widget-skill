# Intents Widget Skill

A Cursor/Claude skill for implementing the Aurora Labs Intents Swap Widget (`@aurora-is-near/intents-swap-widget`) - a cross-chain token swapping component.

## What This Skill Does

This skill provides comprehensive guidance for:
- Installing and configuring the Intents Swap Widget
- Setting up Next.js App Router integration (with SSR handling)
- Choosing between Standalone Mode and dApp Mode
- Configuring wallet connections, tokens, chains, and themes
- Troubleshooting common issues (state machine errors, hydration issues)

## Installation

### For Cursor

Copy the `SKILL.md` file to your skills directory:

```bash
# Personal skill (available across all projects)
mkdir -p ~/.cursor/skills/intents-widget
cp SKILL.md ~/.cursor/skills/intents-widget/

# Or project skill (shared with repo collaborators)
mkdir -p .cursor/skills/intents-widget
cp SKILL.md .cursor/skills/intents-widget/
```

### For Claude Code

Copy to your Claude skills directory:

```bash
mkdir -p ~/.claude/skills/intents-widget
cp SKILL.md ~/.claude/skills/intents-widget/
```

## Usage

Once installed, the skill automatically activates when you:
- Ask about implementing the intents swap widget
- Work with `@aurora-is-near/intents-swap-widget`
- Need help with cross-chain token swapping UI

Example prompts:
- "Help me set up the intents swap widget in my Next.js app"
- "How do I configure the widget for standalone mode?"
- "I'm getting a state machine error in the widget"

## Documentation

For full widget documentation, see: https://aurora-labs.gitbook.io/intents-swap-widget/

## License

MIT
