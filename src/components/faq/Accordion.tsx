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
          <Typography sx={{ ml: '10px', fontSize: '18px', fontWeight: 'bold' }}>
            O que é o Maple Visa Guide?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ ml: '10px', fontSize: '18px' }}>
            O Maple Visa Guide é um site que oferece guias e instruções
            detalhadas para ajudar as pessoas a aplicar para seus vistos de
            forma independente. Nele, você encontrará informações passo a passo
            sobre o processo de obtenção de visto, permitindo que você entenda
            melhor o procedimento e consiga realizar o processo por conta
            própria.
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography sx={{ ml: '10px', fontSize: '18px', fontWeight: 'bold' }}>
            Quais são os tipos de vistos disponíveis no Maple Visa Guide?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol style={{ padding: '0 50px 10px 30px' }}>
            <li style={{ marginBottom: '10px' }}>
              <Typography sx={{ ml: '10px', fontSize: '18px' }}>
                No Maple Visa Guide, você encontrará guias e informações
                relacionadas aos seguintes tipos de vistos para o Canadá:
              </Typography>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Typography sx={{ ml: '10px', fontSize: '18px' }}>
                ETA (Electronic Travel Authorization) - Autorização Eletrônica
                de Viagem para entrada no Canadá por via aérea como turista ou
                em trânsito.
              </Typography>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Typography sx={{ ml: '10px', fontSize: '18px' }}>
                Visto de Turista - Para visitantes que desejam entrar no Canadá
                temporariamente para fins de turismo, lazer ou visita a
                familiares.
              </Typography>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Typography sx={{ ml: '10px', fontSize: '18px' }}>
                Visto de Estudante - Para estudantes internacionais que desejam
                ingressar em um programa educacional em uma instituição de
                ensino designada (DLI) no Canadá.
              </Typography>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Typography sx={{ ml: '10px', fontSize: '18px' }}>
                Extensão de Visto de Turista - Para estender o período de
                permanência autorizado como turista no Canadá.
              </Typography>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Typography sx={{ ml: '10px', fontSize: '18px' }}>
                Extensão de Visto de Estudante - Para estender o período de
                estudo autorizado como estudante no Canadá.
              </Typography>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Typography sx={{ ml: '10px', fontSize: '18px' }}>
                PGWP (Post-Graduation Work Permit) - Permissão de Trabalho de
                Pós-Graduação, que permite que estudantes internacionais que se
                formaram em instituições elegíveis no Canadá trabalhem
                temporariamente após a conclusão de seus estudos.
              </Typography>
            </li>
          </ol>
        </AccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel3a-content'
          id='panel3a-header'
        >
          <Typography sx={{ ml: '10px', fontSize: '18px', fontWeight: 'bold' }}>
            Os guias é somente para aplicação individual?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ ml: '10px', fontSize: '18px' }}>
            Não, os guias e instruções do Maple Visa Guide não são
            exclusivamente para aplicação individual.Você também encontrará
            orientações para aplicar com membros da sua faília no mesmo
            processo.
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel3a-content'
          id='panel3a-header'
        >
          <Typography sx={{ ml: '10px', fontSize: '18px', fontWeight: 'bold' }}>
            A Maple Visa Guide vai realizar minha aplicação?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ ml: '10px', fontSize: '18px' }}>
            A Maple Visa Guide não realizará a aplicação por você, mas forncerá
            todas as orientações necessárias e o passo a passo para que você
            possa realizar sua própria aplicação de forma correta e eficiente.
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel3a-content'
          id='panel3a-header'
        >
          <Typography sx={{ ml: '10px', fontSize: '18px', fontWeight: 'bold' }}>
            Eu não falo falo Inglês e/ou Francês. Eu consigo mesmo assim aplicar
            para o meu visto sozinho(a)?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ ml: '10px', fontSize: '18px' }}>
            Sim. Mesmo que você não fale Inglês ou Francês, o Maple Visa Guide
            fornecerá instruções detalhadas e visuais de como preencher os
            formulários necessários para a aplicação do visto. Dessa forma, você
            poderá realizar o processo de forma mais simples e compreensível,
            sem a necessidade de dominar os idiomas para aplicar para o seu
            visto de forma individual.
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
    </Stack>
  );
}
