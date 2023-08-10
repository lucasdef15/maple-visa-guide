import { Outlet, Link } from 'react-router-dom';

export default function MenbersLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to='/'>Home</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
