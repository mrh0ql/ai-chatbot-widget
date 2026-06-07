# AI Chatbot Widget

A lightweight, embeddable AI chat widget in pure vanilla JavaScript. Drop one line into any website and get a floating chat bubble powered by your AI backend.

## Features
- Single-file, no dependencies, no build step
- Floating chat bubble + slide-up panel
- Customizable title and API endpoint via data attributes
- Works with any backend that returns `{ "reply": "..." }`

## Install
Add one line before `</body>`:
```html
<script src="widget.js" data-endpoint="/api/chat" data-title="Chat with us"></script>
```

## Backend
The widget POSTs `{ "message": "..." }` to your endpoint and expects `{ "reply": "..." }` back. Wire it to OpenAI, your own model, or any API.

## Demo
Open `index.html` to see it live.

## Selling this as a service
- Install ($150): add the widget to a client's site, wired to their backend.
- Standard ($300): include a hosted serverless endpoint + branding.
- Premium ($500): custom knowledge base, lead capture, and analytics.

## License
MIT
