import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import config from '../../utilities/config';
import { Category } from '../menu/OptionsMenu';
import { Stack, Typography, Button } from '@mui/material';
import Loader from '../loaders/Loader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DarkModeContext } from '../../contexts/DarkModeContext';

export default function Categories() {
  const { darkMode } = useContext(DarkModeContext);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    Record<string, boolean>
  >({});
  const [selectedSub1, setSelectedSub1] = useState<Record<string, boolean>>({});
  const [selectedSub2, setSelectedSub2] = useState<Record<string, boolean>>({});

  const [newCat, setNewCat] = useState('');
  const [newSubCat1, setNewSubCat1] = useState('');
  const [newSubCat2, setNewSubCat2] = useState('');

  const [catErr, setCatErr] = useState('');
  const [subCatErr, setSubCatErr] = useState('');

  const [subcategory1, setSubcategory1] = useState<Category | undefined>(
    undefined
  );
  const [subcategory2, setSubcategory2] = useState<Category | undefined>(
    undefined
  );

  useEffect(() => {
    const data: Category | undefined = subcategory1?.children?.find(
      (cat: any) => cat.name === Object.keys(selectedSub1)[0]
    );

    data ? setSubcategory2(data) : setSubcategory2(undefined);
  }, [selectedSub1, subcategory1?.children]);

  useEffect(() => {
    const data: Category | undefined = categories.find(
      (cat) => cat.name === Object.keys(selectedCategory)[0]
    );
    categories.length > 0 ? setSubcategory1(data) : setSubcategory1(undefined);
  }, [categories, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.APP_BASE_URL}/cats`);
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory({ [categoryName]: true });
    setSelectedSub1({});
    setSelectedSub2({});
  };
  const handleSub1Change = (categoryName: string) => {
    setSelectedSub1({ [categoryName]: true });
    setSelectedSub2({});
  };
  const handleSub2Change = (categoryName: string) => {
    setSelectedSub2({ [categoryName]: true });
  };

  const addCategory = async () => {
    if (!newCat) return;

    try {
      const response = await axios.post(`${config.APP_BASE_URL}/cats`, {
        name: newCat,
        parent_id: 0,
      });

      setCategories(response.data);
      setNewCat('');
    } catch (error) {
      console.log(error);
    }
  };

  const addSubCat1 = async () => {
    if (!newSubCat1) return;

    try {
      const response = await axios.post(`${config.APP_BASE_URL}/cats`, {
        name: newSubCat1,
        parent_id: subcategory1?.id,
      });

      setCategories(response.data);
      setNewSubCat1('');
    } catch (error) {
      console.log(error);
    }
  };

  const addSubCat2 = async () => {
    if (!newSubCat2) return;

    try {
      const response = await axios.post(`${config.APP_BASE_URL}/cats`, {
        name: newSubCat2,
        parent_id: subcategory2?.id,
      });

      setCategories(response.data);
      setNewSubCat2('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCat = async (id: number) => {
    const category = categories.find((cat) => cat.id === id);

    if (!category?.children.length) {
      const confirmed = window.confirm(
        'Tem certeza que deseja exlcuir essa Categroia?'
      );
      if (confirmed) {
        try {
          await axios.delete(`${config.APP_BASE_URL}/cats/${id}`);
          const newCategories = categories.filter(
            (category: any) => category.id !== id
          );
          setCategories(newCategories);
          setSelectedCategory({});
          setCatErr('');
          setSubCatErr('');
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setCatErr('Categoria possui subcategorias associadas.');
    }
  };

  const handleDeleteSubCat1 = async (id: number) => {
    const confirmed = window.confirm(
      'Tem certeza que deseja exlcuir essa Subcategroia?'
    );
    const subcat1 = subcategory1?.children.find((cat) => cat.id === id);

    if (!subcat1?.children.length) {
      if (confirmed) {
        try {
          await axios.delete(`${config.APP_BASE_URL}/cats/${id}`);
          const updatedChildren = subcategory1?.children?.filter(
            (child) => child.id !== id
          );

          if (subcategory1) {
            const updatedObject: Category = {
              ...subcategory1,
              children: updatedChildren || [],
            };

            setSubcategory1(updatedObject);
            setCatErr('');
            setSubCatErr('');
            setSelectedSub1({});
            setSelectedSub2({});
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setSubCatErr('Subcategoria possui subcategorias associadas.');
    }
  };

  const handleDeleteSubCat2 = async (id: number) => {
    const confirmed = window.confirm(
      'Tem certeza que deseja exlcuir essa Subsubcategroia?'
    );

    if (confirmed) {
      try {
        await axios.delete(`${config.APP_BASE_URL}/cats/${id}`);
        const updatedChildren = subcategory2?.children?.filter(
          (child) => child.id !== id
        );

        if (subcategory2) {
          const updatedObject: Category = {
            ...subcategory2,
            children: updatedChildren || [],
          };

          setSubcategory2(updatedObject);
          setCatErr('');
          setSubCatErr('');
          setSelectedSub2({});
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
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
              key={category.id}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              spacing={2}
            >
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <input
                  type='radio'
                  id={category.name}
                  style={{ cursor: 'pointer' }}
                  checked={selectedCategory[category.name]}
                  onChange={() => handleCategoryChange(category.name)}
                />
                <label htmlFor={category.name} style={{ cursor: 'pointer' }}>
                  {category.name}
                </label>
              </Stack>
              <IconButton
                aria-label='delete'
                size='small'
                onClick={() => handleDeleteCat(category.id)}
                sx={{ '&:hover': { background: 'tomato' } }}
              >
                <DeleteIcon fontSize='inherit' />
              </IconButton>
            </Stack>
          ))
        ) : (
          <Loader />
        )}
        <Typography sx={{ color: 'tomato', fontSize: '13px' }}>
          {catErr}
        </Typography>
        <input
          type='text'
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          placeholder='Adiconar Nova Categoria'
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
          color='secondary'
          onClick={addCategory}
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

      {Object.keys(selectedCategory).length !== 0 && (
        <Stack className='item' spacing={'2px'}>
          <Typography
            variant={'h5'}
            component={'h2'}
            fontWeight={'bold'}
            sx={{ mb: '.5rem' }}
          >
            Subcategoria
          </Typography>
          {subcategory1?.children ? (
            subcategory1?.children.map((sub1: any) => (
              <Stack
                key={sub1.id}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                spacing={2}
              >
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                  <input
                    type='radio'
                    id={sub1.name}
                    style={{ cursor: 'pointer' }}
                    checked={selectedSub1[sub1.name]}
                    onChange={() => handleSub1Change(sub1.name)}
                  />
                  <label htmlFor={sub1.name} style={{ cursor: 'pointer' }}>
                    {sub1.name}
                  </label>
                </Stack>
                <IconButton
                  aria-label='delete'
                  size='small'
                  onClick={() => handleDeleteSubCat1(sub1.id)}
                  sx={{ '&:hover': { background: 'tomato' } }}
                >
                  <DeleteIcon fontSize='inherit' />
                </IconButton>
              </Stack>
            ))
          ) : (
            <Loader />
          )}
          <Typography sx={{ color: 'tomato', fontSize: '13px' }}>
            {subCatErr}
          </Typography>
          <input
            type='text'
            placeholder='Adiconar Nova Subcategoria'
            value={newSubCat1}
            onChange={(e) => setNewSubCat1(e.target.value)}
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
            color='secondary'
            onClick={addSubCat1}
            sx={{
              borderRadius: '10px',
              textTransform: 'unset',
              color: darkMode ? '#fff' : '',
              borderColor: darkMode ? '#fff' : '',
            }}
          >
            Adicionar Subcategoria
          </Button>
        </Stack>
      )}

      {Object.keys(selectedSub1).length !== 0 && (
        <Stack className='item' spacing={'2px'}>
          <Typography
            variant={'h5'}
            component={'h2'}
            fontWeight={'bold'}
            sx={{ mb: '.5rem' }}
          >
            Subsubcategoria
          </Typography>
          {subcategory2?.children ? (
            subcategory2?.children.map((sub2: any) => (
              <Stack
                key={sub2.id}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                spacing={2}
              >
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                  <input
                    type='radio'
                    id={sub2.name}
                    style={{ cursor: 'pointer' }}
                    checked={selectedSub2[sub2.name]}
                    onChange={() => handleSub2Change(sub2.name)}
                  />
                  <label htmlFor={sub2.name} style={{ cursor: 'pointer' }}>
                    {sub2.name}
                  </label>
                </Stack>
                <IconButton
                  aria-label='delete'
                  size='small'
                  onClick={() => handleDeleteSubCat2(sub2.id)}
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
            placeholder='Adiconar Nova Subsubategoria'
            value={newSubCat2}
            onChange={(e) => setNewSubCat2(e.target.value)}
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
            color='secondary'
            onClick={addSubCat2}
            sx={{
              borderRadius: '10px',
              textTransform: 'unset',
              color: darkMode ? '#fff' : '',
              borderColor: darkMode ? '#fff' : '',
            }}
          >
            Adicionar Subsubategoria
          </Button>
        </Stack>
      )}
    </>
  );
}
