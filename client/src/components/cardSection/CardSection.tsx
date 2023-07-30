import { styled } from '@mui/material/styles';
import WordsStripe from './WordsStripe';
import HomeCard from './HomeCard';
import woman from '/assets/imgs/woman.jpg';
import man1 from '/assets/imgs/man1.jpg';
import { Stack, Card, CardContent, Typography } from '@mui/material';

const StyledContainer = styled('div')(() => ({
  marginBlock: '200px',
  width: '100%',
  height: '70vh',
  backgroundColor: '#08AEEA',
  backgroundImage:
    ' linear-gradient(-90deg, #08AEEA 0%, #2AF598 100%); --mask:radial-gradient(24.60px at 50% 34.50px,#000 99%,#0000 101%) calc(50% - 30px) 0/60px 51% repeat-x,radial-gradient(24.60px at 50% -19.5px,#0000 99%,#000 101%) 50% 15px/60px calc(51% - 15px) repeat-x,radial-gradient(24.60px at 50% calc(100% - 34.50px),#000 99%,#0000 101%) calc(50% - 30px) 100%/60px 51% repeat-x,radial-gradient(24.60px at 50% calc(100% + 19.50px),#0000 99%,#000 101%) 50% calc(100% - 15px)/60px calc(51% - 15px) repeat-x;-webkit-mask: var(--mask);mask: var(--mask);',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function CardSection() {
  const cardOneBody =
    'Simplificamos a aplicação do visto. Encontre informações e orientações detalhadas para entender o processo e preencher os formulários com facilidade.';
  const cardThreeBody =
    'Garantimos seu sucesso! Conte com nossa ajuda em todas as etapas do processo para tornar sua experiência de solicitação de visto tranquila, bem-sucedida e sem preocupações.';
  return (
    <StyledContainer>
      <Stack sx={{ maxWidth: '1080px' }}>
        <WordsStripe />
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={2}
        >
          <HomeCard
            body={cardOneBody}
            artist='Chistine Lawson'
            bgColor='#01487C'
            color='white'
            size='324px'
            avatar={woman}
          />
          <Card
            sx={{
              minHeight: '234px',
              maxWidth: '290px',
              background: '#6a6ac9',
            }}
          >
            <CardContent>
              <Typography fontSize='38px' color='white' fontWeight='bold'>
                100%
              </Typography>
              <Typography
                sx={{
                  fontWeight: '500',
                  fontSize: 16,
                  letterSpacing: '.8px',
                  lineHeight: '28px',
                  color: 'white',
                }}
              >
                As orientações detalhadas no guia garantem sucesso na
                solicitação de visto independente.
              </Typography>
            </CardContent>
          </Card>
          <HomeCard
            body={cardThreeBody}
            artist='Andreas Larry'
            bgColor='#e9efffd1'
            color='222222'
            size='404px'
            avatar={man1}
          />
        </Stack>
      </Stack>
    </StyledContainer>
  );
}
