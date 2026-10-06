import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import DyeWhorl from '@/components/ui/dye-whorl';

export default function CinematicBackground() {
  const { scrollY } = useScroll();
  
  // Use a spring to make the scroll transition feel incredibly smooth (ease-in-out feel)
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    mass: 1
  });

  // Map 0 to 800px (roughly one viewport height, i.e., scrolling past hero)
  const blur = useTransform(smoothScrollY, [0, 800], [0, 12]);
  const scale = useTransform(smoothScrollY, [0, 800], [1, 1.08]);
  const brightness = useTransform(smoothScrollY, [0, 800], [100, 82]);
  const saturation = useTransform(smoothScrollY, [0, 800], [100, 90]);
  const opacity = useTransform(smoothScrollY, [0, 800], [1, 0.75]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden" style={{ backgroundColor: 'rgba(var(--background), 1)' }}>
      
      {/* Dynamic Master Layer */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{
          scale,
          opacity,
          filter: useTransform(
            [blur, brightness, saturation],
            ([b, br, s]) => `blur(${b}px) brightness(${br}%) saturate(${s}%)`
          )
        }}
      >
        <DyeWhorl
          className="w-full h-full"
          speed={1}
          density={1}
          stir={1}
        />
      </motion.div>

      {/* Warm ambient glow overlays */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full blur-[100px] mix-blend-screen pointer-events-none" style={{ backgroundColor: 'rgba(var(--accent), 0.12)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full blur-[90px] mix-blend-screen pointer-events-none" style={{ backgroundColor: 'rgba(var(--accent-secondary), 0.1)' }} />
    </div>
  );
}
