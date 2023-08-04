import { styled } from '@mui/material/styles';
import FaqHeader from './FaqHeader';
import BasicAccordion from './Accordion';
import { useContext } from 'react';
import MainContext from '../../contexts/MainContext';

const StyledFaqSection = styled('section')(() => ({
  marginBlock: '200px',
}));

export default function GuiasHeader() {
  const { isOpen } = useContext(MainContext);
  return (
    <StyledFaqSection
      className='spacing'
      style={{
        position: isOpen ? 'relative' : 'static',
        zIndex: isOpen ? -1 : 'auto',
      }}
    >
      <FaqHeader />
      <BasicAccordion />
    </StyledFaqSection>
  );
}
