import { useState, useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactQuill from 'react-quill';
import { routesVariants } from '../animations/animations';
import { motion } from 'framer-motion';
import { CategoryContext } from '../contexts/CategoryContext';
import 'react-quill/dist/quill.snow.css';

export default function Write() {
  const [value, setValue] = useState('');

  const { categories } = useContext(CategoryContext);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];
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
        direction={'row'}
        useFlexGap
        spacing={3}
        sx={{ m: '3rem 2rem' }}
      >
        <Stack className='content' flex={7}>
          <input
            type='text'
            placeholder='Title'
            style={{
              padding: '10px',
              border: '1px solid lightgray',
              borderRadius: '15px',
              paddingLeft: '1.5rem',
              marginBottom: '1rem',
            }}
          />

          <ReactQuill
            theme='snow'
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          />
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
            <input style={{ display: 'none' }} type='file' id='file' />
            <label
              htmlFor='file'
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Upload Image
            </label>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              sx={{ pt: '15px' }}
            >
              <Button
                variant='outlined'
                sx={{ borderRadius: '10px', textTransform: 'unset' }}
              >
                Save as a draft
              </Button>
              <Button
                variant='contained'
                color='secondary'
                sx={{ borderRadius: '10px', textTransform: 'unset' }}
              >
                update
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
              Category
            </Typography>
            {categories &&
              categories.map((category: any) => (
                <Stack
                  key={category.catId}
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  spacing={2}
                >
                  <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <input
                      type='radio'
                      name='cat'
                      value='art'
                      id='art'
                      style={{ cursor: 'pointer' }}
                    />
                    <label htmlFor='art' style={{ cursor: 'pointer' }}>
                      {category.name}
                    </label>
                  </Stack>
                  <IconButton
                    aria-label='delete'
                    size='small'
                    sx={{ '&:hover': { background: 'tomato' } }}
                  >
                    <DeleteIcon fontSize='inherit' />
                  </IconButton>
                </Stack>
              ))}
          </Stack>
          <Stack className='item'>
            <Typography
              variant={'h5'}
              component={'h2'}
              fontWeight={'bold'}
              sx={{ mb: '.5rem' }}
            >
              Add New Category
            </Typography>
            <input
              type='text'
              placeholder='Categoria'
              style={{
                padding: '10px',
                border: '1px solid lightgray',
                borderRadius: '15px',
                paddingLeft: '1rem',
                marginBottom: '1rem',
              }}
            />
            <Button
              variant='contained'
              color='secondary'
              sx={{ borderRadius: '10px', textTransform: 'unset' }}
            >
              Adicionar
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </motion.div>
  );
}
