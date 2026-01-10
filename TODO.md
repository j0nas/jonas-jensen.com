# TODO

## Critical (MVP - Must Complete)

### Phase 1: Fix Visual Styling (THE MAIN ISSUE)
- [x] Remove 98.css button styling from DesktopIcon.svelte - reset all button borders, backgrounds, box-shadows to none
- [x] Verify default state: icon image + white text with black drop shadow, transparent background, NO borders
- [x] Remove any hover effects from desktop icons (no visual change on hover)
- [x] **HARD STOP** - Take screenshot, verify icons have NO button borders

### Phase 2: Selection State
- [x] Create a desktop selection store in `src/lib/stores/desktop.svelte.ts` to track selected icon IDs (Set)
- [x] Add `selected` prop to DesktopIcon component, wire to store
- [x] Add single-click handler to DesktopIcon that selects the icon (and deselects others unless Ctrl held)
- [x] Style selected icon text: navy blue (#000080) background with white text
- [x] Create 2x2px dithered blue checkerboard CSS pattern for selected icon overlay
- [x] Apply dithered overlay to icon image when selected (using ::after pseudo-element)
- [x] Add click handler on Desktop.svelte background to deselect all icons
- [x] **HARD STOP** - Verify clicking icon shows blue text highlight + dithered icon overlay

## High Priority

### Phase 3: Keyboard Navigation
- [x] Add tabindex to desktop icons for keyboard focus
- [x] Style focus state with 1px dotted black border around entire icon (distinct from selection)
- [x] Add Enter/Space handler to open app when icon is focused
- [x] Add ARIA labels to icons for screen readers
- [x] **HARD STOP** - Verify Tab navigates icons, Enter opens app, focus rectangle visible

### Phase 4: Multi-Select
- [ ] Implement Ctrl+click to toggle icon selection (add/remove from set)
- [ ] Implement Shift+click to select range of icons (requires tracking order)
- [ ] Create SelectionRectangle.svelte component for drag-select box
- [ ] Add mousedown/mousemove/mouseup handlers on Desktop for drag-select
- [ ] Style drag-select rectangle with animated "marching ants" dashed border
- [ ] Calculate which icons intersect with selection rectangle
- [ ] **HARD STOP** - Verify Ctrl+click toggles, drag-select works with animation

## Medium Priority

### Phase 5: Drag to Rearrange
- [ ] Add draggable behavior to DesktopIcon (mousedown starts drag)
- [ ] Show semi-transparent icon following cursor during drag
- [ ] Calculate drop position and snap to 75x75 pixel grid
- [ ] Update icon positions in store after drop
- [ ] When multiple icons selected, move all selected icons together
- [ ] Prevent drag from interfering with click-to-select
- [ ] **HARD STOP** - Verify icons can be dragged and snap to grid

### Phase 6: Additional Icons
- [ ] Download My Computer icon to `static/img/win/my-computer.png`
- [ ] Download Recycle Bin icon (empty) to `static/img/win/recycle-bin.png`
- [ ] Add "my-computer" app config in `src/lib/apps/index.ts` (placeholder window)
- [ ] Add "recycle-bin" app config (placeholder window)
- [ ] Add My Computer and Recycle Bin icons to Desktop.svelte
- [ ] **HARD STOP** - Verify all icons display and open placeholder windows

## Low Priority / Nice-to-Have
- [ ] Fine-tune dithered pattern to exactly match Win98 ILD_BLEND50 effect
- [ ] Add subtle icon label text-shadow refinements
- [ ] Consider arrow key navigation between icons

---
## Completed
(Tasks move here when done)
