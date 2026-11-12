# fyy apple style — feedback and source references

## Sizing requirement

Import each complete source element from its original `.fig` node. Do not add per-element size ceilings, shrink-to-fit behavior, or crops. The importer preserves the full component's authored dimensions and does not auto-fit it to the target composition. If the target composition is smaller, enlarge the composition instead of resizing imported content. Image placement/scale inside a component continues to follow the original Figma node bounds so its source layout is reproduced.

Path geometry must remain centered at the shape anchor to prevent the previously reported offset/cropping problem. Use only original `.fig` files as importer sources; do not replace missing or unsupported content with hand-built art, SVG exports, or thumbnails. Clearly disclose any source effects/fonts that cannot be preserved faithfully/editably.

## User-reported glyph issue

![User-provided symbol/glyph bug screenshot](./bugsimbol.png)

The screenshot shows small, fragmented or box-like marks in icon/symbol positions among otherwise legible labels. The source `.fig` stores many icons as Private Use Area text glyphs; the earlier importer created ordinary AE text with a regular SF Pro font, so the host could show missing-glyph boxes instead of the Figma artwork. The importer now embeds the actual glyph-outline command blobs from the `.fig` source for all 104 PUA symbol text nodes in the 34-item catalog (21 codepoint/style outlines), then creates editable AE mask paths from those outlines. It no longer relies on a host SF Symbols font or replaces the icon with a hand-built asset.

A follow-up review found why the first vector attempt could produce blank icons: glyph vertices had been centered like AE shape-layer paths, but AE mask vertices use the solid's top-left source coordinates. The importer now builds mask paths in mask/source coordinates (without the shape-layer center offset) while sizing each mask solid to the full glyph outline. This correction passes syntax and structural checks; it still needs a visual run in EffectCraft/After Effects against this screenshot. If a glyph remains wrong, compare its `glyphKey`/source node outline—not a substitute icon—and preserve the complete source bounds.

## Supplied PSD/AI icon templates reviewed

Drive folder: [iOS 27 Icon Templates — Photoshop/Illustrator](https://drive.google.com/drive/folders/1f-7ci_79Tbx_EPz7cS5E284oqwlaC-ha?usp=drive_link).

- `App Icon Template.psd`: 1024 × 1024 RGB document with background, export groups/layers (PNG and SVG), grid smart object, and app-icon shape. Its visible composite is a construction grid with overlapping circles, not a finished icon.
- `App Icon Template.ai`: a PDF-compatible 1024 × 1024 page; its preview likewise shows the icon construction template.

These were inspected as references, not used as importer sources or substitutes. The importer remains `.fig`-only.

## Figma symbolic/emoji references

The Figma connector is unavailable in this session, so this is a bounded audit of locally available original `.fig` archives, not a live/exhaustive search of the user's Figma workspace.

- `Activity View.fig` and `Alert.fig` include Figma `SYMBOL` nodes and SF-system-style glyphs encoded as Private Use Area text. `Activity View.fig` includes a `_System Icons` section with named icons including Airdrop, Weather, Wallet, Photos, Music, Maps, and Calendar.
- `Button - Liquid Glass - Symbol.fig` is a symbol source whose thumbnail shows a blue circular button with a white checkmark.
- These archives confirm symbol references. No standalone emoji asset/reference was confirmed in the inspected files; this does not establish that none exists in the full Figma workspace. Private Use Area glyphs also depend on compatible fonts being available and mapped in the host.

## Follow-up acceptance checks

1. Import all source nodes at their complete authored bounds, with no auto-fit of the component and no added per-element ceilings/crops.
2. Confirm path points are centered; compare element bounds and placements with the `.fig` source.
3. Compare icon/symbol glyphs with original Figma nodes and fonts; do not silently replace missing glyphs.
4. Keep supported vectors and text editable; report unsupported effects and font limitations.
5. Verify visually in EffectCraft/After Effects. Existing parser/mock tests do not prove host-runtime compatibility.
