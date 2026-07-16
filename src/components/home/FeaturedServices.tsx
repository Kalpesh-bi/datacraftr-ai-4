import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ServiceCard from '../ServiceCard';
import { services } from '../../lib/data';

export default function FeaturedServices() {
  const featured = services.slice(0, 6);
  return (
    <section className="section-padding bg-white dark:bg-navy-950">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Services"
          title="Everything you need to build and scale"
          subtitle="From custom websites to AI automation and proprietary software — we cover the full spectrum of your technology needs."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/services" className="btn-outline">
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
