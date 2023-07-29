import { styled } from '@mui/material/styles';
import FaqHeader from './FaqHeader';
import BasicAccordion from './Accordion';

const StyledFaqSection = styled('section')(() => ({
  marginBlock: '200px',
}));

export default function GuiasHeader() {
  return (
    <StyledFaqSection className='spacing'>
      <FaqHeader />
      <BasicAccordion />
    </StyledFaqSection>
  );
}
