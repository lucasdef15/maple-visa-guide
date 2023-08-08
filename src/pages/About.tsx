import AboutHero from '../components/about/AboutHero';
import AboutContent from '../components/about/AboutContent';
import { motion } from 'framer-motion';
import { routesVariants } from '../animations/animations';

export default function About() {
  return (
    <motion.div
      variants={routesVariants}
      initial='initial'
      animate='visible'
      exit='exit'
      style={{ position: 'relative', zIndex: -1 }}
    >
      <AboutHero />
      <AboutContent />
    </motion.div>
  );
}
