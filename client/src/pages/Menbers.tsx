import { motion } from 'framer-motion';
import { routesVariants } from '../animations/animations';

export default function Menbers() {
  return (
    <motion.div
      className='about'
      variants={routesVariants}
      initial='initial'
      animate='visible'
      exit='exit'
    >
      <h1>Assinantes</h1>
    </motion.div>
  );
}
