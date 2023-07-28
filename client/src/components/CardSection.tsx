import { styled } from '@mui/material/styles';
import WordsStripe from './WordsStripe';
import HomeCard from './HomeCard';
import woman from '/assets/imgs/woman.jpg';
import man1 from '/assets/imgs/man1.jpg';
import { Stack, Card, CardContent, Typography } from '@mui/material';

const StyledContainer = styled('div')(() => ({
  marginBlock: '200px',
}));

export default function CardSection() {
  const cardOneBody =
    'Simplificamos a aplicação do visto. Encontre informações e orientações detalhadas para entender o processo e preencher os formulários com facilidade.';
  const cardThreeBody =
    'Garantimos seu sucesso! Conte com nossa ajuda em todas as etapas do processo para tornar sua experiência de solicitação de visto tranquila, bem-sucedida e sem preocupações.';
  return (
    <StyledContainer className='spacing'>
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
          bgColor='#01244A'
          color='white'
          size='324px'
          avatar={woman}
        />
        <Card
          sx={{
            minHeight: '234px',
            maxWidth: '290px',
            background: '#00008073',
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
              As orientações detalhadas no guia garantem sucesso na solicitação
              de visto independente.
            </Typography>
          </CardContent>
        </Card>
        <HomeCard
          body={cardThreeBody}
          artist='Andreas Larry'
          bgColor='#01244a75'
          color='222222'
          size='404px'
          avatar={man1}
        />
      </Stack>
    </StyledContainer>
  );
}
