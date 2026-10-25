Late Batch is a bakery brand built from cut-paper capitals, a small warm palette and paper bags. Use it flat, warm and quiet: big letters, plain labels, real photographs.

## Content fundamentals

- Write the brand as "Late Batch Bakery" in running text. In the logo it is stacked as LATE / BATCH with BAKERY beneath; use the logo files, never retype it.
- Set product, flavour and category names in capitals: BREAD, COOKIES, CROISSANTS, BAGUETTE, LOAF, NY CHOCOLATE, WHITE CHOCOLATE, RED VELVET, NUTS, BUTTER, CHOCOLATE. They are plain nouns with no adjectives and no punctuation.
- Keep labels to the name and nothing else. Do not add taglines, exclamation marks or emoji to packaging, captions or menus.
- Write longer copy (web, email) in sentence case, short and plain, in `body`.

## Visual foundations

**Colour.** Grounds are `bg` (cornsilk, or dark-coffee in the dark theme) and `bg-raised` (cream, or crust-brown). Text is `fg`, with `fg-secondary` for captions. `rosy-copper` (`accent`) and `dark-cyan` are the two loud colours: use them as large fills, large display type and marks, not for small text. Put small text on a copper or cyan fill in `on-accent`.

**Category colours.** Each product family owns one colour, matching its bag: bread is `category-bread` (copper print on kraft), cookies are `category-cookies` (cream print on chocolate-brown), croissants are `category-croissants` (cream print on teal). Use it for the category title, the caption labels and the matching fill, never for another family.

**Logo on grounds.** Pick the ink from the logo sheet's pairs:

| Ground | Logo inks |
| --- | --- |
| `cream` / `cornsilk` | black, teal, copper, brown |
| `dark-cyan` | cream, sage |
| `ash-grey` | brown |
| `dark-coffee` | cream, copper, sage |
| `rosy-copper` | cream |

Do not put copper ink on teal, teal ink on copper, or any ink on a photograph that is not already part of a bag.

**Type.** Titles are set in `display-xl` to `display-sm`: the hand-cut display face Pagkaki, capitals only, never below 28px, one or two lines, tight leading. Everything else is Montserrat Regular: `body` for text, `label` for capital captions with wide tracking (0.2em), the same tracking as BAKERY in the logo. Montserrat is used at weight 400 only; for emphasis, switch to the display face, not bold. Both faces ship in `fonts/`; if Pagkaki fails to load, `display` falls back to Montserrat, which is not the brand look.

**Shape and surface.** Flat. No shadows, gradients, blurs or rounded corners on photos, bags, tiles or cards (`radius-none`). Separate areas with colour grounds and `space-8` or `space-12` gaps, not borders; use `hairline` only for quiet dividers.

**Imagery.** Photograph the product coming out of its bag, bag centred, on a warm beige or stone ground with soft side light and a few real crumbs on the surface (pistachio, chocolate, red-velvet crumb, nuts). Keep one product per frame, square or slightly portrait, and set a capital caption in `label` underneath, centred, in the category colour.

**Layout.** Centre-aligned. A category title sits on top, then a row of two to four equal photos with captions. White space is generous; the page ground is `bg`.

**Focus and states.** Focus ring: 2px solid `line`, offset 2px so it lands on `bg`. Primary buttons are `action` with `on-action` label; hover darkens nothing, it swaps to `accent` fill with `on-accent` label.

## Iconography

There is no icon font or sprite. The packaging carries hand-drawn single-ink outline drawings of the product (baguette, loaf, a cookie with chips, a croissant) with small burst ticks beside them, printed in the bag's print colour. Those drawings exist only inside the packaging photographs. Do not substitute an icon library or emoji; where an icon is unavoidable, use a plain outline glyph in `fg`.

## Assets

- `assets/Logos/`: the stacked logo in six single-ink files. Show them through `<img>`; choose the ink from the table above.
- `assets/Photography/`: nine packaging photographs, one per product, named for the product.
