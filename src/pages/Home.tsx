import Hero from '../components/home/Hero';
import StatsBar from '../components/home/StatsBar';
import FeaturedServices from '../components/home/FeaturedServices';
import WhyChooseUs from '../components/home/WhyChooseUs';
import GrowthTimeline from '../components/home/GrowthTimeline';
import Industries from '../components/home/Industries';
import FinalCTA from '../components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedServices />
      <WhyChooseUs />
      <GrowthTimeline />
      <Industries />
      <FinalCTA />
    </>
  );
}
