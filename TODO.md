# TODO

## Critical (MVP - Must Complete)

### Start Menu Foundation
- [x] Source and download Windows 98 icons for Start menu items (Programs, Documents, Settings, Find, Help, Run, Shut Down) to `static/img/win/`
- [ ] Create StartMenu.svelte component with basic structure: blue sidebar + menu items area
- [ ] Add Start menu open/close state in Taskbar.svelte (click Start to toggle)
- [ ] Style blue sidebar with "Windows 98" rotated text
- [ ] Add all menu items with icons: Programs, Documents, Settings, Find, Help, Run, Shut Down
- [ ] Style menu items with proper Windows 98 appearance (hover = blue bg + white text)
- [ ] **HARD STOP** - Verify Start menu opens/closes and looks authentic

### Start Menu Functionality
- [ ] Implement click-outside-to-close behavior for Start menu
- [ ] Add Programs submenu that expands on hover (arrow indicator on right)
- [ ] Add WordPad to Programs submenu with icon
- [ ] Wire WordPad click to open WordPad window AND close Start menu
- [ ] **HARD STOP** - Verify complete Start menu flow: open -> Programs -> WordPad -> window opens

## High Priority

### WordPad Menu Bar Dropdowns
- [ ] Update MenuBar.svelte to support dropdown menus (not just labels)
- [ ] Add menu state: which dropdown is open, hover-to-switch behavior
- [ ] Create dropdown styling matching Windows 98 (white bg, blue hover, divider lines)
- [ ] Add File menu items: New, Open, Save, Save As, [divider], Print, Print Preview, Page Setup, [divider], Exit
- [ ] Add Edit menu items: Undo, [divider], Cut, Copy, Paste, Paste Special, Clear, Select All, [divider], Find, Find Next, Replace
- [ ] Add View menu items: Toolbar, Format Bar, Ruler, Status Bar
- [ ] Add Insert menu items: Date and Time, Object
- [ ] Add Help menu items: Help Topics, About WordPad
- [ ] Implement click-outside-to-close for menu dropdowns
- [ ] **HARD STOP** - Verify all menus open, hover switches between them, looks authentic

## Medium Priority

### Polish & Mobile
- [ ] Ensure Start menu is touch-friendly on mobile (tap to open/close, tap Programs to expand)
- [ ] Verify WordPad text editing still works (typing, localStorage save/load)
- [ ] Test complete flow in browser: Start -> Programs -> WordPad -> type text -> File menu -> close
- [ ] **HARD STOP** - Full manual testing before completion

## Low Priority / Nice-to-Have
- [ ] Add subtle 3D beveled borders to Start menu if missing from 98.css
- [ ] Fine-tune spacing/padding to match Windows 98 pixel-perfectly

---
## Completed
(Tasks move here when done)
