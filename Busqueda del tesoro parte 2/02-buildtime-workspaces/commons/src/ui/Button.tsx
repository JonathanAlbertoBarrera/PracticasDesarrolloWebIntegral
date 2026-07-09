import type { CSSProperties, ButtonHTMLAttributes } from 'react';

import { theme } from '../theme';

type Variant = 'primary' | 'ghost' | 'danger';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const base: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  border: '1px solid transparent',
  borderRadius: theme.radius.sm,
  padding: '8px 14px',
  fontFamily: theme.font.family,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'filter .15s ease, background .15s ease',
};

const byVariant: Record<Variant, CSSProperties> = {
  primary: { background: theme.colors.primary, color: theme.colors.textOnPrimary },
  ghost: { background: 'transparent', color: theme.colors.text, borderColor: theme.colors.border },
  danger: { background: theme.colors.danger, color: '#fff' },
};

export function Button({ variant = 'primary', style, disabled, ...rest }: Props) {
  return (
    <button
      {...rest}
      disabled={disabled}
      style={{
        ...base,
        ...byVariant[variant],
        ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : null),
        ...style,
      }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.filter = 'brightness(0.95)')}
      onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
    />
  );
}