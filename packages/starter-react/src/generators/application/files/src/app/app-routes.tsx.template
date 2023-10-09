import { useRoutes } from 'react-router-dom';
import { Airdrop } from './pages/airdrop';
import { Page1 } from './pages/page-1';
import { Page2 } from './pages/page-2';

export function AppRoutes() {
  return useRoutes([
    {
      index: true,
      path: '/',
      element: <div>This is the home page.</div>,
    },
    { path: '/airdrop', element: <Airdrop /> },
    { path: '/page-1', element: <Page1 /> },
    { path: '/page-2', element: <Page2 /> },
  ]);
}
