import Hero from '../components/hero/Hero';
import VideoSection from '../components/videoSection/VideoSection';
import CardSection from '../components/cardSection/CardSection';
import GuiasSection from '../components/guiasSection/GuiasSection';
import GuiasHeader from '../components/guiasSection/GuiasHeader';
import FaqSection from '../components/faq/FaqSection';
import { motion } from 'framer-motion';
import { routesVariants } from '../animations/animations';

export default function Home() {
  return (
    <motion.div
      variants={routesVariants}
      initial='initial'
      animate='visible'
      exit='exit'
    >
      <Hero />
      <CardSection />
      <VideoSection />
      <GuiasHeader />
      <GuiasSection />
      <FaqSection />
    </motion.div>
  );
}
