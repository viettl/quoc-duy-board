import { PATHS } from '@/helper/constants';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const HomePage = lazy(() => import('@/pages/HomePage'));
const NotFound = lazy(() => import('@/pages/authenticate/404'));

export default function Routes() {
  return useRoutes([
    {
      path: PATHS.HOME,
      element: <HomePage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
}
