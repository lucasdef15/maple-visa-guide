import { motion } from 'framer-motion';
import MenuItem from './MenuItem';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export default function Navigation({ isOpen, handleOpen }: any) {
  return (
    <motion.ul
      variants={variants}
      style={{
        display: isOpen ? 'flex' : 'none',
        height: '100vh',
        transition: '.5s',
      }}
    >
      <MenuItem handleOpen={handleOpen} />
    </motion.ul>
  );
}
