import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Menbers from './pages/Menbers';

// Layouts
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/sobre' element={<About />} />
      <Route path='/contato' element={<Contact />} />
      <Route path='/assinantes' element={<Menbers />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
