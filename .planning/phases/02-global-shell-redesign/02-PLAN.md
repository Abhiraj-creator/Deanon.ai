---
phase: 2
name: Global Shell Redesign
wave: 1
depends_on: [1]
files_modified:
  - client/src/components/layout/NavigationRail.tsx
  - client/src/components/layout/TopBar.tsx
  - client/src/components/layout/MobileNavigation.tsx
  - client/src/layouts/MainLayout.tsx
  - client/src/components/layout/PageHeader.tsx
autonomous: true
requirements:
  - REQ-002
  - REQ-010
must_haves:
  - NavigationRail collapses to 76px, expands to 220px on hover
  - Navigation shows numbered items (01-09) with icon + label
  - Active item shows white text + green left border indicator (NOT a pill/rounded rectangle)
  - Hover shows green text + thin line slides in from left
  - TopBar shows section index, global search with ⌘K hint, INTELLIGENCE ONLINE status, user avatar
  - MobileNavigation is a full-screen overlay with large numbered navigation items
  - All existing routes still accessible
  - No purple/indigo colors remain in shell components
---

# Phase 2: Global Shell Redesign — Plan

## Objective
Replace all shell components (NavigationRail, TopBar, MobileNavigation, MainLayout) with redesigned versions that match the new THREATLENS design identity: editorial numbered navigation, precise green indicators, minimal top bar, full-screen mobile menu.

## IMPORTANT CONSTRAINTS
- DO NOT modify any page components — only the shell/layout components
- DO NOT remove the existing navigation item data from routeConfig.ts — only restyle
- Preserve all existing navigation routes and keyboard shortcut (Ctrl+K for search)
- Preserve the user dropdown (profile → /profile, settings → /settings, logout → /)
- Keep existing MobileNavigation behavior (open/close) — only restyle the visual presentation

---

## Wave 1 — NavigationRail Redesign

### Task 2.1: Redesign NavigationRail

<read_first>
- client/src/components/layout/NavigationRail.tsx — Current implementation (full file)
- client/src/lib/routeConfig.ts — NAV_ITEMS data (num, name, path, short fields)
- client/src/app/App.css — Token system (use --color-* vars via Tailwind classes)
</read_first>

<action>
Completely rewrite `client/src/components/layout/NavigationRail.tsx` while preserving:
- The `NavigationRail` named export
- All route paths from `NAV_ITEMS`
- The icon array mapping (reuse same icons)

New implementation:

```tsx
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Share2, Server, Database,
  Radar, FolderCheck, FileText, Settings,
} from 'lucide-react';
import { NAV_ITEMS } from '../../lib/routeConfig';

const icons = [LayoutDashboard, Users, Share2, Server, Database, Radar, FolderCheck, FileText, Settings];

export function NavigationRail() {
  return (
    <aside
      className="group/rail hidden md:flex flex-col h-full w-[76px] hover:w-[220px] transition-[width] duration-300 ease-out bg-sidebar border-r border-border-subtle overflow-hidden shrink-0"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-[22px] border-b border-border-subtle shrink-0 overflow-hidden">
        <div className="leading-none whitespace-nowrap">
          <span className="block text-[9px] font-semibold tracking-[0.25em] text-text-primary uppercase">THREAT</span>
          <span className="block text-[9px] font-light tracking-[0.4em] text-accent-solid uppercase mt-0.5">LENS</span>
        </div>
      </div>

      {/* Divider after logo */}
      <div className="mx-4 h-px bg-border-subtle opacity-50 shrink-0" />

      {/* Nav items */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item, i) => {
          const Icon = icons[i];
          const isSettings = item.path === '/settings';
          return (
            <>
              {/* Visual separator before Settings */}
              {isSettings && <div className="mx-4 h-px bg-border-subtle opacity-50 my-2" key={`sep-${i}`} />}
              <NavLink
                key={item.path}
                to={item.path}
                title={item.name}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 pl-[22px] pr-4 py-2.5 text-xs transition-all duration-200 border-l-2 group/navitem ${
                    isActive
                      ? 'border-accent-solid text-text-primary bg-accent-soft/20'
                      : 'border-transparent text-text-muted hover:text-accent-solid hover:border-accent-border/60 hover:bg-accent-soft/10'
                  }`
                }
              >
                {/* Number */}
                <span className="text-[9px] tabular-nums font-medium text-text-muted/60 w-4 shrink-0 group-hover/navitem:text-text-muted transition-colors">
                  {item.num}
                </span>
                {/* Icon */}
                <Icon className="w-[17px] h-[17px] shrink-0 transition-colors" strokeWidth={1.5} />
                {/* Label — hidden when collapsed */}
                <span className="whitespace-nowrap opacity-0 group-hover/rail:opacity-100 transition-opacity duration-200 font-medium tracking-[0.06em] text-[11px] uppercase">
                  {item.name}
                </span>
              </NavLink>
            </>
          );
        })}
      </nav>
    </aside>
  );
}
```

Key design changes from old implementation:
- Separator before Settings item (visual grouping)
- Active state: `border-accent-solid` (green left border) + `bg-accent-soft/20` (very subtle green wash) — NOT a rounded pill
- Hover state: `border-accent-border/60` + green text + subtle green wash
- Number shown always (slightly muted), not just on hover
- Label tracking changed to 0.06em for refined look
- Consistent 22px left padding for alignment
</action>

<acceptance_criteria>
- `client/src/components/layout/NavigationRail.tsx` compiles without TypeScript errors
- File contains `border-accent-solid` for active state
- File contains `group/rail` and `group-hover/rail:opacity-100` for expand behavior
- File does NOT contain any purple/indigo hex codes or `indigo` Tailwind classes
- File does NOT contain `rounded-pill` or `rounded-full` for active nav items
- File contains `border-l-2` for the left indicator
- File imports from `../../lib/routeConfig` (NAV_ITEMS) — preserving existing route data
</acceptance_criteria>

---

## Wave 1 — TopBar Redesign (parallel with Task 2.1)

### Task 2.2: Redesign TopBar

<read_first>
- client/src/components/layout/TopBar.tsx — Current full implementation (MUST read all 129 lines)
- client/src/lib/routeConfig.ts — getSectionMeta function
- client/src/app/App.css — Token system
</read_first>

<action>
Rewrite `client/src/components/layout/TopBar.tsx` preserving ALL existing functionality:
- Global search with form submit → navigate('/analysis')
- Ctrl/Cmd+K keyboard shortcut to focus search
- Click-outside-to-close user dropdown menu
- Navigate to /profile, /settings from dropdown
- Navigate to / (logout) from dropdown

New visual design:

```tsx
// The TopBar should look like:
// [Menu btn (mobile)] | [03 / RELATIONSHIPS] | [search input with ⌘K] | [INTELLIGENCE ONLINE ●] | [Avatar ▾]

// Section identifier: "03 / RELATIONSHIPS" — small, uppercase, tracked, muted
// Search: transparent bg, 1px hairline border, left-aligned SearchIcon, right-aligned ⌘K kbd
// Status: tiny green dot (pulse) + "INTELLIGENCE ONLINE" text — uppercase, tracked, muted
// Avatar: 32x32, square (rounded-sm), letter 'A', border-border-strong, text-text-primary bg-card

// Dropdown: positioned absolute top-14 right-4, 192px wide, bg-panel, border-border-subtle, rounded-sm
// No large drop shadows — use border only
// Items: User icon + "My Profile", Settings icon + "Settings", separator, LogOut icon + "Logout" (text-status-red)
```

The section label format must be: `{section.index} / {section.label}` (e.g., "03 / RELATIONSHIPS")

Search input classes:
```
w-full pl-10 pr-20 py-2 bg-transparent border border-border-subtle text-sm text-text-primary 
placeholder:text-text-muted focus:outline-none focus:border-accent-border transition-colors rounded-sm
```

Keep the header element with `h-14 md:h-16 bg-surface/80 backdrop-blur-sm border-b border-border-subtle`
</action>

<acceptance_criteria>
- `client/src/components/layout/TopBar.tsx` compiles without TypeScript errors
- File preserves the `handleSearch` function navigating to '/analysis'
- File preserves the Ctrl+K keyboard handler (`useEffect` with keydown listener)
- File preserves the click-outside handler for the dropdown
- File preserves navigation to /profile, /settings, /
- File contains "INTELLIGENCE ONLINE" or equivalent text
- File contains `rounded-sm` instead of `rounded-md` or larger for search input
- File does NOT contain purple/indigo colors
</acceptance_criteria>

---

## Wave 2 — Mobile Navigation + MainLayout (after Wave 1)

### Task 2.3: Redesign MobileNavigation

<read_first>
- client/src/components/layout/MobileNavigation.tsx — Current implementation
- client/src/lib/routeConfig.ts — NAV_ITEMS data
- client/src/layouts/MainLayout.tsx — How MobileNavigation is used (open/onClose props)
</read_first>

<action>
Rewrite `client/src/components/layout/MobileNavigation.tsx` as a full-screen overlay menu.

The component receives `{ open: boolean; onClose: () => void }` props — preserve this interface exactly.

New implementation structure:

```tsx
// Full-screen overlay: fixed inset-0, z-[200], bg-canvas (near-black)
// Transition: opacity + scale(0.98)→scale(1) on open, reverse on close
// Close button: top-right, "CLOSE" text or X icon + "CLOSE" label, meta-label style
// 
// Logo: top-left, "THREATLENS" small tracking text
//
// Nav items (large numbered format):
// Each item:
// - Large number: "01", "02" etc — text-[clamp(3rem,8vw,5rem)], font-light, text-text-muted/20
// - Item name: "OVERVIEW", "ACTORS" etc — text-[clamp(1.5rem,5vw,2.5rem)], font-medium, uppercase
// - On hover: text shifts right slightly (~8px), text becomes text-text-primary
// - Green underline animates from left on hover
//
// Layout: centered vertically, left-aligned at ~10vw
//
// Footer: bottom, small meta text "THREATLENS — INTELLIGENCE SYSTEM"

import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { NAV_ITEMS } from '../../lib/routeConfig';

type MobileNavigationProps = { open: boolean; onClose: () => void };

export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  return (
    <div
      className={`fixed inset-0 z-[200] bg-canvas flex flex-col transition-all duration-500 ease-out md:hidden ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Navigation menu"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle">
        <span className="text-[10px] tracking-[0.3em] font-semibold text-text-primary uppercase">THREATLENS</span>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Close menu"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-[10px] tracking-[0.15em] uppercase font-medium">Close</span>
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col justify-center px-8 py-8 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-baseline gap-4 py-3 border-b border-border-subtle/30 hover:pl-2 transition-all duration-200 ${
                isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
              }`
            }
          >
            <span className="text-[11px] tabular-nums font-medium text-text-muted/40 w-6 shrink-0">{item.num}</span>
            <span className="text-xl font-medium tracking-wide uppercase">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-8 py-5 border-t border-border-subtle">
        <p className="text-[9px] tracking-[0.2em] text-text-muted uppercase">
          THREATLENS — INTELLIGENCE SYSTEM
        </p>
      </div>
    </div>
  );
}
```
</action>

<acceptance_criteria>
- `client/src/components/layout/MobileNavigation.tsx` compiles without TypeScript errors
- Component still accepts `{ open: boolean; onClose: () => void }` props
- File contains `fixed inset-0` (full-screen)
- File uses `NAV_ITEMS` from routeConfig
- File includes close button calling `onClose`
- Each NavLink calls `onClick={onClose}` to close menu on navigation
- File uses `uppercase` and numbered item display
- File does NOT use purple/indigo colors
</acceptance_criteria>

---

### Task 2.4: Update MainLayout for New Shell

<read_first>
- client/src/layouts/MainLayout.tsx — Current implementation (all 34 lines)
- client/src/components/layout/NavigationRail.tsx — After Task 2.1 changes
- client/src/components/layout/TopBar.tsx — After Task 2.2 changes
</read_first>

<action>
Review `client/src/layouts/MainLayout.tsx`. The current implementation is already well-structured:

```tsx
<div className="flex h-screen bg-canvas text-text-secondary overflow-hidden">
  <NavigationRail />
  <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
  <div className="flex-1 flex flex-col min-w-0">
    <TopBar onOpenMobileMenu={() => setMobileOpen(true)} />
    <main className={`flex-1 overflow-y-auto bg-surface ${fullBleed ? 'p-0' : 'p-4 md:p-8 lg:p-10'}`}>
      <div className={fullBleed ? 'h-full' : 'max-w-[1400px] mx-auto'}>
        <MotionProvider>
          <Outlet />
        </MotionProvider>
      </div>
    </main>
  </div>
</div>
```

Only make these specific improvements:
1. Add `animate-fade-in` to the `<main>` element so route changes feel smooth
2. Add a very subtle page transition: wrap Outlet in a div with key={location.pathname} for React re-mount animation
3. Ensure `bg-surface` on main is correct (it is — #0e120f)

Import `useLocation` from react-router-dom if not already present.

The updated main section:
```tsx
const location = useLocation(); // add this
// ...
<main className={`flex-1 overflow-y-auto bg-surface ${fullBleed ? 'p-0' : 'p-4 md:p-8 lg:p-10'}`}>
  <div className={fullBleed ? 'h-full' : 'max-w-[1400px] mx-auto'}>
    <MotionProvider>
      <div key={location.pathname} className="animate-fade-in">
        <Outlet />
      </div>
    </MotionProvider>
  </div>
</main>
```
</action>

<acceptance_criteria>
- `client/src/layouts/MainLayout.tsx` compiles without TypeScript errors
- File imports `useLocation` from react-router-dom
- File contains `key={location.pathname}` on the fade-in wrapper
- File contains `animate-fade-in` class
- All existing imports (NavigationRail, TopBar, MobileNavigation, MotionProvider) still present
- FULL_BLEED_PATHS behavior preserved for /relationships route
</acceptance_criteria>

---

## Verification

After all 4 tasks complete:
1. Run `cd client && npm run dev` — no TypeScript errors
2. Verify navigation shows in browser at /dashboard
3. Verify clicking all 9 nav items routes correctly
4. Verify mobile menu opens/closes (use browser DevTools mobile emulation)
5. Verify no purple/indigo colors in navigation

## Output Required
Reply with `## PLANNING COMPLETE`
