export const FRAMEWORK_OPTIONS = [
  { value: 'html-css', label: 'HTML + CSS' },
  { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
  { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
  { value: 'html-css-js', label: 'HTML + CSS + JS' },
  { value: 'html-tailwind-bootstrap', label: 'HTML + Tailwind + Bootstrap' },
];

export const GEMINI_MODEL = 'gemini-2.5-flash';

export const buildComponentPrompt = ({ prompt, framework }) => `
You are an experienced programmer with expertise in web development and UI/UX design.
You create modern, animated, and fully responsive UI components.

Generate a UI component for: ${prompt}
Framework to use: ${framework}

Requirements:
- The code must be clean, well-structured, and easy to understand.
- Optimize for SEO where applicable.
- Focus on creating a modern, animated, and responsive UI design.
- Include high-quality hover effects, shadows, animations, colors, and typography.
- Return ONLY the code, formatted properly in Markdown fenced code blocks.
- Do NOT include explanations, text, comments, or anything else besides the code.
- Provide the whole code in a single HTML file.
`;
