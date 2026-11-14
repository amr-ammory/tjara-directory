import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { assetUrl, type Factory, governorateBySlug, sectorBySlug } from '../lib/catalog';

export function FactoryCard({ factory }: { factory: Factory }) {
  const sector = sectorBySlug(factory.sector);
  const governorate = governorateBySlug(factory.governorate);
  return (
    <Link to={`/factory/${factory.slug}`} className="factory-card">
      <div className="factory-card-image">
        <img src={assetUrl(factory.image)} alt={`منتجات ${factory.name}`} loading="lazy" />
        <span className="image-shade" />
        {sector && <span className="sector-pill">{sector.name}</span>}
      </div>
      <div className="factory-card-body">
        <span className="factory-initial" aria-hidden="true">{factory.initials}</span>
        <div className="factory-card-copy">
          <h3>{factory.name}</h3>
          <p className="factory-location"><MapPin size={13} aria-hidden="true" /> {governorate?.name} · {factory.zone}</p>
          <p className="factory-certifications">{factory.certifications.slice(0, 2).join(' · ')}</p>
        </div>
      </div>
    </Link>
  );
}
