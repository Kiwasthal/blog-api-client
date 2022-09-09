import { useRouter } from 'next/router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const variants = {
  scaleDown: {
    scale: 0.8,
    y: 100,
    transition: {
      duration: 0.4,
    },
  },
  out: {
    x: '-100%',
    transition: {
      duration: 0.4,
      delay: 0.5,
    },
  },
  in: {
    scale: 0.8,
    y: 100,
    x: '100%',
    transition: {
      duration: 0.4,
    },
  },
  center: {
    x: 0,
    scale: 0.8,
    transformOrigin: 'top',
    transition: {
      duration: 0.4,
    },
  },
  scaleUp: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.5,
    },
  },
};

const Transition = ({ children }) => {
  const { asPath } = useRouter();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="effect">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={asPath}
          variants={!shouldReduceMotion ? variants : null}
          initial="in"
          animate={['center', 'scaleUp']}
          exit={['scaleDown', 'out']}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Transition;
