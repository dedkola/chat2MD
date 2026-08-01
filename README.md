# 💬 Chat2MD - ChatGPT & Claude to MDX/MD Converter

<div align="center">

### Transform your AI chats into beautiful Markdown files

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[![Deploy to Cloudflare Workers](https://img.shields.io/badge/Deploy-Cloudflare%20Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)

</div>

---

## 📸 Screenshot

<div align="center">
  <img src="./public/screenshot.png" alt="Chat2MD Interface" width="900px" />
</div>

## 🔒 Privacy First

**Your data never leaves your browser!** This app runs entirely client-side with zero server processing. All file parsing and conversion happens locally on your machine.

> 🛡️ **Don't trust us?** Run it locally! Clone the repo and run `npm install && npm run dev` - it's that simple.

A beautiful, modern web application that converts your exported ChatGPT and Claude conversation JSON files into clean, readable MDX or Markdown files. Perfect for Obsidian, documentation, or archiving your AI conversations.

## ✨ Features

- 🔒 **100% Client-Side** - Your data never touches a server, everything runs in your browser
- 🤖 **Multi-Platform Support** - Works with ChatGPT and Claude exports
- 📤 **Easy Upload** - Simply drag and drop your export JSON file
- 🎯 **Dual Format Support** - Export to MDX (with frontmatter) or standard Markdown
- 🔍 **Smart Filtering** - Search through conversations by title
- ✅ **Batch Selection** - Select multiple conversations and download as a ZIP
- 🎨 **Beautiful UI** - Clean, modern interface with Tailwind CSS
- ⚡ **Lightning Fast** - Built with Next.js 16 and React 19
- 📦 **ZIP Export** - Download multiple conversations at once
- 🌐 **Easy Deploy** - Deploy to Cloudflare Workers with OpenNext
- 📝 **Obsidian Ready** - Perfect for note-taking and knowledge management

## 🚀 Quick Start

### Prerequisites

- Node.js 22.x or higher
- pnpm 11.x (the pinned package manager for this repository)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/dedkola/chat2MD.git
cd chat2MD
```

2. Install dependencies:

```bash
pnpm install --frozen-lockfile
```

3. Run the development server:

```bash
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

### Exporting from ChatGPT

1. Go to ChatGPT Settings → Data Controls
2. Click "Export data"
3. Wait for the email with your data export
4. Extract the `conversations.json` file

### Exporting from Claude

1. Go to Claude Settings
2. Look for "Export data" or "Download conversations"
3. Save the JSON export file

### Converting to MDX/MD

1. Open the application
2. Choose your preferred output format (MDX or MD)
3. Upload your `conversations.json` file
4. Use the filter to search for specific conversations (optional)
5. Select conversations you want to export
6. Click "Download" to get your files

### Output Formats

#### MDX Format (with frontmatter)

```mdx
---
title: "Conversation Title"
date: "2024-11-05T19:50:35.972Z"
id: "conversation-id"
---

# Conversation Title

## User

Your question here...

## Assistant

AI response here...
```

#### MD Format (standard markdown)

```md
# Conversation Title

**Date:** 2024-11-05T19:50:35.972Z
**ID:** conversation-id

---

## User

Your question here...

## Assistant

AI response here...
```

## 🛠️ Built With

- **[Next.js 16](https://nextjs.org/)** - React framework
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Styling
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[JSZip](https://stuk.github.io/jszip/)** - ZIP file generation

## 📝 Scripts

```bash
# Development
pnpm run dev         # Start development server

# Production
pnpm run build       # Build the standard Next.js app
pnpm run start       # Run the standard Next.js production server

# Linting
pnpm run lint        # Run ESLint

# Cloudflare Workers
pnpm run preview     # Build and preview in the Workers runtime
pnpm run deploy      # Build and deploy to Cloudflare Workers
pnpm run upload      # Upload a Worker version without routing traffic
pnpm run cf-typegen  # Refresh Cloudflare binding types
```

## 🌍 Deployment

### Cloudflare Workers

This project uses the OpenNext adapter to deploy Next.js to Cloudflare Workers.
The first deployment creates the `chat2md` Worker and its `*.workers.dev`
subdomain. Authenticate once, then deploy:

```bash
pnpm wrangler login
pnpm run preview
pnpm run deploy
```

For Cloudflare Workers Builds, connect this repository and set the production
branch to `main`. Because this project uses the OpenNext adapter, the build
and deploy commands must run the OpenNext CLI (not the generic Next.js build
or `wrangler deploy` defaults):

| Setting | Command |
|---|---|
| Build command | `pnpm exec opennextjs-cloudflare build` |
| Deploy command | `pnpm exec opennextjs-cloudflare deploy` |
| Non-production branch deploy command | `pnpm exec opennextjs-cloudflare upload` |

Using the default `npx wrangler deploy` as the deploy command will fail because
wrangler auto-detects the OpenNext project but the build step has not produced
the `.open-next` output it expects.

This app does not require any Worker secrets or bindings. Add build variables
in Cloudflare before introducing server-side environment variables.

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with ❤️ using Next.js and React
- Icons by [Lucide](https://lucide.dev/)
- Inspired by the need to preserve ChatGPT conversations in a readable format

## 📧 Support

If you have any questions or run into issues, please [open an issue](https://github.com/dedkola/chat2MD/issues) on GitHub.


---

Made with ☕ and code + ❤️ by [dedkola](https://github.com/dedkola)
