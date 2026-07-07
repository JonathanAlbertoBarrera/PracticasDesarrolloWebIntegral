import type { CSSProperties, InputHTMLAttributes } from 'react';

import { theme } from '../theme';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const wrap: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 6 };
const labelStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: theme.colors.textMuted,
  fontFamily: theme.font.family,
};
const inputStyle: CSSProperties = {
  height: 40,
  padding: '0 12px',
  borderRadius: theme.radius.sm,
  border: `1px solid ${theme.colors.border}`,
  fontSize: 14,
  fontFamily: theme.font.family,
  color: theme.colors.text,
  outline: 'none',
};

export function TextField({ label, id, style, ...rest }: Props) {
  const inputId = id ?? `f_${label.replace(/\s+/g, '_').toLowerCase()}`;
  return (
    <label htmlFor={inputId} style={wrap}>
      <span style={labelStyle}>{label}</span>
      <input
        id={inputId}
        style={{ ...inputStyle, ...style }}
        onFocus={(e) => (e.currentTarget.style.borderColor = theme.colors.primary)}
        onBlur={(e) => (e.currentTarget.style.borderColor = theme.colors.border)}
        {...rest}
      />
    </label>
  );
}