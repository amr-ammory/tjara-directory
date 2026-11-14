import { Link } from 'react-router-dom';
import { ArrowLeft, Factory as FactoryIcon, MapPin } from 'lucide-react';
import { countFactories, governorates } from '../lib/catalog';

export function GovernoratesPage() {
  return (
    <section className="governorates-index page-width">
      <span className="page-eyebrow">الخريطة الصناعية السورية</span>
      <div className="directory-heading-row"><div><h1>المحافظات والمناطق الصناعية</h1><p>استكشف المعامل بحسب موقعها ومناطقها الصناعية في مختلف المحافظات السورية.</p></div><span className="result-total"><strong>{governorates.length}</strong> محافظات</span></div>
      <div className="governorates-index-grid">
        {governorates.map((governorate) => (
          <Link className="governorate-index-card" to={`/governorates/${governorate.slug}`} key={governorate.slug}>
            <div className="governorate-index-top"><span className="governorate-index-icon"><MapPin size={20} /></span><span className="governorate-index-count"><FactoryIcon size={14} /> {countFactories(governorate.slug)} معامل</span></div>
            <h2>{governorate.name}</h2>
            <p>{governorate.desc}</p>
            <div className="zone-preview">{governorate.zones.slice(0, 2).map((zone) => <span key={zone}>{zone}</span>)}</div>
            <span className="text-link">اكتشف معامل المحافظة <ArrowLeft size={15} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
