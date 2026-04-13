import './CreativeGallery.css';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

function GalleryImage({ src, alt, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  
  return (
    <figure ref={ref} data-string="lerp[]" className={`sg-image lerp-wrapper ${className} ${isInView ? '-inview' : ''}`}>
      <img src={src} alt={alt} loading="lazy" className="lerp-image" />
    </figure>
  );
}

export default function CreativeGallery() {
  return (
    <section className="creative-gallery-section" id="gallery">
      <div className="gallery-header">
        <h2 className="section-title">
          <span className="text-gradient">Visual</span> Perspectives
        </h2>
        <p className="section-subtitle">
          Capturing moments and creative explorations.
        </p>
      </div>

      <div className="sg-wrapper">
        <GalleryImage className="sg-image-1" src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80" alt="Cyber Setup" />
        <GalleryImage className="sg-image-2" src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80" alt="Code Matrix" />
        <GalleryImage className="sg-image-3" src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80" alt="Minimalist Keyboard" />
        <GalleryImage className="sg-image-4" src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80" alt="Tech Architecture" />
        <GalleryImage className="sg-image-5" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" alt="Coding Monitor" />
        <GalleryImage className="sg-image-6" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" alt="Digital Abstract" />
      </div>
    </section>
  );
}
