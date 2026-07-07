// Compara con la variante runtime:
//   runtime:    const M = lazy(() => import('inventory_front/ProductsModule'))
//   build-time: import { InventoryModule } from '@nimbus/inventory-front'
// Aquí NO hace falta lazy, ni Suspense, ni boundary: ya está en el bundle.
import { useState } from 'react';
import { theme } from '@nimbus/commons';
import { InventoryModule } from '@nimbus/inventory-front';

import { Sidebar, type NavItem } from './src/components/Sidebar';

const NAV: NavItem[] = [
  { key: 'home', label: 'Inicio' },
  { key: 'inventory', label: 'Inventario', microfront: true },
];

export function App() {
  const [active, setActive] = useState('inventory');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: theme.font.family, background: theme.colors.canvas }}>
      <Sidebar items={NAV} active={active} onSelect={setActive} />
      <main style={{ flex: 1, minWidth: 0 }}>
        <header style={{ height: 60, display: 'flex', alignItems: 'center', padding: '0 28px', background: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}` }}>
          <strong style={{ color: theme.colors.text }}>Nimbus Console</strong>
          <span style={{ marginLeft: 12, fontSize: 12, color: theme.colors.textMuted }}>host: webshell · build-time · :4000</span>
        </header>
        <section style={{ padding: 28 }}>
          {active === 'home' && <Home />}
          {active === 'inventory' && <InventoryModule />}
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
        El módulo de Inventario vive como un paquete del workspace que se importa y se compila DENTRO de este mismo bundle.
      </p>
    </div>
  );
}