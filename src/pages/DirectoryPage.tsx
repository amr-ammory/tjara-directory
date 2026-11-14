import { useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { FactoryCard } from '../components/FactoryCard';
import { factories, governorates, normalizeSearch, sectorBySlug, sectors } from '../lib/catalog';

export function DirectoryPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const sectorFilter = params.get('sector') ?? '';
  const governorateFilter = params.get('gov') ?? '';

  const visibleFactories = useMemo(() => {
    const term = normalizeSearch(query);
    return factories.filter((factory) => {
      const text = normalizeSearch([
        factory.name,
        factory.about,
        factory.zone,
        factory.certifications.join(' '),
        factory.products.map((product) => `${product.name} ${product.desc}`).join(' '),
        sectorBySlug(factory.sector)?.name ?? '',
        governorates.find((item) => item.slug === factory.governorate)?.name ?? '',
      ].join(' '));
      return (!term || text.includes(term))
        && (!sectorFilter || factory.sector === sectorFilter)
        && (!governorateFilter || factory.governorate === governorateFilter);
    });
  }, [query, sectorFilter, governorateFilter]);

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next, { replace: true });
  };

  const clearFilters = () => setParams({}, { replace: true });
  const hasFilters = Boolean(query || sectorFilter || governorateFilter);

  return (
    <section className="directory-page page-width">
      <div className="page-eyebrow">الدليل الصناعي السوري</div>
      <div className="directory-heading-row">
        <div><h1>دليل المعامل</h1><p>ابحث وفلتر المعامل السورية حسب القطاع الصناعي والمحافظة والمنطقة.</p></div>
        <span className="result-total"><strong>{visibleFactories.length}</strong> من أصل {factories.length} معمل</span>
      </div>
      <div className="filters-panel">
        <label className="directory-search">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">البحث في دليل المعامل</span>
          <input value={query} onChange={(event) => updateFilter('q', event.target.value)} placeholder="اسم المعمل، المنتج، أو المنطقة الصناعية..." />
          {query && <button type="button" aria-label="مسح البحث" onClick={() => updateFilter('q', '')}><X size={16} /></button>}
        </label>
        <label className="select-filter">
          <span className="sr-only">فلترة حسب القطاع</span>
          <select value={sectorFilter} onChange={(event) => updateFilter('sector', event.target.value)}>
            <option value="">كل القطاعات</option>
            {sectors.map((sector) => <option value={sector.slug} key={sector.slug}>{sector.name}</option>)}
          </select>
        </label>
        <label className="select-filter">
          <span className="sr-only">فلترة حسب المحافظة</span>
          <select value={governorateFilter} onChange={(event) => updateFilter('gov', event.target.value)}>
            <option value="">كل المحافظات</option>
            {governorates.map((governorate) => <option value={governorate.slug} key={governorate.slug}>{governorate.name}</option>)}
          </select>
        </label>
        <span className="filter-hint"><SlidersHorizontal size={15} /> نتائج محدثة مباشرة</span>
      </div>
      <div className="directory-results-heading">
        <h2>{hasFilters ? 'نتائج البحث' : 'جميع المعامل'}</h2>
        <span>{visibleFactories.length} نتيجة</span>
      </div>
      {visibleFactories.length > 0 ? (
        <div className="factory-grid directory-grid">
          {visibleFactories.map((factory) => <FactoryCard factory={factory} key={factory.slug} />)}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-state-icon"><Search size={24} /></span>
          <h2>لم نعثر على نتائج</h2>
          <p>جرّب كلمات أخرى أو أزل بعض المرشحات للوصول إلى المعامل المناسبة.</p>
          <button type="button" className="button button-gold" onClick={clearFilters}>إزالة المرشحات</button>
        </div>
      )}
    </section>
  );
}
