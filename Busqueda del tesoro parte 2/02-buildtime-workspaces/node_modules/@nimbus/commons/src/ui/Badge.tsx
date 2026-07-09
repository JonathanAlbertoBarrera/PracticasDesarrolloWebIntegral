import type { ReactNode } from 'react';

import { theme } from '../theme';

type Tone = 'neutral' | 'success' | 'warning' | 'danger';

const tones: Record<Tone, { bg: string; fg: string }> = {
  neutral: { bg: theme.colors.primarySoft, fg: theme.colors.primary },
  success: { bg: '#DCFCE7', fg: '#15803D' },
  warning: { bg: '#FEF3C7', fg: '#B45309' },
  danger: { bg: '#FEE2E2', fg: '#B91C1C' },
};

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  const c = tones[tone];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: c.bg,
        color: c.fg,
        borderRadius: theme.radius.pill,
        padding: '2px 10px',
        fontSize: 12,
        fontWeight: 700,
        fontFamily: theme.font.family,
      }}
    >
      {children}
    </span>
  );
}