import { useState } from 'react';
import { Stack } from '@mui/material';
import ReactQuill from 'react-quill';
import { routesVariants } from '../animations/animations';
import { motion } from 'framer-motion';
import 'react-quill/dist/quill.snow.css';

export default function Write() {
  const [value, setValue] = useState('');

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
  console.log(value);
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
        <Stack className='content' flex={5}>
          <input type='text' placeholder='Title' />
          <ReactQuill
            theme='snow'
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          />
        </Stack>
        <Stack className='menu' flex={2}>
          <div className='item'>
            <h2>Publish</h2>
            <span>
              <b>Status</b> Draft
            </span>
            <span>
              <b>Visibility</b> Public
            </span>
            <input style={{ display: 'none' }} type='file' id='file' />
            <label htmlFor='file'>Upload Image</label>
            <div className='buttons'>
              <button>Save as a draft</button>
              <button>update</button>
            </div>
          </div>
          <div className='item'>
            <h2>Category</h2>
            <input type='radio' name='cat' value='art' id='art' />
            <label htmlFor='art'>Art</label>

            <input type='radio' name='cat' value='food' id='food' />
            <label htmlFor='food'>food</label>

            <input type='radio' name='cat' value='art' id='art' />
            <label htmlFor='art'>Art</label>

            <input type='radio' name='cat' value='art' id='art' />
            <label htmlFor='art'>Art</label>
          </div>
        </Stack>
      </Stack>
    </motion.div>
  );
}
