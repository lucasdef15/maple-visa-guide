import { Stack, Card, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CardProps {
  body: string;
  artist: string;
  bgColor: string;
  color: string;
  size: string;
  avatar: string;
}

const SubTitleStyles = styled('span')(({ theme }) => ({
  backgroundColor: '#bababa77',
  fontSize: '13px',
  width: 'fit-content',
  padding: '.1rem .5rem',
  borderRadius: theme.shape.borderRadius,
  fontWeight: 'light',
}));

const StyledCard = styled(Card)(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  //   alignItems: 'center',
  zIndex: 1,
  '&::after': {
    content: `'"'`,
    fontSize: '160px',
    fontFamily: 'Secular One, sans-serif',
    transform: 'rotate(185deg)',
    position: 'absolute',
    width: '100px',
    height: '100px',
    top: '30px',
    left: '5px',
    zIndex: -1,
    color: '#ffffff26',
    backgroundColor: '#ffffff0',
  },
}));

export default function HomeCard({
  body,
  artist,
  bgColor,
  color,
  size,
  avatar,
}: CardProps) {
  return (
    <Stack>
      <StyledCard
        sx={{
          maxWidth: size,
          minHeight: '234px',
          padding: 3,
          bgcolor: bgColor,
          color: color,
          fontSize: 18,
        }}
      >
        <Typography
          sx={{
            fontWeight: '500',
            fontSize: 16,
            letterSpacing: '.8px',
            lineHeight: '28px',
          }}
        >
          {body}
        </Typography>
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Avatar src={avatar} />
          <Stack>
            <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
              {artist}
            </Typography>
            <SubTitleStyles style={{ color: `${color} !important` }}>
              Senior Strategist
            </SubTitleStyles>
          </Stack>
        </Stack>
      </StyledCard>
    </Stack>
  );
}
