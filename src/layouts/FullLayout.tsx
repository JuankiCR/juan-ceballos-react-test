import React, { ReactNode, useEffect } from 'react';
import styles from './FullLayout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const FullLayout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    return () => {
      document.body.style.background = "";
    };
  }, []);

  return (
    <div className={ styles.container }>
      { children }
    </div>
  );
};

export default FullLayout;