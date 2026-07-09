import { Component, type ReactNode } from 'react';
import { theme } from '@nimbus/commons';

interface Props { children: ReactNode; }
interface State { error: Error | null; }

export class RemoteBoundary extends Component<Props, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error): State { return { error }; }

  render() {
    if (this.state.error) {
      return (
        <div style={{ border: `1px solid ${theme.colors.border}`, background: '#FFF7F7', borderRadius: theme.radius.lg, padding: 24, color: theme.colors.text, fontFamily: theme.font.family }}>
          <h3 style={{ marginTop: 0, color: theme.colors.danger }}>No se pudo cargar el microfront</h3>
          <p style={{ color: theme.colors.textMuted, fontSize: 14 }}>
            El host sigue vivo; solo este módulo remoto falló. Asegúrate de que <code>pets-front</code> esté servido en <code>http://localhost:5001</code>.
          </p>
          <pre style={{ fontSize: 12, color: theme.colors.textMuted, whiteSpace: 'pre-wrap' }}>{String(this.state.error.message)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}