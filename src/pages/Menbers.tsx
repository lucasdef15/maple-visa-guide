import { motion } from 'framer-motion';
import { routesVariants } from '../animations/animations';

export default function Menbers() {
  return (
    <motion.div
      variants={routesVariants}
      initial='initial'
      animate='visible'
      exit='exit'
      style={{ position: 'relative', zIndex: -1 }}
    >
      <h1>Assinantes</h1>
    </motion.div>
  );
}
