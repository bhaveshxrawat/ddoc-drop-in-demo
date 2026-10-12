const SEED_HTML = `
<h1>Quarterly plan</h1>
<p>This document is the same in both demo apps. Resize the window, switch scenarios from the bar at the bottom, and watch how the editor sits inside the host app.</p>
<h2>Goals</h2>
<ul>
  <li>Ship the drop-in editor</li>
  <li>Embed it in the dashboard side panel</li>
  <li>Keep the host navbar and footer as ordinary layout</li>
</ul>
<h2>Milestones</h2>
<table>
  <tr><th>Milestone</th><th>Owner</th><th>Status</th></tr>
  <tr><td>Layout contract</td><td>Editor team</td><td>Done</td></tr>
  <tr><td>Optional UI state</td><td>Editor team</td><td>Done</td></tr>
  <tr><td>Host migration</td><td>App team</td><td>Next</td></tr>
</table>
<h2>Embedding</h2>
<pre><code class="language-tsx">&lt;div style={{ height: 480 }}&gt;
  &lt;DdocEditor /&gt;
&lt;/div&gt;</code></pre>
<h2>Notes</h2>
${Array.from(
  { length: 14 },
  (_, i) =>
    `<p>Paragraph ${i + 1}. Filler text so the document is long enough to scroll, which shows where the scrollbar lives and what stays pinned while it moves.</p>`,
).join('')}
<h2>Open questions</h2>
<p>Which host surfaces embed the editor first?</p>
`;

type EditorLike = {
  isDestroyed: boolean;
  commands: {
    setContent: (html: string) => boolean;
    focus: (position: 'start') => boolean;
  };
};

// Fill a brand-new document once; later loads come from IndexedDB.
export const seedOnce = (
  ddocId: string,
  getEditor: () => EditorLike | null | undefined,
) => {
  const flag = `ddoc-demo-seeded:${ddocId}`;
  if (localStorage.getItem(flag)) return () => {};

  let tries = 0;
  const timer = window.setInterval(() => {
    const editor = getEditor();
    if (editor && !editor.isDestroyed) {
      editor.commands.setContent(SEED_HTML);
      editor.commands.focus('start');
      localStorage.setItem(flag, '1');
      window.clearInterval(timer);
    } else if (++tries > 50) {
      window.clearInterval(timer);
    }
  }, 100);
  return () => window.clearInterval(timer);
};
