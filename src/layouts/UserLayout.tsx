import React, { ReactNode } from 'react';
import styles from './UserLayout.module.scss';

import Header from '../ui/Header';

interface LayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={ styles.container }>
      <Header />
      { children }
    </div>
  );
};

export default UserLayout;