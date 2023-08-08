import { styled } from '@mui/material/styles';
import footerPic from '/assets/imgs/footerPic.png';
import Logo from '../logo/Logo';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { Stack, Typography } from '@mui/material';

const StyledFooter = styled('footer')(() => ({
  position: 'relative',
  color: 'white',
  height: '50vh',
  overflow: 'hidden',
  background: 'radial-gradient(circle,#005385 0%, #01244A 100%)',
  '& .bgImg': {
    position: 'absolute',
    mixBlendMode: 'multiply',
    filter: 'brightness(1)',
    zIndex: '2',
    '@media (max-width: 768px)': {
      scale: '3',
    },
  },
}));
const StyledLogo = styled('a')(() => ({
  width: '15%',
  minWidth: '150px',
  '& svg': {
    width: '100%',
  },
}));
const StyledIconsContainer = styled(Stack)(() => ({
  '& svg': {
    width: '25px',
    height: '25px',
  },
  '& a': {
    color: '#ffffffa2',
    transition: 'color 250ms linear',
  },
  '& a:hover': {
    color: '#ffffff',
  },
}));

export default function Footer() {
  return (
    <StyledFooter>
      <img loading='lazy' className='bgImg' src={footerPic} />
      <Stack
        className='spacing'
        sx={{
          marginBlock: '50px',
          position: 'relative',
          height: { xs: '69%', sm: '100%' },
          width: '100%',
          zIndex: '5',
        }}
      >
        <Stack sx={{ width: '100%', maxWidth: '1080px' }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='flex-start'
            spacing={2}
            sx={{ marginInline: '1rem' }}
          >
            <StyledLogo href='#'>
              <Logo color='#fff' />
            </StyledLogo>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={5}
              sx={{ textAlign: 'right' }}
            >
              <div>
                <Typography
                  variant='h5'
                  component='h6'
                  sx={{
                    borderBottom: '2px solid #5353F3',
                    paddingBottom: '5px',
                    marginBottom: '15px',
                  }}
                >
                  Blog
                </Typography>
                <Stack
                  spacing={0.7}
                  sx={{
                    opacity: '.9',
                    fontWeight: '500',
                  }}
                >
                  <a href='#'>IOS & Android</a>
                  <a href='#'>Watch a Demo</a>
                  <a href='#'>Customer</a>
                  <a href='#'>API</a>
                </Stack>
              </div>
            </Stack>
          </Stack>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            spacing={2}
            sx={{
              padding: '2rem 1rem',
              borderTop: '1px solid #e1e1e16f',
              position: 'absolute',
              width: '100%',
              bottom: { xs: '-100px', sm: '52px' },
              fontSize: { xs: '13px', sm: '16px' },
            }}
          >
            <small style={{ opacity: 0.7 }}>
              2023 MapleCompany, Inc. All Rights rreserved.
            </small>
            <Stack
              direction='row'
              spacing={2}
              sx={{ fontSize: { xs: '13px', sm: '15px' } }}
            >
              <StyledIconsContainer
                direction='row'
                alignItems='center'
                spacing={1.5}
              >
                <a href='#'>
                  <AiFillInstagram />
                </a>
                <a href='#'>
                  <FaFacebook />
                </a>
                <a href='#'>
                  <BsTwitter />
                </a>
              </StyledIconsContainer>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </StyledFooter>
  );
}
