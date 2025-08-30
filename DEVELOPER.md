# Developer Guide

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)
- [bun](https://bun.sh/docs/installation)

**Note:** We recommend using bun for local development.

### Setup

```sh
# Install dependencies
pnpm install

# Check TypeScript types
bun check-types

# Start the development servers
bun dev --filter @acme/web
bun dev --filter @acme/app
```
