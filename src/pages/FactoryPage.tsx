import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, Building2, Globe2, Mail, MapPin, PackageCheck, Phone, Send, Users } from 'lucide-react';
import { FactoryCard } from '../components/FactoryCard';
import { assetUrl, factoryBySlug, factories, governorateBySlug, sectorBySlug } from '../lib/catalog';

export function FactoryPage() {
  const { slug = '' } = useParams();
  const factory = factoryBySlug(slug);
  if (!factory) return <section className="page-width not-found"><h1>المعمل غير موجود</h1><Link to="/factories" className="button button-gold">العودة إلى الدليل</Link></section>;

  const sector = sectorBySlug(factory.sector);
  const governorate = governorateBySlug(factory.governorate);
  const related = factories.filter((item) => item.slug !== factory.slug && item.sector === factory.sector).slice(0, 3);
  const phoneHref = `tel:${factory.phone.replaceAll(' ', '')}`;
  const whatsappHref = (product?: string) => `https://wa.me/${factory.whatsapp}?text=${encodeURIComponent(product ? `مرحباً، أود طلب عرض سعر لمنتج ${product} من ${factory.name}.` : `مرحباً، أود التواصل مع ${factory.name} لطلب عرض سعر.`)}`;
  const mapHref = `https://www.google.com/maps/search/${encodeURIComponent(`${factory.zone} ${governorate?.name ?? ''} سوريا`)}`;

  return (
    <div className="factory-detail-page">
      <div className="page-width breadcrumbs"><Link to="/">الرئيسية</Link><span>/</span><Link to="/factories">دليل المعامل</Link><span>/</span><span>{factory.name}</span></div>
      <section className="factory-detail-hero page-width">
        <div className="detail-image"><img src={assetUrl(factory.image)} alt={`منتجات ${factory.name}`} /><span className="image-shade" /><Link to={`/factories?sector=${factory.sector}`} className="detail-image-label">{sector?.name}</Link></div>
        <div className="detail-intro">
          <div className="detail-kicker"><BadgeCheck size={16} /> ملف تعريفي للمعمل</div>
          <h1>{factory.name}</h1>
          <p className="detail-location"><MapPin size={17} /> {governorate?.name} · {factory.zone}</p>
          <p className="detail-about">{factory.about}</p>
          <div className="detail-actions"><a href={whatsappHref()} target="_blank" rel="noreferrer" className="button button-gold"><Send size={16} /> واتساب</a><a href={phoneHref} className="button button-outline"><Phone size={16} /> اتصال</a></div>
        </div>
      </section>

      <section className="page-width factory-profile-layout">
        <div className="detail-main-column">
          <div className="detail-section-heading"><h2>نبذة عن المعمل</h2><span className="heading-rule" /></div>
          <p className="detail-long-copy">{factory.about}</p>
          <div className="detail-facts">
            <div><span className="fact-icon"><Building2 size={20} /></span><span><small>تأسس عام</small><strong>{factory.founded}</strong></span></div>
            <div><span className="fact-icon"><Users size={20} /></span><span><small>عدد العاملين</small><strong>{factory.employees}</strong></span></div>
            <div><span className="fact-icon"><PackageCheck size={20} /></span><span><small>الطاقة التصديرية</small><strong>{factory.exportCapacity}</strong></span></div>
          </div>

          <div className="detail-section-heading products-heading"><h2>كتالوج المنتجات</h2><span className="heading-rule" /></div>
          <div className="product-grid">
            {factory.products.map((product) => <article className="product-card" key={product.name}>
              <img src={assetUrl(product.image)} alt={product.name} loading="lazy" />
              <div className="product-card-copy"><h3>{product.name}</h3><p>{product.desc}</p><a className="product-quote" href={whatsappHref(product.name)} target="_blank" rel="noreferrer">اطلب عرض سعر <ArrowLeft size={13} /></a></div>
            </article>)}
          </div>

          <div className="detail-section-heading products-heading"><h2>شهادات الجودة</h2><span className="heading-rule" /></div>
          <div className="certification-list detail-certifications">{factory.certifications.map((badge) => <span key={badge}><BadgeCheck size={14} /> {badge}</span>)}</div>
          <div className="detail-section-heading products-heading"><h2>أسواق التصدير</h2><span className="heading-rule" /></div>
          <div className="export-tags detail-export-tags">{factory.exportCountries.map((country) => <span key={country}>{country}</span>)}</div>
        </div>

        <aside className="contact-sidebar">
          <h2>معلومات الاتصال</h2>
          <div className="contact-row"><MapPin size={17} /><span><small>الموقع</small><strong>{governorate?.name}، {factory.zone}</strong><a href={mapHref} target="_blank" rel="noreferrer" className="map-link">عرض الموقع على الخريطة</a></span></div>
          <div className="contact-row"><Phone size={17} /><span><small>الهاتف</small><a href={phoneHref}>{factory.phone}</a></span></div>
          <div className="contact-row"><Mail size={17} /><span><small>البريد الإلكتروني</small><a href={`mailto:${factory.email}`}>{factory.email}</a></span></div>
          <div className="contact-row"><Globe2 size={17} /><span><small>الموقع الإلكتروني</small><a href={`https://${factory.website}`} target="_blank" rel="noreferrer">{factory.website}</a></span></div>
          <div className="quote-request-card"><span>هل ترغب بالتعامل مع هذا المعمل؟</span><a href={whatsappHref()} target="_blank" rel="noreferrer" className="button button-gold"><Send size={15} /> طلب عرض سعر</a></div>
        </aside>
      </section>

      {related.length > 0 && <section className="page-width related-section">
        <div className="section-heading"><div><h2>معامل أخرى في القطاع</h2><span className="heading-rule" /></div><Link to={`/factories?sector=${factory.sector}`} className="text-link">كل معامل القطاع <ArrowLeft size={16} /></Link></div>
        <div className="factory-grid related-grid">{related.map((item) => <FactoryCard factory={item} key={item.slug} />)}</div>
      </section>}
    </div>
  );
}
