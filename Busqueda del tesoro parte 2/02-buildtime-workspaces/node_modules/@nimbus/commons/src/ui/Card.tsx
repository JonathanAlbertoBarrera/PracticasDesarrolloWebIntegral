import type { CSSProperties, ReactNode } from 'react';

import { theme } from '../theme';

export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.lg,
        boxShadow: theme.shadow.card,
        ...style,
      }}
    >
      {children}
    </div>
  );
}