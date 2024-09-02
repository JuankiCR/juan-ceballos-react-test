import React, { ReactNode } from 'react';
import styles from './UserLayout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={ styles.container }>
      { children }
    </div>
  );
};

export default UserLayout;