import { Navigate, useRoutes } from 'react-router-dom';
import DefaultLayout from "../layout/defaultLayout";

import TokenChecker from '../pages/tokenchecker';
import Statistic from '../pages/statistic';
import Code from '../pages/code';
// import Home from "../pages/home";;

export default function Router() {
  return useRoutes([
    { 
      path: '/',
      children: [
        { path: '/', element: <Navigate to='/tokenchecker' replace /> },
        { path: '/tokenchecker', element: <TokenChecker /> }, 
        { path: '/tokenchecker/:address', element: <TokenChecker /> }, 
      ]
    },
    {
      element: <DefaultLayout />,
      children: [
        { path: '/home', element: <TokenChecker /> },
        { path: '/statistic', element: <Statistic /> },
        { path: '/code', element: <Code /> },
      ]
    }
  ])
}