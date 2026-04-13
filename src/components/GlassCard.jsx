import React, { forwardRef } from 'react';
import { motion } from 'framer-motion'

const GlassCard = forwardRef(({ 
  children, 
  className = '', 
  hoverable = false, 
  glow = false, 
  style = {},
  as = 'div',
  ...props 
}, ref) => {
  const classes = [
    'lg',
    hoverable ? 'lg-hover' : '',
    glow ? 'glow-border' : '',
    className
  ].filter(Boolean).join(' ');

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent ref={ref} className={classes} style={style} {...props}>
      {children}
    </MotionComponent>
  )
});

export default GlassCard;
