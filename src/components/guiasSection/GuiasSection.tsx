import { styled } from '@mui/material/styles';
import { MdLibraryBooks } from 'react-icons/md';
import { Gi3DStairs } from 'react-icons/gi';
import { GiPassport } from 'react-icons/gi';
import { Stack } from '@mui/material';
import GuiasCard from './GuiasCard';
import GuiasButton from './GuiasButton';
import ModalComponent from '../modal/Modal';

const Spikes = styled('section')(() => ({
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#01244A',
  background: 'linear-gradient(24deg, #01244A 0%, #005385 100%); ',
  marginBlock: '100px',
  height: '100vh',
  minHeight: '780px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '30px',
  zIndex: -1,
  '@media (max-width: 900px)': {
    height: 'auto',
    maxHeight: 'none',
    paddingBlock: '100px',
    gap: '80px',
  },

  '&::before, &::after': {
    '--spike-width': '50px',
    '--spike-height': '10px',
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '50px',
    background: '#f7f7f7',
    maskSize: 'var(--spike-width) var(--spike-height)',
    maskRepeat: 'repeat-X',
  },
  '&::after': {
    top: 0,
    maskImage: 'url("/assets/svgs/triangle.svg")',
  },
  '&::before': {
    bottom: '-40px',
    maskImage: 'url("/assets/svgs/triangleUpwords.svg")',
  },
}));

export default function GuiasSection() {
  const card1 = [
    'Como criar sua conta no site do Governo Canadense.',
    'Lorem ipsum dolor sit.',
    'Lorem ipsum dolor sit.',
    'Lorem ipsum dolor sit.',
  ];
  const card2 = [
    'Como se organizar com os documentos.',
    'Como agendar sua biometria.',
    'Como realizar o exame medico.',
    'Como enviar um Web Form.',
    'Como é a logica da comprovação financeira.',
    'Como comprovar união estável.',
    'Como fazer o pagamento da minha aplicação no site do governo.',
  ];
  const card3 = [
    'ETA.',
    'Turista',
    'Estudante',
    'Trabalho (Depende de Aluno de College)',
  ];

  const token = localStorage.getItem('token');

  return (
    <Spikes>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent='center'
        alignItems='end'
        spacing={{ xs: 10, md: 2, lg: 3 }}
      >
        <GuiasCard
          icon={<Gi3DStairs />}
          title='PASSO A PASSO'
          subTitle='Um Passo a Passo Para o Sucesso'
          items={card1}
        />
        <GuiasCard
          icon={<GiPassport />}
          title='GUIAS PRATICOS'
          subTitle='Simplificando o Caminho'
          items={card2}
        />
        <GuiasCard
          icon={<MdLibraryBooks />}
          title='TIPOS DE VISTOS'
          subTitle='Um Guia Abrangente'
          items={card3}
        />
      </Stack>
      {token ? (
        <GuiasButton />
      ) : (
        <ModalComponent
          text='Começar Agora'
          variant='contained'
          color='primary'
        />
      )}
    </Spikes>
  );
}
