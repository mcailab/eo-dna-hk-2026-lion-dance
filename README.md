# EO Discover North Asia — Hong Kong 2026 · Lion dance backdrop (chapters globe)

The opening section of the LED backdrop for the lion dance at the **EO Discover North Asia — Hong Kong · 30th Anniversary Celebration**.
A neon globe reveals the 25 EO chapters one by one. Each chapter gets an animated EO-ring marker and its name. All lines then converge on **Hong Kong**, the EO mark locks on, the event title appears, and the camera dives through the rings.

**Live page:** https://mcailab.github.io/eo-dna-hk-2026-lion-dance/. It has play/pause, a timeline and two downloads: **MP4 for LED** (starts from black, for the show) and **MP4 to share** (opens on the Hong Kong title, so chat apps show a proper thumbnail).

## Updating the chapters (no coding needed)
1. Open [`chapters.json`](chapters.json) on GitHub and click the ✎ pencil, or use **Edit chapters** on the live page.
2. Change what you need:
   - **Spelling / order:** edit or move the `"name"` lines. The video plays them top to bottom.
   - **Add a chapter:** copy a line, then change the name and the `lat` / `lon` (find them by searching "<city> coordinates").
   - **A chapter with no single location** (e.g. APAC BRIDGE): give it a name only, with no `lat` / `lon`.
   - **Speed:** `seconds_per_chapter` (0.6 = 0.6 s per chapter).
   - **Finale and event title:** `final` and `event_line_1` / `event_line_2`.
3. Click **Commit changes**. GitHub re-renders the MP4 automatically on 8 servers in parallel, which takes about 3–5 minutes (see the **Actions** tab). The page and the download then update.

Keep the commas and quotes as they are. If the Actions run fails, the JSON is usually missing a comma.

## Output
- 1920 × 1080, 30 fps, silent. The length depends on the number of chapters (≈ 26 s for 25).
- Black background with neon lines, designed for an LED wall behind live performers.

## Local preview
```bash
python3 -m http.server 8080   # then open http://localhost:8080
npm install && npm run export # renders eo-25-chapters-1080p.mp4 locally (needs Chrome + ffmpeg)
```

The EO ring mark is a recreation for preview. Swap in the official EO HK logo artwork for the final version.
