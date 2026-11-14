import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { governorates } from '../lib/catalog';

function ScrollReset() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      window.setTimeout(() => {
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' });
      }, 30);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);
  return null;
}

export function BrandMark() {
  return (
    <span className="brand-lockup" aria-label="تجارة TJARA">
      <img className="brand-mark-image" src={`${import.meta.env.BASE_URL}tjara-logo.png`} alt="" aria-hidden="true" />
      <span className="brand-copy"><strong>تجارة</strong><small>TJARA</small></span>
    </span>
  );
}

export function SiteShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location.pathname, location.hash]);

  return (
    <>
      <ScrollReset />
      <header className="site-header">
        <div className="header-inner page-width">
          <Link to="/" className="brand-link" aria-label="تجارة TJARA — الرئيسية"><BrandMark /></Link>
          <button type="button" className="mobile-menu-button" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="التنقل الرئيسي">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>الرئيسية</NavLink>
            <NavLink to="/factories" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>دليل المعامل</NavLink>
            <NavLink to="/governorates" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>المحافظات</NavLink>
          </nav>
        </div>
      </header>
      <main className="route-main"><Outlet /></main>
      <Footer />
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner page-width">
        <div className="footer-brand">
          <Link to="/" className="footer-brand-link"><BrandMark /></Link>
          <p>الدليل الصناعي الأشمل للمعامل السورية — بوابتك إلى الصناعة الوطنية والتصدير.</p>
        </div>
        <div className="footer-locations">
          <h2>المناطق الصناعية</h2>
          <div className="footer-location-links">
            {governorates.map((governorate) => <Link to={`/governorates/${governorate.slug}`} key={governorate.slug}>{governorate.name}</Link>)}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 تجارة TJARA — سوريا نحو الأسواق الإقليمية قريباً.</span>
          <Link to="/#top">العودة إلى الأعلى ↑</Link>
        </div>
      </div>
    </footer>
  );
}
