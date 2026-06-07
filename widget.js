/**
 * AI Chatbot Widget - drop-in embeddable chat bubble.
 * Usage: <script src="widget.js" data-endpoint="/api/chat"></script>
 */
(function () {
  const script = document.currentScript;
  const endpoint = script.getAttribute('data-endpoint') || '/api/chat';
  const title = script.getAttribute('data-title') || 'Chat with us';

  const style = document.createElement('style');
  style.textContent = `
    #aicw-bubble{position:fixed;bottom:20px;right:20px;width:56px;height:56px;border-radius:50%;background:#d4a017;color:#1a1a1a;font-size:24px;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.3);z-index:9999}
    #aicw-panel{position:fixed;bottom:88px;right:20px;width:340px;max-height:480px;background:#1a1a1a;color:#eee;border-radius:14px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.4);z-index:9999;font-family:sans-serif}
    #aicw-head{background:#d4a017;color:#1a1a1a;padding:12px 16px;font-weight:600}
    #aicw-msgs{flex:1;overflow-y:auto;padding:12px;font-size:14px}
    .aicw-m{margin:6px 0;padding:8px 12px;border-radius:10px;max-width:80%}
    .aicw-u{background:#d4a017;color:#1a1a1a;margin-left:auto}
    .aicw-b{background:#333}
    #aicw-in{display:flex;border-top:1px solid #333}
    #aicw-in input{flex:1;background:#222;color:#eee;border:none;padding:12px}
    #aicw-in button{background:#d4a017;color:#1a1a1a;border:none;padding:0 16px;cursor:pointer}
  `;
  document.head.appendChild(style);

  const bubble = document.createElement('button');
  bubble.id = 'aicw-bubble';
  bubble.textContent = '💬';
  const panel = document.createElement('div');
  panel.id = 'aicw-panel';
  panel.innerHTML = `<div id="aicw-head">${title}</div><div id="aicw-msgs"></div><div id="aicw-in"><input placeholder="Type a message..."/><button>Send</button></div>`;
  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  bubble.onclick = () => { panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex'; };
  const msgs = panel.querySelector('#aicw-msgs');
  const input = panel.querySelector('input');
  const send = panel.querySelector('button');

  function add(text, who) {
    const d = document.createElement('div');
    d.className = 'aicw-m ' + (who === 'user' ? 'aicw-u' : 'aicw-b');
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  async function handle() {
    const text = input.value.trim();
    if (!text) return;
    add(text, 'user');
    input.value = '';
    try {
      const r = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await r.json();
      add(data.reply || 'No response', 'bot');
    } catch (e) {
      add('Error reaching server.', 'bot');
    }
  }
  send.onclick = handle;
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handle(); });
})();
