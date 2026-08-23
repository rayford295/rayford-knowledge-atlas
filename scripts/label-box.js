// Node label geometry, shared by the layout pass in build-map.js and the
// overlap assertion in verify-atlas.js.
//
// Both files need the same answer to "do these two nodes collide?", and the
// answer is not "do the circles touch". The renderer draws a label at
// y = radius + 25 and a meta line at y = radius + 42, both text-anchor:middle
// (script.js), so a node's real footprint is a box wider than its circle and
// hanging below it. A pair of nodes can sit 70 units apart with clear air
// between the circles and still have their labels printed straight through
// each other -- which is exactly what went wrong in the atlas.
//
// script.js reserves labelHalf = 86 when it fits the viewBox. Treat that as
// the contract: no label may be wider than 172 units, so LABEL_HALF_BUDGET is
// both the truncation target and the width the layout can rely on.

const LABEL_HALF_BUDGET = 86;

// Manrope ExtraBold at 13px, least-squares fitted against the real getBBox()
// widths of all 46 rendered labels rather than guessed. The fit is what caught
// the class this model was originally missing: uppercase and digits are about
// 13% wider than lowercase, so caps-heavy labels (BEACON, RAPID, COVID) were
// being underestimated by up to 15% -- and an underestimate is the dangerous
// direction, because it reports "no collision" on labels that do collide.
// Reassuringly, the fit put fullwidth at exactly 13.0, i.e. one em.
const CHAR_PX = {
  space: 2.77,
  narrow: 4.24,    // i I l 1 j f t . , : ; ' ! | ( ) [ ]
  wide: 10.49,     // M W m w @ %
  upper: 8.56,
  lower: 7.59,
  digit: 8.55,
  fullwidth: 13.0, // CJK, kana, fullwidth punctuation -- one em each
  other: 4.55
};

// Residuals after fitting land within +/-6%. Round up so the model is never
// optimistic: over-reserving costs a little whitespace, under-reserving puts
// text back on top of text.
const SAFETY = 1.08;

const NARROW = new Set("iIl1jft.,:;'!|()[]".split(""));
const WIDE = new Set("MWmw@%".split(""));

function isFullWidth(char) {
  const code = char.codePointAt(0);
  return (
    (code >= 0x1100 && code <= 0x115f) ||   // Hangul Jamo
    (code >= 0x2e80 && code <= 0x9fff) ||   // CJK radicals through unified ideographs
    (code >= 0xa960 && code <= 0xa97f) ||
    (code >= 0xac00 && code <= 0xd7a3) ||   // Hangul syllables
    (code >= 0xf900 && code <= 0xfaff) ||   // CJK compatibility ideographs
    (code >= 0xfe30 && code <= 0xfe4f) ||   // CJK compatibility forms
    (code >= 0xff00 && code <= 0xff60) ||   // fullwidth forms
    (code >= 0xffe0 && code <= 0xffe6)
  );
}

function charWidth(char) {
  if (char === " ") return CHAR_PX.space * SAFETY;
  if (isFullWidth(char)) return CHAR_PX.fullwidth * SAFETY;
  if (NARROW.has(char)) return CHAR_PX.narrow * SAFETY;
  if (WIDE.has(char)) return CHAR_PX.wide * SAFETY;
  if (char >= "A" && char <= "Z") return CHAR_PX.upper * SAFETY;
  if (char >= "a" && char <= "z") return CHAR_PX.lower * SAFETY;
  if (char >= "0" && char <= "9") return CHAR_PX.digit * SAFETY;
  return CHAR_PX.other * SAFETY;
}

function textWidth(text) {
  return Array.from(String(text || "")).reduce((sum, char) => sum + charWidth(char), 0);
}

// Trim a label until it fits the renderer's 172-unit budget, preferring a word
// boundary so we never leave a cut like "Surveying attitudinal alignment
// between la". CJK has no spaces, so those fall back to a hard cut, which
// reads fine because each glyph is a unit of meaning on its own.
function truncateLabel(text) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  const limit = LABEL_HALF_BUDGET * 2;

  if (textWidth(clean) <= limit) {
    return clean;
  }

  const ellipsis = "...";
  const room = limit - textWidth(ellipsis);
  const chars = Array.from(clean);
  let width = 0;
  let cut = 0;

  while (cut < chars.length && width + charWidth(chars[cut]) <= room) {
    width += charWidth(chars[cut]);
    cut += 1;
  }

  const head = chars.slice(0, cut).join("");
  const lastSpace = head.lastIndexOf(" ");
  const atWord = lastSpace > limit / 4 ? head.slice(0, lastSpace) : head;

  return `${atWord.replace(/[\s,.:;-]+$/, "")}${ellipsis}`;
}

// Half-extents of the drawn footprint. Width is whichever is wider, the circle
// or the label; height runs from the top of the circle to below the meta line.
function halfWidth(node) {
  return Math.max(node.radius, textWidth(node.shortTitle) / 2);
}

function halfHeight(node) {
  return node.radius + 46;
}

// Axis-aligned boxes, so "clear" means clear on one axis or the other. Returns
// the overlap on each axis; either being <= 0 means the pair is fine.
function overlap(a, b) {
  const dx = Math.abs(a.position.x - b.position.x);
  const dy = Math.abs(a.position.y - b.position.y);

  return {
    x: halfWidth(a) + halfWidth(b) - dx,
    y: halfHeight(a) + halfHeight(b) - dy
  };
}

function overlaps(a, b) {
  const gap = overlap(a, b);
  return gap.x > 0 && gap.y > 0;
}

module.exports = {
  LABEL_HALF_BUDGET,
  textWidth,
  truncateLabel,
  halfWidth,
  halfHeight,
  overlap,
  overlaps
};
