import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import ContactForm from './ContactForm';
import contactPic from '/assets/svgs/contactPic.svg';
import { useInView } from 'react-intersection-observer';

const StyledContact = styled(Stack)(() => ({
  '& .contactImage-wrapper': {
    paddingInline: '1rem',
    width: '80%',
  },
  '& .contact-wrapper': {
    width: '100%',
    maxWidth: '1080px',
  },
}));
const ContactTitle = styled('section')(({ theme }) => ({
  paddingInline: '1rem',
  marginBottom: '40px',
  '& h1': {
    fontSize: 'clamp(32px, 5vw, 48px)',
    marginBottom: '1rem',
    color: theme.palette.secondary.dark,
  },
}));

export default function ContactContent() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    delay: 100,
  });

  return (
    <StyledContact
      className='spacing'
      sx={{ marginBlock: { xs: '150px', sm: '100px' }, width: '100%' }}
    >
      <Stack
        className='contact-container'
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent='center'
        alignItems='center'
        spacing={[12, 2]}
      >
        <div className='contact-wrapper'>
          <ContactTitle>
            <h1
              ref={ref}
              className={inView ? 'slideOut' : ''}
              style={{ opacity: 0, left: '-99px', position: 'relative' }}
            >
              Contato
            </h1>
            <p
              ref={ref}
              className={inView ? 'slideOut' : ''}
              style={{ opacity: 0, left: '-99px', position: 'relative' }}
            >
              SEJA QUAL FOR A SUA DÚVIDA, COMENTÁRIO OU APENAS UM BATE-PAPO,
              VOCÊ PODE ENTRAR EM CONTATO CONOSCO ATRAVÉS DO FORMULÁRIO DE
              CONTATO NESTA PÁGINA, E-MAIL OU REDES SOCIAIS.
            </p>
          </ContactTitle>
          <ContactForm />
        </div>
        <div className='contactImage-wrapper'>
          <img
            ref={ref}
            className={inView ? 'slideOut' : ''}
            style={{ opacity: 0, left: '99px', position: 'relative' }}
            src={contactPic}
            alt='contact pic'
          />
        </div>
      </Stack>
    </StyledContact>
  );
}
