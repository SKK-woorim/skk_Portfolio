const blockReplacements: Array<[RegExp, string]> = [
  [/^### (.*)$/gm, '<h3>$1</h3>'],
  [/^## (.*)$/gm, '<h2>$1</h2>'],
  [/^# (.*)$/gm, '<h1>$1</h1>'],
  [/^\- (.*)$/gm, '<li>$1</li>']
];

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function applyInline(value: string) {
  return value
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

export function markdownToHtml(markdown: string) {
  const escaped = escapeHtml(markdown.trim());
  const withBlocks = blockReplacements.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    escaped
  );

  const lines = withBlocks.split('\n');
  const html: string[] = [];
  let listOpen = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      if (listOpen) {
        html.push('</ul>');
        listOpen = false;
      }
      continue;
    }

    if (trimmed.startsWith('<li>')) {
      if (!listOpen) {
        html.push('<ul>');
        listOpen = true;
      }
      html.push(applyInline(trimmed));
      continue;
    }

    if (listOpen) {
      html.push('</ul>');
      listOpen = false;
    }

    if (trimmed.startsWith('<h')) {
      html.push(applyInline(trimmed));
    } else {
      html.push(`<p>${applyInline(trimmed)}</p>`);
    }
  }

  if (listOpen) {
    html.push('</ul>');
  }

  return html.join('\n');
}
