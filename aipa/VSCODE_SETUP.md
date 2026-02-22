# VS Code / Cursor Setup for AIPA

## 1. Open the project

```bash
code /path/to/AIPA
# or
cursor /path/to/AIPA
```

Open the `aipa` folder (or the repo root if that contains `aipa`).

## 2. Install recommended extensions

When you open the workspace, VS Code/Cursor will prompt to install recommended extensions. Click **Install All**, or install manually:

- **AsciiDoc** (`asciidoctor.asciidoctor-vscode`) — preview, syntax highlighting, Kroki diagrams

## 3. Enable diagram preview (Kroki)

The workspace `.vscode/settings.json` enables Kroki:

```json
{
  "asciidoc.extensions.enableKroki": true
}
```

Kroki sends diagram source to https://kroki.io to render images. Ensure you have network access.

## 4. Preview AsciiDoc

1. Open an `.adoc` file (e.g., `part-i/ch01-intelligence-as-process/lecture-01.adoc`).
2. **Cmd+Shift+V** (Mac) or **Ctrl+Shift+V** (Windows/Linux) — toggle preview.
3. Or **Cmd+K V** (Mac) / **Ctrl+K V** (Windows/Linux) — preview to the side.

## 5. If diagrams show "Syntax Error" or "Assumed diagram type: component"

- The diagram block must specify the type: `[mermaid,...]` for Mermaid, `[plantuml,...]` for PlantUML.
- Mermaid is more reliable with the extension. PlantUML may fail on some Kroki servers.
- Refresh the preview after editing the diagram.
- Check that `asciidoc.extensions.enableKroki` is `true` in settings.

## 6. Running in Codespaces

Use the `.devcontainer/` configuration. The AsciiDoc extension is preinstalled. Open the project in a Codespace and the same setup applies.
