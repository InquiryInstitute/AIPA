---
title: "AI lecturer — terminal bridge"
---

# AI lecturer (overlay + IDE channel)

The **lecturer outer-frame** demo opens a **WebSocket** to the AI gateway (default `ws://127.0.0.1:8765`). On HTTPS (GitHub Pages), set repository secret **`AI_LECTURER_WS_URL`** to a **`wss://`** endpoint, or the browser will block mixed content.

- Gateway: `tools/ai-lecturer-gateway` in the AIPA repo (`npm start`).
- IDE channel: **aipa-lecturer-bridge** is bundled in the **inqspace** code-server image; set `aipaLecturer.ideCommandWebSocketUrl` in the editor to match the gateway.

<p><strong><a href="../../../../_static/lecturer-outer-frame-demo.html">Open the full outer-frame demo page</a></strong> (iframe + canvas + “AI demo” controls).</p>
