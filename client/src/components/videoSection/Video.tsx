import { styled } from '@mui/material/styles';

const StyledVideo = styled('div')(() => ({
  marginBlock: '70px',
  overflow: 'hidden',
  position: 'relative',
  '& iframe': {
    overflow: 'hidden',
    border: 0,
    alignSelf: 'center',
    posiiton: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    aspectRatio: '16 / 9',
  },
}));

export default function Video() {
  return (
    <StyledVideo>
      <iframe
        style={{ borderRadius: '25px' }}
        src='https://www.youtube.com/embed/TknrmpS4GOg'
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;'
        allowFullScreen
      />
    </StyledVideo>
  );
}
