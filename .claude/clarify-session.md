# Discovery: Windows 98 UI - Fix Start Menu and Wordpad App Menu

Started: 2026-01-10

## Initial Context

User wants the app to look exactly like a Windows 98 UI. Current issues identified:
- Start menu looks completely off and doesn't work
- Wordpad app menu isn't right

## Questions Asked

1. What specific aspects of the Start menu look 'off' to you?
2. When you say the Start menu doesn't 'work', what behavior is missing?
3. What items should appear in the Start menu?
4. Should the Start menu have functional submenus (hover to expand)?
5. What's wrong with the WordPad menu bar currently?
6. Should the WordPad menu dropdowns have functional actions?
7. What apps should appear in the Programs submenu?
8. How should the Start menu close?
9. Should the Windows 98 Start menu have the classic blue sidebar with 'Windows 98' text?
10. Should clicking WordPad in Programs submenu open the app?
11. Should the other Start menu items (Documents, Settings, Help, etc.) do anything when clicked?
12. Should there be a 'Shut Down' dialog when clicking Shut Down?
13. What WordPad menu items should appear in the File dropdown?
14. Should each Start menu item have an icon next to it?

## Answers Received

1. Both styling and structure are wrong - colors, borders, fonts, AND layout (missing Programs, Documents, Settings sections)
2. Menu doesn't open at all - clicking Start does nothing
3. Authentic Windows 98 structure - Programs, Documents, Settings, Find, Help, Run, Shut Down
4. Only Programs submenu needs to expand, others can be flat or decorative
5. Both styling and dropdowns are wrong - needs visual fixes AND functional dropdown menus
6. Visual only, no actions - show authentic dropdown structure but items don't need to do anything
7. Just WordPad - only show the apps that have actually been built
8. Both methods - clicking outside OR clicking Start closes the menu
9. Yes, with Windows 98 branding - blue vertical bar on left with 'Windows 98' rotated text
10. Yes, and close Start menu - opens WordPad AND closes the Start menu
11. Nothing - purely decorative, they show but clicking has no effect
12. Do nothing - Shut Down is just a visual element
13. Authentic Windows 98 WordPad - New, Open, Save, Save As, Print, Print Preview, Page Setup, Exit
14. Yes, authentic icons - Programs folder, Documents folder, Settings gear, etc.
15. How should the WordPad menu dropdowns behave? - Click to open, hover between menus (click File to open, hover to Edit switches)
16. Should menu items show keyboard shortcuts? - No, keep it simple (just menu item names)
17. Do you have the Windows 98 icons? - Source from online (find from icon archives/resources)
18. Should menus have divider lines? - Yes, authentic separators (horizontal lines like real Windows 98)
19. What browsers need to be supported? - Modern browsers only (Chrome, Firefox, Safari, Edge latest)
20. Should the UI work on mobile/touch devices? - Basic mobile support (should be usable on phones/tablets)
21. On mobile, how should the Start menu behave? - Same as desktop, just touch-friendly
22. Should the WordPad text area remain functional? - Yes, keep editing and localStorage saving working
23. Are there any specific visual details you want to match exactly? - Use authentic Windows 98 as reference
24. What's the priority if we need to make tradeoffs? - Visual authenticity first (look exactly right, even if complex)
25. Should the Start button have the Windows flag logo? - Yes, Windows 98 logo (classic 4-color flag)
26. When a menu item is hovered, what's the highlight style? - Blue background with white text (classic Windows 98)
27. Are there other apps besides WordPad planned? - User ended discovery (implied: focus on current scope)
28. Should implementation be designed for easy addition of new apps? - Yes, make it modular

## Emerging Requirements

### Start Menu
- Fix visual styling (colors, borders, fonts) to match Windows 98
- Include classic blue sidebar with "Windows 98" rotated text
- Each menu item has authentic icons (Programs folder, Documents folder, Settings gear, etc.)
- Fix structure/layout with authentic Windows 98 items:
  - Programs (with expandable submenu containing just WordPad)
  - Documents
  - Settings
  - Find
  - Help
  - Run
  - Shut Down
- Implement click-to-open functionality
- Only Programs needs functional submenu with hover expansion
- Clicking WordPad opens the app AND closes the Start menu
- Other items are purely decorative (no action on click)
- Close behavior: click outside OR click Start button again

### WordPad Menu Bar
- Fix visual styling to match Windows 98
- Implement dropdown menus that open on click
- After first click, hover between menu items switches the dropdown
- Show authentic Windows 98 WordPad menu structure:
  - File: New, Open, Save, Save As, Print, Print Preview, Page Setup, Exit
  - Edit: (authentic items)
  - View: (authentic items)
  - Insert: (authentic items)
  - Help: (authentic items)
- Include divider lines between groups of items (authentic separators)
- No keyboard shortcuts displayed - keep it simple
- Menu items are visual only - no actions required

### Icons
- Source authentic Windows 98 icons from online archives/resources
- Needed for Start menu items: Programs, Documents, Settings, Find, Help, Run, Shut Down

### Technical Requirements
- Modern browsers only (Chrome, Firefox, Safari, Edge - latest versions)
- Basic mobile/touch support (should be usable on phones/tablets)
- Mobile Start menu: same as desktop, just touch-friendly
- Preserve WordPad functionality (text editing and localStorage saving must continue to work)

### Design Philosophy
- Visual reference: Authentic Windows 98 (match real Windows 98 as closely as possible)
- Priority when making tradeoffs: Visual authenticity first (look exactly right, even if complex)
- Start button: Include classic 4-color Windows 98 flag logo
- Hover highlight: Blue background with white text (classic Windows 98 selection style)
- Make implementation modular for easy addition of new apps

---

## Discovery Summary

Completed: 2026-01-10

### Scope
This discovery covered requirements for fixing the Windows 98 UI, specifically:
1. **Start Menu** - Complete rebuild with authentic Windows 98 styling and functionality
2. **WordPad Menu Bar** - Add functional dropdown menus with authentic appearance

### Key Decisions Made
- Visual authenticity is the top priority
- Start menu needs full Windows 98 structure with blue sidebar
- Only Programs submenu needs to be functional (opens WordPad)
- Menu dropdowns are visual only - no actions required
- Icons to be sourced from online archives
- Must maintain existing WordPad text editing functionality
- Basic mobile support with touch-friendly interactions
- Modular design for future app additions

### Gaps Remaining
- Specific authentic menu items for Edit, View, Insert, Help menus (can research from Windows 98 reference)
- Exact icon sources not yet identified
- No discussion of animations/transitions (assume none for authenticity)
