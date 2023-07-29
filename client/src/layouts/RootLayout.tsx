import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

export default function RootLayout() {
  return (
    <div>
      <Header />
      <section>
        <Outlet />
      </section>
    </div>
  );
}
