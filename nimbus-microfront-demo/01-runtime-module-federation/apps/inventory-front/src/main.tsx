import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { theme } from '@nimbus/commons';

import ProductsModule from './ProductsModule';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ minHeight: '100vh', background: theme.colors.canvas, fontFamily: theme.font.family, padding: 24 }}>
      <ProductsModule />
    </div>
  </StrictMode>
);