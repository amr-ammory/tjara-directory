import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteShell } from './components/SiteShell';
import { DirectoryPage } from './pages/DirectoryPage';
import { FactoryPage } from './pages/FactoryPage';
import { GovernoratePage } from './pages/GovernoratePage';
import { GovernoratesPage } from './pages/GovernoratesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

const appBase = import.meta.env.BASE_URL === '/' ? '/' : import.meta.env.BASE_URL.replace(/\/$/, '');

export function App() {
  return (
    <BrowserRouter basename={appBase}>
      <Routes>
        <Route element={<SiteShell />}>
          <Route index element={<HomePage />} />
          <Route path="factories" element={<DirectoryPage />} />
          <Route path="factory/:slug" element={<FactoryPage />} />
          <Route path="governorates" element={<GovernoratesPage />} />
          <Route path="governorates/:slug" element={<GovernoratePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
