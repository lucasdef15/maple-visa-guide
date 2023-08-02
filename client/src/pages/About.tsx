import { styled } from '@mui/material/styles';
import AboutHero from '../components/about/AboutHero';
import AboutContent from '../components/about/AboutContent';

const StyledAbout = styled('div')(() => ({}));

export default function About() {
  return (
    <StyledAbout>
      <AboutHero />
      <AboutContent />
    </StyledAbout>
  );
}
