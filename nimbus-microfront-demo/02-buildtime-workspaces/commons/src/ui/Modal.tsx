import type { ReactNode } from 'react';

import { theme } from '../theme';

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, title, onClose, children }: Props) {
  if (!open) return null;
  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,14,40,0.45)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 50,
        padding: 16,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(520px, 100%)',
          background: theme.colors.surface,
          borderRadius: theme.radius.lg,
          boxShadow: theme.shadow.pop,
          overflow: 'hidden',
        }}
      >
        <header
          style={{
            padding: '16px 20px',
            borderBottom: `1px solid ${theme.colors.border}`,
            fontWeight: 700,
            fontSize: 16,
            color: theme.colors.text,
            fontFamily: theme.font.family,
          }}
        >
          {title}
        </header>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}