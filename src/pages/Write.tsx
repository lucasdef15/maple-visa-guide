import { useState, useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { routesVariants } from '../animations/animations';
import { motion } from 'framer-motion';
import { CategoryContext } from '../contexts/CategoryContext';
import axios from 'axios';
import moment from 'moment';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { CategoryContextValue } from '../contexts/CategoryContext';
import TinyMCEditor from '../components/tinyMCEditor/TinyMCEditor';
import { DarkModeContext } from '../contexts/DarkModeContext';
import Loader from '../components/loaders/Loader';
import config from '../utilities/config';

export default function Write() {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [cat, setCat] = useState('');
  const [newCat, setNewCat] = useState('');

  const { user } = useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);

  const navigate = useNavigate();

  const { categories, setCategories } = useContext(
    CategoryContext
  ) as CategoryContextValue;

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file as Blob);
      const res = await axios.post(`${config.APP_BASE_URL}/upload`, formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // const upload64 = async () => {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // const newContent = await upload64();

    const fileName = await upload();
    const imgURL = `${config.APP_BASE_URL}/uploads/${fileName}`;

    const catId = categories.find((category: any) => category.name === cat);

    if (!cat) {
      return alert(`Category can't be empty`);
    }

    try {
      await axios.post(`${config.APP_BASE_URL}/posts`, {
        title,
        desc: value,
        categoryID: catId?.categoryID,
        img: file ? imgURL : '',
        authorID: user?.data?.id,
        date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      });
      navigate('/membros/guias');
    } catch (error) {
      console.log(error);
    }
  };

  const addNewCategory = async () => {
    if (!newCat) return;
    try {
      const response = await axios.post(`${config.APP_BASE_URL}/cats`, {
        name: newCat,
      });
      setCategories(response.data);
      setNewCat('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCat = async (id: number) => {
    try {
      await axios.delete(`${config.APP_BASE_URL}/cats/${id}`);
      const newCategories = categories.filter(
        (category: any) => category.categoryID !== id
      );
      setCategories(newCategories);
      setNewCat('');
    } catch (error) {
      console.log(error);
    }
  };

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
          <Stack className='item' spacing={1}>
            <Typography variant={'h5'} component={'h2'} fontWeight={'bold'}>
              Publish
            </Typography>
            <span>
              <b>Status</b> Draft
            </span>
            <span>
              <b>Visibility</b> Public
            </span>
            <input
              style={{ display: 'none' }}
              type='file'
              id='file'
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
            />
            <label
              htmlFor='file'
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Upload Image
            </label>
            <span>{file?.name}</span>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              sx={{ pt: '15px' }}
            >
              <Button
                onClick={handleSubmit}
                type='submit'
                variant='contained'
                color='secondary'
                sx={{
                  borderRadius: '10px',
                  textTransform: 'unset',
                  width: '100%',
                }}
              >
                Publish
              </Button>
            </Stack>
          </Stack>

          <Stack className='item' spacing={'2px'}>
            <Typography
              variant={'h5'}
              component={'h2'}
              fontWeight={'bold'}
              sx={{ mb: '.5rem' }}
            >
              Categoria
            </Typography>
            {categories.length ? (
              categories.map((category: any) => (
                <Stack
                  key={category.categoryID}
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  spacing={2}
                >
                  <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <input
                      type='radio'
                      checked={cat === category.name}
                      name={category.name}
                      value={category.name}
                      onChange={(e) => setCat(e.target.value)}
                      id={category.name}
                      style={{ cursor: 'pointer' }}
                    />
                    <label htmlFor={cat} style={{ cursor: 'pointer' }}>
                      {category.name}
                    </label>
                  </Stack>
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleDeleteCat(category.categoryID)}
                    size='small'
                    sx={{ '&:hover': { background: 'tomato' } }}
                  >
                    <DeleteIcon fontSize='inherit' />
                  </IconButton>
                </Stack>
              ))
            ) : (
              <Loader />
            )}
            <input
              type='text'
              placeholder='Adiconar Nova Categoria'
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              style={{
                padding: '10px',
                border: '1px solid lightgray',
                borderRadius: '10px',
                paddingLeft: '1rem',
                marginBlock: '.5rem',
                background: darkMode ? '#222f3e' : '',
                borderColor: darkMode ? '#222f3e' : '',
                color: darkMode ? '#fff' : '',
              }}
            />
            <Button
              variant='outlined'
              onClick={addNewCategory}
              color='secondary'
              sx={{
                borderRadius: '10px',
                textTransform: 'unset',
                color: darkMode ? '#fff' : '',
                borderColor: darkMode ? '#fff' : '',
              }}
            >
              Adicionar Categoria
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </motion.div>
  );
}
