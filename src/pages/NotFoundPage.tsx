import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function NotFoundPage() {
  return (
    <section className="page-width not-found">
      <span className="page-eyebrow">404 · الصفحة غير موجودة</span>
      <h1>يبدو أن هذا المسار ليس ضمن الدليل.</h1>
      <p>يمكنك العودة إلى الصفحة الرئيسية أو متابعة البحث عن المعامل المسجلة.</p>
      <Link to="/" className="button button-gold"><ArrowRight size={16} /> العودة إلى الرئيسية</Link>
    </section>
  );
}
