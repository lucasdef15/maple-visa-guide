import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  maxWidth: '846px',
  borderRadius: '10px',
  background: '#ffffff',
  boxShadow: '5px 5px 0px 0px #01244a',
  color: theme.palette.primary.dark,
  overflow: 'hidden',
}));

export default function BasicAccordion() {
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={3}
    >
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography sx={{ ml: '10px', fontSize: '18px' }}>
            Who is this program for?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ ml: '10px', fontSize: '18px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography sx={{ ml: '10px', fontSize: '18px' }}>
            Are there ane prerequisites for this program?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ ml: '10px', fontSize: '18px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel3a-content'
          id='panel3a-header'
        >
          <Typography sx={{ ml: '10px', fontSize: '18px' }}>
            When do the live group call & guest sessions happens?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ ml: '10px', fontSize: '18px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel3a-content'
          id='panel3a-header'
        >
          <Typography sx={{ ml: '10px', fontSize: '18px' }}>
            who are your placement partners?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ ml: '10px', fontSize: '18px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
    </Stack>
  );
}
