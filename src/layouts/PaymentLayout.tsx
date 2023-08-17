import { Outlet } from 'react-router-dom';
import DesktopNavBar from '../components/header/DesktopNav/DesktopNavBar';
import MobileNavBar from '../components/header/MobileNav/MobileNavBar';

export default function MenbersLayout() {
  return (
    <>
      <DesktopNavBar />
      <MobileNavBar />
      <Outlet />
    </>
  );
}
