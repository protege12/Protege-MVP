# Protégé — Design System (Working Spec)

Status: working draft for build. Wordmark pending; logo lockup section finalizes once the new wordmark exists. Everything else is locked.

This document is the source of truth for building Protégé's website and product UI. It's written to be handed to Claude Code. When a choice isn't covered here, default to the principles in section 1 and ask rather than improvise.

---

## 1. Principles

Five principles. Each one is a design decision, not a slogan. If a design choice can't be traced back to one of these, question it.

**1. Human, not algorithm.** The product is real feedback and human guidance, not matching software. Design should foreground people and actual work, not automated-feeling UI. No "smart match" cues, no algorithmic gloss. Show faces, portfolios, real critique.

**2. Made by hand.** The brand reads as built by a person, not generated. This is where the fold language and Bricolage's irregularity earn their place. Warmth and slight imperfection over machine-smooth polish.

**3. Local and real.** Indianapolis, in person. Concrete and place-specific beats generic and global. Favor real photography of real people and work over stock-feeling illustration.

**4. Bold and clear.** Confident, not timid. Strong orange, sharp edges, big type, high contrast. This is why the palette isn't pastel and the corners aren't rounded. The audience (16 to 21) is respected, not babied, and not talked down to with soft kid-brand cues.

**5. Restraint is craft.** The fold is an accent, not a texture. Whitespace is structural. One signature move per section. Overusing the brand's own devices is the fastest way to look amateur.

### What Protégé is not (drift guards)

These exist because they're easy to drift into. Design and copy should never imply any of them.

- Not remote. Local-first Indianapolis.
- Not a matching app. Real humans, real feedback.
- Not classes or courses.
- Not a content platform.
- Ages 16 to 21. Not for kids, not generically "everyone."

---

## 2. Color

### Core palette (locked)

| Token | Hex | Role |
|---|---|---|
| `--orange` | `#FF6723` | Primary brand. CTAs, accents, key surfaces. Never a variant of this value. |
| `--cream` | `#F2EDE4` | Primary surface and page background. |
| `--ink` | `#141412` | Primary text. Also used as a dark surface. |
| `--paper-white` | `#FFFFFF` | Optional secondary raised surface. Use sparingly; cream is the default surface. |

### Fold tints (confirm against logo vector before locking)

These are the two shades the fold mechanic reveals. Values are derived from our mocks, not sampled from the final logo. Sample the real vector and correct these before the PDF.

| Token | Hex (proposed) | Role |
|---|---|---|
| `--fold-light` | `#FFA170` | Lighter orange. The flap revealed when folding an orange surface. |
| `--fold-deep` | `#C44E14` | Deeper orange. Used in the logo's dog-ear and for warm accent text on cream (e.g. eyebrows). |

### Warm neutrals (for text and hairlines on cream)

Derived from the ink so grays stay warm, never blue-gray.

| Token | Hex | Role |
|---|---|---|
| `--ink-700` | `#4A443B` | Body text on cream. |
| `--ink-500` | `#6B6458` | Secondary text. |
| `--ink-400` | `#8A8275` | Muted text, labels, captions. |
| `--hairline` | `#DDD3C4` | Borders, dividers, fold creases on light surfaces. |

### Text-on-color rules (accessibility)

This is the one place the earlier mocks were wrong. Correct it here.

- **On orange (`#FF6723`):** use **ink** (`#141412`) for body and small text. Ink on orange clears WCAG AA. Cream/white on orange does **not** clear AA for normal text and is only acceptable for large display type (and even then, verify). Default to ink text on orange.
- **On ink (`#141412`):** use cream (`#F2EDE4`) for text. Orange (`#FF6723`) is fine for large display or accents on ink.
- **On cream (`#F2EDE4`):** ink for headings, `--ink-700` for body, `--ink-400` for muted.

Always run final pairings through a contrast checker. The notes above are guidance, not a substitute for verification.

---

## 3. Typography

Two fonts. Both free, open source, self-host them (don't hotlink a CDN in production).

### Fonts

- **Bricolage Grotesque** — display only. Headlines, hero, section titles, large numbers, pull quotes. Weights: 700, 800.
- **Work Sans** — everything else. Body, buttons, labels, captions, form fields, nav, data. Weights: 400, 500, 600.

### The boundary rule (non-negotiable)

Bricolage is for display moments only. The second it shows up in body text, buttons, or form labels, the system looks amateur. If you're unsure whether something is "display," it isn't. Use Work Sans.

Allowed for Bricolage: H1, H2, H3, hero headline, big stat numbers, pull quotes.
Banned for Bricolage: body copy, buttons, inputs, captions, nav links, table data, anything below ~20px.

### Type scale

Sizes in px for clarity; convert to rem at build (16px base). Line-heights unitless.

| Style | Font / weight | Size | Line height | Tracking |
|---|---|---|---|---|
| Display / H1 | Bricolage 800 | 48 (clamp 40–56) | 1.05 | -0.02em |
| H2 | Bricolage 700 | 34 | 1.1 | -0.02em |
| H3 | Bricolage 700 | 24 | 1.15 | -0.01em |
| Eyebrow | Work Sans 600 | 13 | 1.3 | 0.06em, uppercase |
| Body Large | Work Sans 400 | 18 | 1.6 | normal |
| Body | Work Sans 400 | 16 | 1.6 | normal |
| Body Small / caption | Work Sans 400 | 14 | 1.5 | normal |
| Button / UI label | Work Sans 500 | 15 | 1 | normal |

---

## 4. The fold (signature element)

The fold is Protégé's one distinctive device. It comes straight from the logo: flat planes, a corner folded to reveal a warmer shade. It is the brand's fingerprint, which is exactly why it has to be used with discipline.

### The three rules

1. **Folds reveal warmer or lighter, never an unrelated hue.** A fold on orange reveals `--fold-light`. A fold on ink reveals `--orange`. The reveal is always inside the warm family.
2. **Folds need contrast behind them.** Allowed on **orange** and **ink** surfaces. **Banned on cream and white** (the reveal disappears and it reads as a smudge). If a light surface needs a fold read, use a 1.5px `--hairline` crease line instead of a shade reveal.
3. **One fold per section.** It's an accent, not a pattern. One folded element per viewport zone. Never a grid of folded cards.

### Geometry

Default corner: **top-right.** Be consistent; only vary for a deliberate moment.

Fold size scales with the element:
- Small (chips, tags): 20px
- Medium (cards): 30px
- Large (hero panels): 42px+

### CSS mechanic

The element's corner is clipped at 45°; a triangle flap fills the inner half in the reveal shade.

```css
.fold {
  position: relative;
  /* cut the top-right corner; FOLD = fold size in px */
  clip-path: polygon(0 0, calc(100% - var(--fold)) 0, 100% var(--fold), 100% 100%, 0 100%);
}
.fold__flap {
  position: absolute;
  top: 0;
  right: 0;
  width: var(--fold);
  height: var(--fold);
  background: var(--fold-light); /* or --orange on an ink surface */
  clip-path: polygon(0 0, 100% 100%, 0 100%);
}
```

---

## 5. Shape and layout

### Corners: sharp everywhere

`border-radius: 0` on every element. Cards, buttons, inputs, images, containers, all of it. Folds are the only "corner treatment," and folds are straight cuts. Rounded corners fight the fold language; paper folds to a crease, it doesn't round. No exceptions without a reason written down.

### Structure: boxy and modular

Content lives in clean rectangular blocks. Bento-style modular grids are on-brand. Clear edges, strong blocks, generous cream breathing room between them. Whitespace is part of the system, not leftover space.

### Spacing scale

8px base with a 4px half-step. Use these values only: `4, 8, 12, 16, 24, 32, 48, 64, 96`.

### Depth

Flat. No drop shadows. Depth comes from the fold reveal and from flat color blocks layering, the way the logo works. If something needs to feel raised, use `--paper-white` on `--cream`, not a shadow.

---

## 6. Components (derived, brief)

**Buttons.** Sharp corners. Primary: `--orange` background, `--ink` text, Work Sans 500. Secondary: transparent with 1.5px `--ink` border, `--ink` text. No rounding, no shadow.

**Cards.** Sharp. Surface is cream, ink, or orange. Folds allowed only on ink and orange cards (rule 2). One folded card per row max; the rest stay flat.

**Inputs.** Sharp, 1.5px `--hairline` border, `--cream` or white fill, Work Sans body. Focus state uses `--orange` border.

**Nav.** Work Sans links, ink. Logo left. One primary CTA (orange or ink button) right.

---

## 7. Voice (rules, not copy)

These govern any copy that gets written. They don't authorize generating the copy here; they're the constraints it has to meet.

- No em dashes.
- No three-part lists for rhythm.
- No fake contrast ("Not X. Not Y. Just Z.").
- No vague positive filler.
- No over-smooth transitions.
- Direct, warm, bold. Surgical. Sounds like a person, not a brand committee.

---

## 8. Logo (pending wordmark)

**Mark:** the folded-paper P. Built from flat orange planes with lighter folded corners and a deep-orange dog-ear. Tested and legible at favicon size.

**Fold tints in the mark** are the reference for `--fold-light` and `--fold-deep`. Sample the final vector and reconcile section 2.

**Wordmark:** in progress. Not yet locked.

**To finalize once the wordmark exists:**
- Lockup (mark + wordmark spacing and alignment)
- Clear space (minimum padding around the lockup)
- Minimum sizes (mark alone, full lockup)
- Mark weight balance against the wordmark (the mark currently leans bottom-right; check it against text)
- Do/don't examples

---

## Open items before the guidelines PDF

1. Confirm `--fold-light` and `--fold-deep` against the real logo vector.
2. Lock the wordmark, then complete section 8.
3. Verify all text-on-color pairings with a contrast checker.
4. Decide whether `--paper-white` stays in the system or gets cut for simplicity.
