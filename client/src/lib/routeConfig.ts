export const NAV_ITEMS = [
  { num: '01', name: 'Overview', path: '/dashboard', short: 'OVERVIEW' },
  { num: '02', name: 'Actors', path: '/actors', short: 'ACTORS' },
  { num: '03', name: 'Relationships', path: '/relationships', short: 'RELATIONSHIPS' },
  { num: '04', name: 'Infrastructure', path: '/infrastructure', short: 'INFRASTRUCTURE' },
  { num: '05', name: 'Sources', path: '/sources', short: 'SOURCES' },
  { num: '06', name: 'Analysis', path: '/analysis', short: 'ANALYSIS' },
  { num: '07', name: 'Evidence', path: '/evidence', short: 'EVIDENCE' },
  { num: '08', name: 'Reports', path: '/reports', short: 'REPORTS' },
  { num: '09', name: 'Settings', path: '/settings', short: 'SETTINGS' },
] as const;

export const FULL_BLEED_PATHS = ['/relationships'];

export function getSectionMeta(pathname: string) {
  const item = NAV_ITEMS.find((n) => n.path === pathname);
  if (item) return { index: item.num, label: item.short };
  if (pathname === '/profile') return { index: '—', label: 'PROFILE' };
  return { index: '01', label: 'OVERVIEW' };
}
