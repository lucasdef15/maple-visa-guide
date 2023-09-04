import SideMenuCard from '../cards/SideMenuCard';
import { Stack, Typography } from '@mui/material';

export default function PostSideMenu({ categoryID, postId, setLoading }: any) {
  return (
    <Stack spacing={{ xs: 7, lg: 4 }}>
      <Typography
        sx={{
          color: 'text.secondary',
          fontSize: '25px',
          fontWeight: 'bold',
          textAlign: { xs: 'center', lg: 'left' },
        }}
      >
        Other Posts you may like
      </Typography>

      <Stack
        useFlexGap
        spacing={4}
        justifyContent={'center'}
        flexWrap={'wrap'}
        direction={{ xs: 'row', lg: 'column' }}
      >
        <SideMenuCard
          categoryID={categoryID}
          postId={postId}
          setLoadingPostPage={setLoading}
        />
      </Stack>
    </Stack>
  );
}
