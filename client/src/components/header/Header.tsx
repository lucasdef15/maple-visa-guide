import { useLocation } from 'react-router-dom';
import MobileNavBar from './MobileNav/MobileNavBar';
import HeaderStripe from './DesktopNav/HeaderStripe';
import DesktopNavBar from './DesktopNav/DesktopNavBar';

export default function Header() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && <HeaderStripe />}
      <DesktopNavBar />
      <MobileNavBar />
    </>
  );
}
