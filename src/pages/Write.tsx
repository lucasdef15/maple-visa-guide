import { useState, useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactQuill from 'react-quill';
import { routesVariants } from '../animations/animations';
import { motion } from 'framer-motion';
import { CategoryContext } from '../contexts/CategoryContext';
import EditorToolbar, {
  modules,
  formats,
} from '../components/reactQuill/EditorToolBar';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import moment from 'moment';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Write() {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [cat, setCat] = useState('');
  const [newCat, setNewCat] = useState('');

  const { categories } = useContext(CategoryContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file as Blob);
      const res = await axios.post('http://localhost:8080/upload', formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fileName = await upload();
    const imgURL = `http://localhost:8080/uploads/${fileName}`;

    try {
      await axios.post('http://localhost:8080/posts', {
        title,
        desc: value,
        categoryID: cat,
        img: file ? imgURL : '',
        authorID: user?.data?.id,
        date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      });
      navigate('/membros/guias');
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
        sx={{ m: '3rem 2rem' }}
      >
        <Stack className='content' flex={7}>
          <input
            type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid lightgray',
              borderRadius: '15px',
              paddingLeft: '1.5rem',
              marginBottom: '1rem',
            }}
          />
          <EditorToolbar toolbarId={'t2'} />
          <ReactQuill
            theme='snow'
            value={value}
            onChange={setValue}
            modules={modules('t2')}
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
                onClick={handleSubmit}
                type='submit'
                variant='contained'
                color='secondary'
                sx={{ borderRadius: '10px', textTransform: 'unset' }}
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
                      value={cat}
                      onChange={() => setCat(category.catId)}
                      id={cat}
                      style={{ cursor: 'pointer' }}
                    />
                    <label htmlFor={cat} style={{ cursor: 'pointer' }}>
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
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
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
