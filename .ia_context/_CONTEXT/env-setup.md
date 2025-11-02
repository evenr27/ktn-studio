# Environment Setup

## Requirements

- Node.js 20+
- PNPM or Yarn
- Docker Desktop
- Nx CLI

## Docker Services

- MongoDB with `init/` and `backups/`
- Postgres (optional)
- Mailpit (optional, for email flows)

## Commands

```bash
pnpm install
pnpm dev
```

## Development

- `nx serve ktn-studio` to start the main Next.js app.
- Environment variables: `.env.local` for frontend, `.env` for Docker services.
