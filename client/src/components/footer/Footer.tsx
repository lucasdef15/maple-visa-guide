import { styled } from '@mui/material/styles';
import footerPic from '/assets/imgs/footerPic.png';
import whiteLogo from '/logoWhite.svg';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { Stack, Typography } from '@mui/material';

const StyledFooter = styled('footer')(() => ({
  position: 'relative',
  color: 'white',
  height: '50vh',
  overflow: 'hidden',
  background:
    'radial-gradient(circle,rgba(0, 0, 136, 0.842) 10%, #01244aef 90%)',

  '@media (max-width: 768px)': {
    height: '70vh',
  },
  '& .bgImg': {
    position: 'absolute',
    mixBlendMode: 'multiply',
    filter: 'brightness(0.1)',
    zIndex: '-1',
    '@media (max-width: 768px)': {
      scale: '3',
    },
  },
}));
const StyledLogo = styled('div')(() => ({
  '& img': {
    width: '105px',
    paddingBlock: '.5rem',
  },
  '& div': {
    // backgroundColor: '#dfdfdf',
    paddingBlock: '1rem',
    borderTop: '2px solid #e5e5fcc3',
    display: 'flex',
    width: '170%',
  },
}));
const StyledIconsContainer = styled(Stack)(() => ({
  '& svg': {
    width: '25px',
    height: '25px',
  },
}));

export default function Footer() {
  return (
    <StyledFooter>
      <img className='bgImg' src={footerPic} />
      <Stack
        className='spacing'
        sx={{ marginBlock: '50px', position: 'relative', height: '50vh' }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
          spacing={2}
        >
          <StyledLogo>
            <img src={whiteLogo} alt='' />
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
                Resources
              </Typography>
              <Stack
                spacing={0.7}
                sx={{ opacity: '.9', fontWeight: '500', fontSize: '15px' }}
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
            opacity: 0.7,
            padding: '2rem 0',
            borderTop: '1px solid #e1e1e16f',
            position: 'absolute',
            width: '100%',
            bottom: { xs: '-100px', sm: '52px' },
            fontSize: { xs: '13px', sm: '16px' },
          }}
        >
          <small>2023 MapleCompany, Inc. All Rights rreserved.</small>
          <Stack
            direction='row'
            spacing={2}
            sx={{ fontSize: { xs: '13px', sm: '15px' } }}
          >
            <a href='#'>Privacy</a>
            <a href='#'>Terms</a>
          </Stack>
        </Stack>
      </Stack>
    </StyledFooter>
  );
}
