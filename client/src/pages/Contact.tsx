import ContactContent from '../components/contact/ContactContent';
import { routesVariants } from '../animations/animations';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <motion.div
      className='about'
      variants={routesVariants}
      initial='initial'
      animate='visible'
      exit='exit'
    >
      <ContactContent />
    </motion.div>
  );
}
