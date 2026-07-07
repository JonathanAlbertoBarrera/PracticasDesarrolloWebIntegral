// La identidad visual vive aquí, en commons, para que host y microfront
// se vean como UNA sola app aunque se desplieguen por separado.
export const theme = {
  colors: {
    primary: '#5B5BD6',
    primarySoft: '#EAEAFB',
    accent: '#0EA5A4',
    warning: '#F59E0B',
    danger: '#EF4444',
    success: '#22C55E',
    shellBg: '#0E1330',
    canvas: '#F6F7FB',
    surface: '#FFFFFF',
    border: '#E6E8F0',
    text: '#1A1F36',
    textMuted: '#6B7280',
    textOnDark: '#E8EAF6',
    textOnDarkMuted: '#9AA0C7',
    textOnPrimary: '#FFFFFF',
  },
  radius: { sm: 8, md: 12, lg: 16, pill: 999 },
  space: (n: number) => n * 8,
  shadow: {
    card: '0 1px 2px rgba(16,24,64,0.06), 0 8px 24px rgba(16,24,64,0.06)',
    pop: '0 12px 40px rgba(16,24,64,0.18)',
  },
  font: {
    family: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
} as const;

export type Theme = typeof theme;