import logo from '/logo.svg';
import { styled } from '@mui/material/styles';
const LogoComponent = styled('div')(() => ({
  '& img': {
    width: '105px',
    height: '50px',
  },
}));

export default function Logo() {
  return (
    <LogoComponent>
      <img loading='lazy' src={logo} alt='logo' />
    </LogoComponent>
  );
}
