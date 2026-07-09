import { theme } from '@nimbus/commons';

export interface NavItem {
  key: string;
  label: string;
  microfront?: boolean;
}

interface Props {
  items: NavItem[];
  active: string;
  onSelect: (key: string) => void;
}

export function Sidebar({ items, active, onSelect }: Props) {
  return (
    <aside style={{ width: 248, background: theme.colors.shellBg, color: theme.colors.textOnDark, padding: 20, display: 'flex', flexDirection: 'column', gap: 24, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {/* Glifo de marca: una nube ("nimbus"). */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 9.5a3.5 3.5 0 0 1-.5 6.97c-.16.02-.33.03-.5.03H7Z" fill="#fff" />
          </svg>
        </div>
        <strong style={{ fontSize: 18 }}>Nimbus</strong>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((it) => {
          const isActive = it.key === active;
          return (
            <button
              key={it.key}
              onClick={() => onSelect(it.key)}
              style={{
                textAlign: 'left', border: 'none', cursor: 'pointer', borderRadius: theme.radius.sm,
                padding: '10px 12px', fontSize: 14, fontWeight: 600, fontFamily: theme.font.family,
                color: isActive ? '#fff' : theme.colors.textOnDarkMuted,
                background: isActive ? 'rgba(91,91,214,0.35)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
              }}
            >
              {it.label}
              {it.microfront && (
                <span title="Microfront integrado en build-time (paquete del workspace)" style={{ fontSize: 10, opacity: 0.7, border: '1px solid currentColor', borderRadius: 6, padding: '1px 5px' }}>
                  package
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <div style={{ marginTop: 'auto', fontSize: 11, color: theme.colors.textOnDarkMuted, lineHeight: 1.6 }}>
        Demo de microfrontends<br />Build-time · workspaces
      </div>
    </aside>
  );
}