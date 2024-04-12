import React, { ReactNode } from 'react';
import IdeClone from '../components/IdeClone';

export interface routing {
  path: string;
  name: string;
  component: ReactNode;
}

export const routes: routing[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: <IdeClone />,
  },
  {
    path: '/add',
    name: 'Add',
    component: <IdeClone />,
  },
];
