import { useEffect, useState } from 'react';
import axios from 'axios';
import MenbersPlanCard from '../components/cards/MenbersPlanCard';
import { Stack } from '@mui/material';
import config from '../utilities/config';

const ContainerStyles = {
  minHeight: { xs: '100vh', sm: 'calc(100vh - 100px)' },
};

export default function MenbersPlan() {
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    fetchPrice();
  }, []);

  const fetchPrice = async () => {
    const response = await axios.get(`${config.APP_BASE_URL}/subs/prices`);

    setPrices(response.data.data);
  };
  return (
    <Stack
      sx={ContainerStyles}
      direction='row'
      justifyContent='center'
      alignItems='center'
      spacing={2}
      style={{ position: 'relative', zIndex: -1 }}
    >
      {prices &&
        prices.map((price) => (
          <MenbersPlanCard
            key={price.nickname}
            planName={price.nickname}
            price={price.unit_amount}
            priceId={price.id}
          />
        ))}
    </Stack>
  );
}
