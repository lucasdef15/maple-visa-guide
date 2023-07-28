import { styled } from '@mui/material/styles';

const StyledVideo = styled('div')(() => ({
  marginBlock: '70px',
  display: 'grid',
  placeContent: 'center',
}));

export default function Video() {
  return (
    <StyledVideo>
      <iframe
        style={{ borderRadius: '25px' }}
        width='1080'
        height='480'
        src='https://www.youtube.com/embed/TknrmpS4GOg'
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen'
      ></iframe>
    </StyledVideo>
  );
}
