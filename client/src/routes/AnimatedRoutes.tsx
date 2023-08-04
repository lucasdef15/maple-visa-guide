import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Loader from '../components/loaders/Loader';

// Pages

const LazyHome = lazy(() => import('../pages/Home'));
const LazyAbout = lazy(() => import('../pages/About'));
const LazyContact = lazy(() => import('../pages/Contact'));
const LazyMenbers = lazy(() => import('../pages/Menbers'));

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
            path='about'
            element={
              <Suspense fallback={<Loader />}>
                <LazyAbout />
              </Suspense>
            }
          />
          <Route
            path='contact'
            element={
              <Suspense fallback={<Loader />}>
                <LazyContact />
              </Suspense>
            }
          />
          <Route
            path='contact'
            element={
              <Suspense fallback={<Loader />}>
                <LazyMenbers />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
