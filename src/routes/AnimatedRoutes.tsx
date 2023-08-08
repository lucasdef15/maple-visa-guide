import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Loader from '../components/loaders/Loader';
import { ProtectedRoute } from './ProtectedRoute';

// Pages
const LazyHome = lazy(() => import('../pages/Home'));
const LazyAbout = lazy(() => import('../pages/About'));
const LazyContact = lazy(() => import('../pages/Contact'));
const LazyMenbers = lazy(() => import('../pages/Menbers'));
const LazyMenbersPlan = lazy(() => import('../pages/MenbersPlan'));

// Layouts
const LazyRootLayout = lazy(() => import('../layouts/RootLayout'));

export default function AnimatedRoutes() {
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<LazyRootLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <LazyHome />
              </Suspense>
            }
          />
          <Route
            path='sobre'
            element={
              <Suspense fallback={<Loader />}>
                <LazyAbout />
              </Suspense>
            }
          />
          <Route
            path='contato'
            element={
              <Suspense fallback={<Loader />}>
                <LazyContact />
              </Suspense>
            }
          />
          <Route path='membros' element={<ProtectedRoute />}>
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <LazyMenbers />
                </Suspense>
              }
            />
          </Route>
          <Route path='membros-plano' element={<ProtectedRoute />}>
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <LazyMenbersPlan />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
