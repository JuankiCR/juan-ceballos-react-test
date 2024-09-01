import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';

interface OptimizedImageProps {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  placeholderSrc?: string;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  srcSet,
  sizes,
  placeholderSrc,
  className,
}) => {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '50px 0px',
  });

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div ref={ref} className={clsx('image-wrapper', className)}>
      {inView && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          onLoad={handleLoad}
          className={clsx('image', { 'image--loaded': loaded })}
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
        />
      )}
      {!loaded && placeholderSrc && (
        <img
          src={placeholderSrc}
          alt="placeholder"
          className="image-placeholder"
        />
      )}
    </div>
  );
};

export default OptimizedImage;
