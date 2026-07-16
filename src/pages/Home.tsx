import Hero from '../components/home/Hero';
import StatsBar from '../components/home/StatsBar';
import GrowthTimeline from '../components/home/GrowthTimeline';
import FeaturedServices from '../components/home/FeaturedServices';
import FeaturedSoftware from '../components/home/FeaturedSoftware';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Industries from '../components/home/Industries';
import TechStack from '../components/home/TechStack';
import PortfolioPreview from '../components/home/PortfolioPreview';
import CaseStudiesPreview from '../components/home/CaseStudiesPreview';
import FinalCTA from '../components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <GrowthTimeline />
      <FeaturedServices />
      <FeaturedSoftware />
      <WhyChooseUs />
      <Industries />
      <TechStack />
      <PortfolioPreview />
      <CaseStudiesPreview />
      <FinalCTA />
    </>
  );
}
