import React from 'react';
import { motion } from 'motion/react';

interface AnimatedIconProps {
  icon: any; // Using any because of type compatibility with lucide-react
  size?: number;
  className?: string;
  animation?: 'pulse' | 'rotate' | 'shake' | 'bounce';
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ 
  icon: Icon, 
  size = 24, 
  className = "", 
  animation = 'pulse' 
}) => {
  const variants = {
    pulse: { scale: [1, 1.2, 1], transition: { duration: 0.5 } },
    rotate: { rotate: [0, 90, 0], transition: { duration: 0.6 } },
    shake: { x: [0, -4, 4, -4, 4, 0], transition: { duration: 0.4 } },
    bounce: { y: [0, -8, 0], transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      whileHover={animation}
      variants={variants}
      className={`inline-block ${className}`}
    >
      {Icon && <Icon size={size} />}
    </motion.div>
  );
};
