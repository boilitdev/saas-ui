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

# Start the development server
bun dev --filter @acme/web
bun dev --filter @acme/app
```
