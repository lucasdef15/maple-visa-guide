import Hero from '../components/hero/Hero';
import VideoSection from '../components/videoSection/VideoSection';
import CardSection from '../components/cardSection/CardSection';
import GuiasSection from '../components/guiasSection/GuiasSection';
import GuiasHeader from '../components/guiasSection/GuiasHeader';
import FaqSection from '../components/faq/FaqSection';

export default function Home() {
  return (
    <>
      <Hero />
      <VideoSection />
      <CardSection />
      <GuiasHeader />
      <GuiasSection />
      <FaqSection />
    </>
  );
}
