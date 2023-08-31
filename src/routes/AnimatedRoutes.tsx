import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Loader from '../components/loaders/Loader';

// Pages
const LazyHome = lazy(() => import('../pages/Home'));
const LazyAbout = lazy(() => import('../pages/About'));
const LazyContact = lazy(() => import('../pages/Contact'));
const LazyGuias = lazy(() => import('../pages/Guias'));
const LazyMenbersPlan = lazy(() => import('../pages/MenbersPlan'));
const LazyForum = lazy(() => import('../pages/Forum'));
const LazyDashboard = lazy(() => import('../pages/Dashboard'));
const LazyPostPage = lazy(() => import('../pages/PostPage'));
const LazyWrite = lazy(() => import('../pages/Write'));
const LazyEdit = lazy(() => import('../pages/Edit'));

// Layouts
const LazyRootLayout = lazy(() => import('../layouts/RootLayout'));
const LazyMenbersLayout = lazy(() => import('../layouts/MenbersLayout'));
const LazyPaymentLayout = lazy(() => import('../layouts/PaymentLayout'));

// Protected Routes
import { ProtectedRoute } from './ProtectedRoute';
import { ProtectedMenbersRoute } from './ProtectedMenbersRoute';

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

          <Route path='/membros' element={<ProtectedRoute />}>
            <Route element={<ProtectedMenbersRoute />}>
              <Route element={<LazyMenbersLayout />}>
                <Route
                  path='dashboard'
                  element={
                    <Suspense fallback={<Loader />}>
                      <LazyDashboard />
                    </Suspense>
                  }
                />
                <Route
                  path='forum'
                  element={
                    <Suspense fallback={<Loader />}>
                      <LazyForum />
                    </Suspense>
                  }
                />
                <Route
                  path='guias'
                  element={
                    <Suspense fallback={<Loader />}>
                      <LazyGuias />
                    </Suspense>
                  }
                />
                <Route
                  path='guias/:id'
                  element={
                    <Suspense fallback={<Loader />}>
                      <LazyPostPage />
                    </Suspense>
                  }
                />
                <Route
                  path='guias/write'
                  element={
                    <Suspense fallback={<Loader />}>
                      <LazyWrite />
                    </Suspense>
                  }
                />
                <Route
                  path='guias/edit/:id'
                  element={
                    <Suspense fallback={<Loader />}>
                      <LazyEdit />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}