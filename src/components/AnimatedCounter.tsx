import { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  to: number;
  duration?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ to, duration = 2, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const spring = useSpring(0, {
    damping: 100,
    stiffness: 100,
    mass: duration
  });

  useEffect(() => {
    if (isInView) {
      spring.set(to);
    }
  }, [isInView, spring, to]);

  const rounded = useTransform(spring, (latest) => Math.round(latest).toLocaleString());

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
};

export default AnimatedCounter;
