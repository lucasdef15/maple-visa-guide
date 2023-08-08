import ContactContent from '../components/contact/ContactContent';
import { routesVariants } from '../animations/animations';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <motion.div
      variants={routesVariants}
      initial='initial'
      animate='visible'
      exit='exit'
      style={{ position: 'relative', zIndex: -1 }}
    >
      <ContactContent />
    </motion.div>
  );
}
