# Intents Widget Skill

Claude Code skill for implementing the Aurora Labs Intents Swap Widget - a cross-chain token swapping component.

## Install (Claude Code)

```bash
git clone https://github.com/armanddid/intents-widget-skill.git
mkdir -p ~/.claude/skills
cp -R intents-widget-skill ~/.claude/skills/intents-widget
```

Then restart Claude Code and run `/skill` to see `intents-widget`.

## Commands

| Command | Description |
|---------|-------------|
| `/widget-demo` | Create a minimal Next.js demo page with the Intents swap widget |
| `/widget-config` | Generate widget configuration for standalone or dApp mode |

## Usage Examples

### Create a demo page
```
/widget-demo
```

### Generate configuration
```
/widget-config
```

Or just ask Claude about:
- Setting up the intents swap widget
- Configuring cross-chain token swapping
- Next.js App Router integration
- Troubleshooting widget issues

## Documentation

Full widget documentation: https://aurora-labs.gitbook.io/intents-swap-widget/

## License

MIT
