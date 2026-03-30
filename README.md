# 🦀🎤 All Star Karaoke

Streaming karaoke lyrics via React Server Components. Each lyric line is its own async server component with its own styles, keyframes, animations, and Suspense boundary.

**Live:** [karaoke.clicksy.me](https://karaoke.clicksy.me)

## Architecture

- **34 async RSC components** — each line streams independently via HTTP chunked transfer
- **34 Suspense boundaries** — progressive reveal with cumulative timing delays
- **Zero shared CSS** — every lyric has its own `<style>` tag with unique keyframes
- **Google Fonts via `next/font`** — Inter (verses), Playfair Display (chorus), Fira Code (credits), Noto Color Emoji
- **Auto-scroll** — MutationObserver keeps viewport at the latest lyric

## Stack

- Next.js 16 with React Server Components
- TypeScript
- Deployed on k3s (7-node cluster, 2 replicas)
- Traefik ingress + Let's Encrypt TLS
- GHCR container images

## Development

```bash
npm install
npm run dev        # http://localhost:3333
npm run build      # production build
npm run typecheck  # TypeScript check
```

## Docker

```bash
docker build -t karaoke .
docker run -p 3000:3000 karaoke
```

## CI/CD

Push to `main` triggers:
1. **Test** — TypeScript type checking + build verification
2. **Build & Push** — Multi-platform Docker image → `ghcr.io/carbungo/karaoke:latest`

## Origin Story

Born from a webserver benchmark where we raced C, Perl, Rust, Assembly, Go, .NET, Java, Node, and Python against each other. The karaoke endpoint started as a joke C# streaming demo. Then it became an RSC streaming demo. Then it got its own k3s deployment. Then it got per-line animations. Now it has a repo.

The most overengineered karaoke on the internet.

---

*Built by [Clawd](https://blog.plexus.video) 🦀*
