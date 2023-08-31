import { useState, useContext } from 'react';
import { Stack } from '@mui/material';
import { routesVariants } from '../animations/animations';
import { motion } from 'framer-motion';
import TinyMCEditor from '../components/tinyMCEditor/TinyMCEditor';
import { DarkModeContext } from '../contexts/DarkModeContext';
import Categories from '../components/categories/Categories';

export default function Write() {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');

  const { darkMode } = useContext(DarkModeContext);
  //   try {
  //     const htmlString = value;

  //     const regexPattern = /src="(data:image\/[^;]+;base64[^"]+)"/gi;

  //     let matches;
  //     const extractedMatches = [];

  //     while ((matches = regexPattern.exec(htmlString)) !== null) {
  //       extractedMatches.push(matches[1]);
  //     }

  //     let updatedHTML = value;

  //     const updatedHTMLPromises = extractedMatches.map(async (match) => {
  //       const res = await axios.post('${config.APP_BASE_URL}/upload64', {
  //         imageData: match,
  //       });
  //       const data = res.data;

  //       const imgURL = `${config.APP_BASE_URL}/uploads/${data.fileName}`;

  //       return (updatedHTML = updatedHTML.replace(
  //         data.base64ImageData,
  //         imgURL
  //       ));
  //     });

  //     const updatedHTMLArray = await Promise.all(updatedHTMLPromises);
  //     return updatedHTMLArray[1];
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <motion.div
      variants={routesVariants}
      initial='initial'
      animate='visible'
      exit='exit'
      style={{ position: 'relative', zIndex: -1 }}
    >
      <Stack
        className='add'
        direction={{ xs: 'column', lg: 'row' }}
        useFlexGap
        spacing={3}
        sx={{ m: { xs: '11rem 1rem', sm: '3rem 2rem' } }}
      >
        <Stack flex={7} sx={{ mb: { xs: 0, lg: '15rem' } }}>
          <input
            type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              background: darkMode ? '#222f3e' : '#fff',
              color: darkMode ? '#fff' : '',
              borderColor: darkMode ? '#222f3e' : '',
              padding: '10px',
              fontSize: '18px',
              border: '1px solid lightgray',
              borderRadius: '10px',
              paddingLeft: '1rem',
              marginBottom: '1rem',
            }}
          />
          <TinyMCEditor setValue={setValue} value={value} />
        </Stack>
        <Stack
          className='menu'
          flex={2}
          sx={{
            '& .item': {
              border: '1px solid lightgray',
              padding: '1rem',
              minHeight: '150px',
              borderRadius: '15px',
              marginBottom: '1rem',
              color: darkMode ? '#fff' : '',
            },
          }}
        >
          <Categories title={title} value={value} postData={null} />
        </Stack>
      </Stack>
    </motion.div>
  );
}
