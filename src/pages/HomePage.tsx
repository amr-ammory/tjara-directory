import { useState, type FormEvent, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpLeft, Cog, FlaskConical, Search } from 'lucide-react';
import { FactoryCard } from '../components/FactoryCard';
import { assetUrl, countFactories, factories, governorates, sectors } from '../lib/catalog';

const sectorArt: Record<string, string> = {
  textile: '/images/sectors/textile-small.png',
  packaging: '/images/sectors/packaging-small.png',
  food: '/images/sectors/food-small.png',
  pharma: '/images/sectors/pharma-small.png',
};

function SectionHeading({ title, action }: { title: string; action?: ReactNode }) {
  return <div className="section-heading"><div><h2>{title}</h2><span className="heading-rule" /></div>{action}</div>;
}

export function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    navigate(value ? `/factories?q=${encodeURIComponent(value)}` : '/factories');
  };

  return (
    <>
      <section className="hero" id="top">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="hero-content page-width">
          <p className="hero-kicker">TJARA <span>·</span> صُنع في سوريا</p>
          <h1>بوابتك إلى <span>الصناعة السورية</span></h1>
          <p className="hero-description">ملفات تعريفية احترافية لمعامل سوريا — من الشيخ نجار إلى عدرا وحسياء — مع كتالوج المنتجات وشهادات الجودة والتواصل المباشر.</p>
          <form className="hero-search" onSubmit={submitSearch} role="search">
            <Search size={21} aria-hidden="true" />
            <label className="sr-only" htmlFor="hero-query">ابحث عن معمل أو منتج أو منطقة صناعية</label>
            <input id="hero-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن معمل، منتج، أو منطقة صناعية..." />
            <button type="submit">بحث</button>
          </form>
          <div className="hero-stats" aria-label="إحصاءات الدليل">
            <div><strong>12+</strong><span>معمل موثّق</span></div>
            <div><strong>{sectors.length}</strong><span>قطاعات صناعية</span></div>
            <div><strong>{governorates.length}</strong><span>محافظات</span></div>
          </div>
          <figure className="hero-pride-artwork">
            <img src={assetUrl('/images/brand/syrian-industry-pride.png')} alt="فخر الصناعة السورية — النسر السوري" loading="lazy" />
          </figure>
        </div>
      </section>

      <section className="content-section page-width" id="sectors">
        <SectionHeading title="القطاعات الصناعية" />
        <div className="sector-grid">
          {sectors.map((sector) => {
            const iconSource = sectorArt[sector.slug];
            return (
              <Link className="sector-card" to={`/factories?sector=${sector.slug}`} key={sector.slug}>
                <span className="sector-illustration">
                  {iconSource ? <img src={assetUrl(iconSource)} alt="" loading="lazy" /> : sector.slug === 'engineering' ? <Cog size={35} strokeWidth={1.5} /> : <FlaskConical size={35} strokeWidth={1.5} />}
                </span>
                <span className="sector-copy"><strong>{sector.name}</strong><small>{sector.desc}</small></span>
                <ArrowUpLeft size={17} className="sector-arrow" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="governorate-section" id="governorates">
        <div className="page-width content-section">
          <SectionHeading title="المحافظات والمناطق الصناعية" action={<Link className="text-link" to="/governorates">عرض الكل <ArrowLeft size={16} /></Link>} />
          <div className="governorate-grid">
            {governorates.map((governorate) => (
              <Link className="governorate-card" to={`/governorates/${governorate.slug}`} key={governorate.slug}>
                <div className="governorate-card-top"><h3>{governorate.name}</h3><span>{countFactories(governorate.slug)} معامل</span></div>
                <p>{governorate.zones.join(' · ')}</p>
                <span className="governorate-arrow" aria-hidden="true"><ArrowLeft size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section page-width featured-section" id="featured">
        <SectionHeading title="معامل مميّزة" action={<Link className="text-link" to="/factories">عرض الكل <ArrowLeft size={16} /></Link>} />
        <div className="factory-grid featured-grid">
          {factories.slice(0, 4).map((factory) => <FactoryCard factory={factory} key={factory.slug} />)}
        </div>
        <div className="catalog-cta">
          <span>من النسيج إلى الصناعات الدوائية — اكتشف شركاء الصناعة السورية.</span>
          <Link to="/factories">استكشف الدليل <ArrowLeft size={16} /></Link>
        </div>
      </section>
    </>
  );
}
