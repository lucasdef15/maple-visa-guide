import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { images } from './imgData';
import { useContext } from 'react';
import MainContext from '../../../contexts/MainContext';
import './slider.css';

export default function Slider() {
  const [position, setPosition] = useState(0);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const { isOpen } = useContext(MainContext);

  const handleClick = (index: number) => {
    setActiveButtonIndex(index);
    if (position < images.length) {
      setPosition(index);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => (prevPosition + 1) % images.length);
      setActiveButtonIndex(
        (prevPosition) => (prevPosition + 1) % images.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [position]);

  return (
    <div
      className='slider_row spacing'
      style={{ overflow: 'hidden', zIndex: isOpen ? -1 : 'auto' }}
    >
      {images.map((image, index) => (
        <motion.div
          className='slider_container'
          key={index}
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            rotate: 0,
            left: `${(index - position) * 100}vw`,
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 30,
          }}
        >
          <img src={image} alt='image' />
        </motion.div>
      ))}
      <div className='buttons' style={{ zIndex: isOpen ? -1 : 'auto' }}>
        {images.map((item, index) => {
          return (
            <button
              key={item}
              className={
                index === activeButtonIndex
                  ? 'manual-btn activeBtn'
                  : 'manual-btn'
              }
              onClick={() => handleClick(index)}
            ></button>
          );
        })}
      </div>
      <div className='slider-card'>
        <div>
          <h4>120k</h4>
          <p>Vistos Abordados</p>
        </div>
        <div>
          <h4>200+</h4>
          <p>Viajantes Satisfeitos</p>
        </div>
        <div>
          <h4>15k</h4>
          <p>Menbros</p>
        </div>
      </div>
    </div>
  );
}
