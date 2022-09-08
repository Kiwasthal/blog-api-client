import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04 * i,
    },
  }),
};

const spanVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

export const AnimatedTextUpper = () => {
  const text = ['A', 'REACT', 'BLOGSPOT'];
  return (
    <AnimatePresence>
      <motion.div
        className="flex absolute z-20 left-5  bottom-20 text-6xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {text.map((word, i) =>
          i === 2 ? (
            <motion.span
              key={i}
              className="text-gray-900"
              variants={spanVariants}
            >
              {word}
            </motion.span>
          ) : (
            <motion.span
              key={i}
              className="mr-5 text-white"
              variants={spanVariants}
            >
              {word}
            </motion.span>
          )
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export const AnimatedTextLower = () => {
  const text = ['CREATED', 'BY', 'KIWASTHAL'];
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <AnimatePresence>
      <motion.div
        className="flex absolute z-20 left-5  bottom-0 text-6xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        ref={ref}
      >
        {text.map((word, i) =>
          i === 2 ? (
            <motion.span
              key={i}
              className=" text-gray-900"
              variants={spanVariants}
            >
              {word}
            </motion.span>
          ) : (
            <motion.span
              key={i}
              className="mr-5 text-white"
              variants={spanVariants}
            >
              {word}
            </motion.span>
          )
        )}
      </motion.div>
    </AnimatePresence>
  );
};
