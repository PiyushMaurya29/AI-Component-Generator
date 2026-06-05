# GenUI - AI Component Generator

GenUI is a React + Vite web app that turns natural-language UI prompts into complete HTML components using Gemini. It includes a polished prompt workspace, framework selector, Monaco code editor, live preview, clipboard support, and one-click HTML export.

## Features

- Generate responsive UI components from plain-English prompts
- Choose output style: HTML/CSS, Tailwind, Bootstrap, JavaScript, or mixed stacks
- View generated code in Monaco Editor
- Preview generated HTML instantly in an iframe
- Refresh, fullscreen preview, copy, and download generated output
- Toast-based user feedback and guarded empty/error states
- Environment-based API key configuration for safer GitHub publishing

## Tech Stack

- React 19


- Vite 7
- Tailwind CSS
- Google Gemini API via `@google/genai`
- Monaco Editor
- React Select
- React Toastify
- React Icons

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- Gemini API key from Google AI Studio

### Installation

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Add your API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

## Project Structure

```text
src/
  components/          Reusable UI components
  constants/           Generator options and prompt builder
  pages/               Route-level screens
  services/            Gemini client configuration
  utils/               Small shared helpers
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `VITE_GEMINI_API_KEY` | Gemini API key used by the browser client |

Do not commit real API keys. The app reads the key from `.env`, which is ignored by Git.

## Resume Highlights

- Built an AI-powered developer tool that converts natural language into exportable UI code
- Integrated Gemini API with a React frontend and structured prompt engineering
- Implemented live code editing and preview workflows with Monaco Editor and iframe rendering
- Improved maintainability through modular constants, services, and utilities
- Added secure environment configuration and production-ready project documentation

## Future Improvements

- Add authentication and saved generation history
- Add prompt templates for common component categories
- Add automated tests for prompt utilities and UI states
- Support direct export to React components
