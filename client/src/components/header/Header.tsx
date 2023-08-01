import MobileNavBar from './MobileNav/MobileNavBar';
import HeaderStripe from './DesktopNav/HeaderStripe';
import DesktopNavBar from './DesktopNav/DesktopNavBar';

export default function Header() {
  return (
    <>
      <HeaderStripe />
      <DesktopNavBar />
      <MobileNavBar />
    </>
  );
}
