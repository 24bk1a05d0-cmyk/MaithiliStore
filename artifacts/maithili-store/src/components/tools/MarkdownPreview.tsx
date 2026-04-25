import { useMemo, useState } from "react";

const SAMPLE = `# Maithili Store

Welcome to **Maithili Store** — har kaam ka tool.

## Features

- Free tools, no login
- Works in your browser
- *Hinglish* friendly

> Pehle tool, phir account.

\`\`\`js
const greet = (name) => \`Namaste, \${name}!\`;
\`\`\`

[Visit website](https://maithili.store) and check it out!
`;

function mdToHtml(md: string): string {
  let html = md;

  // escape
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // code fences
  html = html.replace(
    /```([\s\S]*?)```/g,
    (_m, code) =>
      `<pre class="bg-secondary/40 rounded-lg p-3 my-3 overflow-x-auto"><code class="font-mono text-xs">${code.trim()}</code></pre>`,
  );
  // inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-secondary/60 rounded px-1.5 py-0.5 font-mono text-[0.85em]">$1</code>',
  );
  // headings
  html = html.replace(/^###### (.*)$/gim, '<h6 class="font-serif font-semibold text-sm mt-3 mb-1">$1</h6>');
  html = html.replace(/^##### (.*)$/gim, '<h5 class="font-serif font-semibold text-base mt-3 mb-1">$1</h5>');
  html = html.replace(/^#### (.*)$/gim, '<h4 class="font-serif font-semibold text-lg mt-4 mb-2">$1</h4>');
  html = html.replace(/^### (.*)$/gim, '<h3 class="font-serif font-semibold text-xl mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.*)$/gim, '<h2 class="font-serif font-bold text-2xl mt-5 mb-2">$1</h2>');
  html = html.replace(/^# (.*)$/gim, '<h1 class="font-serif font-bold text-3xl mt-2 mb-3">$1</h1>');
  // blockquote
  html = html.replace(
    /^&gt; (.*)$/gim,
    '<blockquote class="border-l-4 border-primary pl-3 italic text-muted-foreground my-3">$1</blockquote>',
  );
  // bold + italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a class="text-primary underline" href="$2" target="_blank" rel="noreferrer">$1</a>',
  );
  // unordered list
  html = html.replace(/(?:^- .*(?:\n|$))+/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((line) => line.replace(/^- (.*)$/, '<li class="ml-4 list-disc">$1</li>'))
      .join("");
    return `<ul class="my-2">${items}</ul>`;
  });
  // paragraphs
  html = html
    .split(/\n{2,}/)
    .map((block) => {
      if (/^<(h\d|ul|ol|pre|blockquote)/.test(block.trim())) return block;
      return `<p class="my-2 leading-relaxed">${block.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");

  return html;
}

export function MarkdownPreview() {
  const [text, setText] = useState(SAMPLE);
  const html = useMemo(() => mdToHtml(text), [text]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Markdown
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={18}
          spellCheck={false}
          className="w-full resize-y rounded-xl border border-border bg-card p-4 font-mono text-sm outline-none focus:border-primary"
          data-testid="textarea-markdown-input"
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Preview
        </label>
        <div
          className="prose-sm h-full min-h-[420px] overflow-auto rounded-xl border border-border bg-card p-5 text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
