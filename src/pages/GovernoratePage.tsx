import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Factory as FactoryIcon, MapPin } from 'lucide-react';
import { FactoryCard } from '../components/FactoryCard';
import { countFactories, factories, governorateBySlug } from '../lib/catalog';

export function GovernoratePage() {
  const { slug = '' } = useParams();
  const governorate = governorateBySlug(slug);
  if (!governorate) return <section className="page-width not-found"><h1>المحافظة غير موجودة</h1><Link to="/" className="button button-gold">العودة إلى الرئيسية</Link></section>;

  const localFactories = factories.filter((factory) => factory.governorate === governorate.slug);
  return (
    <section className="governorate-detail-page page-width">
      <div className="breadcrumbs"><Link to="/">الرئيسية</Link><span>/</span><a href="/#governorates">المحافظات</a><span>/</span><span>{governorate.name}</span></div>
      <div className="governorate-detail-hero">
        <span className="page-eyebrow">المناطق الصناعية السورية</span>
        <h1>{governorate.name}</h1>
        <p>{governorate.desc}</p>
        <div className="governorate-detail-count"><FactoryIcon size={17} /> {countFactories(governorate.slug)} معامل في الدليل</div>
      </div>
      <div className="zone-panel">
        <h2><MapPin size={18} /> المناطق الصناعية</h2>
        <div>{governorate.zones.map((zone) => <span key={zone}>{zone}</span>)}</div>
      </div>
      <div className="section-heading governorate-results-heading"><div><h2>المعامل في {governorate.name}</h2><span className="heading-rule" /></div><Link to={`/factories?gov=${governorate.slug}`} className="text-link">فتح الدليل <ArrowLeft size={16} /></Link></div>
      {localFactories.length ? <div className="factory-grid directory-grid">{localFactories.map((factory) => <FactoryCard factory={factory} key={factory.slug} />)}</div> : <div className="empty-state"><h2>لا توجد معامل مسجلة حالياً</h2><p>سيتم إضافة ملفات جديدة إلى هذا القسم قريباً.</p></div>}
    </section>
  );
}
