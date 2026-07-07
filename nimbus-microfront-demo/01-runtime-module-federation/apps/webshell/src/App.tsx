import { lazy, Suspense, useState } from 'react';
import { theme } from '@nimbus/commons';

import { Sidebar, type NavItem } from './components/Sidebar';
import { RemoteBoundary } from './components/RemoteBoundary';

// La importación "mágica" del microfront: Vite/federation descarga
// remoteEntry.js de :5001 y resuelve el módulo en runtime.
const ProductsModule = lazy(() => import('inventory_front/ProductsModule'));

const NAV: NavItem[] = [
  { key: 'home', label: 'Inicio' },
  { key: 'inventory', label: 'Inventario', remote: true },
];

export function App() {
  const [active, setActive] = useState('inventory');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: theme.font.family, background: theme.colors.canvas }}>
      <Sidebar items={NAV} active={active} onSelect={setActive} />
      <main style={{ flex: 1, minWidth: 0 }}>
        <header style={{ height: 60, display: 'flex', alignItems: 'center', padding: '0 28px', background: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}` }}>
          <strong style={{ color: theme.colors.text }}>Nimbus Console</strong>
          <span style={{ marginLeft: 12, fontSize: 12, color: theme.colors.textMuted }}>host: webshell · :5000</span>
        </header>
        <section style={{ padding: 28 }}>
          {active === 'home' && <Home />}
          {active === 'inventory' && (
            <RemoteBoundary>
              <Suspense fallback={<Loading />}>
                <ProductsModule />
              </Suspense>
            </RemoteBoundary>
          )}
        </section>
      </main>
    </div>
  );
}

function Home() {
  return (
    <div style={{ maxWidth: 640 }}>
      <h1 style={{ marginTop: 0 }}>Bienvenido a Nimbus Console</h1>
      <p style={{ color: theme.colors.textMuted, lineHeight: 1.7 }}>
        El módulo de Inventario no vive en este proyecto: se carga en runtime desde otro microfront vía Module Federation.
      </p>
    </div>
  );
}

function Loading() {
  return <div style={{ padding: 32, color: theme.colors.textMuted }}>Cargando microfront…</div>;
}