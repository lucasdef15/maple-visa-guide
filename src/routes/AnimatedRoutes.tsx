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
const LazyMenbersLayout = lazy(() => import('../layouts/MenbersLayout'));
const LazyPaymentLayout = lazy(() => import('../layouts/PaymentLayout'));

export default function AnimatedRoutes() {
  return (
    <AnimatePresence>
      <Suspense fallback={<Loader />}>
        {/* layout 01 */}
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
          </Route>
          {/* layout 02 */}
          <Route path='/plano' element={<ProtectedRoute />}>
            <Route path='' element={<LazyPaymentLayout />}>
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
          {/* layout 03 */}
          <Route path='/guias' element={<ProtectedRoute />}>
            <Route path='posts' element={<LazyMenbersLayout />}>
              <Route
                index
                element={
                  <Suspense fallback={<Loader />}>
                    <LazyMenbers />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

{
  /* <Route path='membros' element={<ProtectedRoute />}>
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
          </Route> */
}