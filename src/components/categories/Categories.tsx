import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import config from '../../utilities/config';
import { Category } from '../menu/OptionsMenu';
import { Stack, Typography, Button } from '@mui/material';
import Loader from '../loaders/Loader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import { UserContext } from '../../contexts/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { PostProps } from '../../pages/PostPage';

interface LoadedCats {
  cat: string | null;
  subcat: string | null;
  subsubcat: string | null;
}

export default function Categories({ title, value, postData: data }: any) {
  const postData = data as PostProps;
  const navigate = useNavigate();

  const postId = useLocation().pathname.split('/')[4];

  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserContext);

  const [file, setFile] = useState<File | null>(null);

  const [loadingCat, setLoadingCat] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategories, setSelectedCategories] =
    useState<LoadedCats | null>(null);

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
      (cat: any) => cat.name === Object.keys(selectedSub1!)[0]
    );

    data ? setSubcategory2(data) : setSubcategory2(undefined);
  }, [selectedSub1, subcategory1?.children]);

  useEffect(() => {
    const data: Category | undefined = categories.find(
      (cat) => cat.name === Object.keys(selectedCategory!)[0]
    );
    categories.length > 0 ? setSubcategory1(data) : setSubcategory1(undefined);
  }, [categories, selectedCategory]);

  useEffect(() => {
    setLoadingCat(true);
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.APP_BASE_URL}/cats`);
        setCategories(response.data);
        setLoadingCat(false);
      } catch (error) {
        setLoadingCat(false);
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    function findCategoryAndDescendants(id: string, categories: any) {
      let result = null;

      categories.forEach((cat: any) => {
        if (cat.id === id) {
          result = {
            cat: cat.name,
            subcat: null,
            subsubcat: null,
          };
        } else {
          cat.children.forEach((subcat: any) => {
            if (subcat.id === id) {
              result = {
                cat: cat.name,
                subcat: subcat.name,
                subsubcat: null,
              };
            } else {
              subcat.children.forEach((subsubcat: any) => {
                if (subsubcat.id === id) {
                  result = {
                    cat: cat.name,
                    subcat: subcat.name,
                    subsubcat: subsubcat.name,
                  };
                }
              });
            }
          });
        }
      });
      return result;
    }
    if (postData !== null) {
      setSelectedCategories(
        findCategoryAndDescendants(postData.category.id, categories)
      );
    } else {
      setSelectedCategories(null);
    }
  }, [categories, postData, postData?.category?.id]);

  useEffect(() => {
    const catKey: string | undefined = selectedCategories?.cat as string;
    const subcatKey: string | undefined = selectedCategories?.subcat as string;
    const subsubcatKey: string | undefined =
      selectedCategories?.subsubcat as string;

    setSelectedCategory(catKey ? { [catKey]: true } : {});
    setSelectedSub1(subcatKey ? { [subcatKey]: true } : {});
    setSelectedSub2(subsubcatKey ? { [subsubcatKey]: true } : {});
  }, [
    selectedCategories?.cat,
    selectedCategories?.subcat,
    selectedCategories?.subsubcat,
  ]);

  useEffect(() => {
    setSelectedCategory({});
    setSelectedSub1({});
    setSelectedSub2({});
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
        parent_id: '0',
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

  const handleDeleteCat = async (id: string) => {
    const category = categories.find((cat) => {
      const catId: string = cat.id.toString();
      return catId === id;
    });

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
          setSelectedSub1({});
          setSelectedSub2({});
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

  const handleDeleteSubCat1 = async (id: string) => {
    const subcat1 = subcategory1?.children.find((cat) => {
      const catId: string = cat.id.toString();
      return catId === id;
    });

    if (!subcat1?.children.length) {
      const confirmed = window.confirm(
        'Tem certeza que deseja exlcuir essa Subcategroia?'
      );
      if (confirmed) {
        try {
          await axios.delete(`${config.APP_BASE_URL}/cats/${id}`);
          const updatedChildren = subcategory1?.children?.filter((child) => {
            const childId: string = child.id;
            return childId !== id;
          });

          if (subcategory1) {
            const updatedObject: Category = {
              ...subcategory1,
              children: updatedChildren || [],
            };

            if (categories) {
              const updatedCategories = categories.map((category) => {
                if (category.id === subcategory1.id) {
                  return updatedObject;
                }
                return category;
              });
              setCategories(updatedCategories);
            }

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

  const handleDeleteSubCat2 = async (id: string) => {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir essa Subsubcategoria?'
    );

    if (confirmed) {
      try {
        await axios.delete(`${config.APP_BASE_URL}/cats/${id}`);
        const updatedChildren = subcategory2?.children?.filter((child) => {
          const childId: string = child.id.toString();
          return childId !== id;
        });

        if (subcategory2) {
          const updatedObject: Category = {
            ...subcategory2,
            children: updatedChildren || [],
          };

          if (subcategory1) {
            const updatedSubcategory1: Category = {
              ...subcategory1,
              children: updatedObject ? [updatedObject] : [],
            };
            setSubcategory1(updatedSubcategory1);
          }

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const subcategory3 = subcategory2?.children.find(
      (cat) => cat.name === Object.keys(selectedSub2!)[0]
    );

    const postFormData = new FormData();
    postFormData.append(
      'img',
      postData
        ? file
          ? (file as Blob)
          : (postData.img as string)
        : (file as Blob)
    );
    postFormData.append('title', title);
    postFormData.append('desc', value);
    postFormData.append(
      'categoryID',
      subcategory3
        ? (subcategory3?.id.toString() as string)
        : (subcategory2?.toString() as string)
        ? (subcategory2?.id.toString() as string)
        : (subcategory1?.id.toString() as string)
    );
    postFormData.append('authorID', user?.data?.id.toString() as string);

    const configHeader = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    if (postData) {
      try {
        await axios.put(
          `${config.APP_BASE_URL}/posts/${postId}`,
          postFormData,
          configHeader
        );
        navigate('/membros/guias');
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post(
          `${config.APP_BASE_URL}/posts`,
          postFormData,
          configHeader
        );
        navigate('/membros/guias');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
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
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <label
          htmlFor='file'
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          Upload Image
        </label>
        <span style={{ color: 'teal' }}>
          {file?.name
            ? file?.name
            : postData
            ? 'Image Loaded From Database'
            : 'No file selected'}
        </span>
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
            {postData ? 'Editar' : 'Publicar'}
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
        {loadingCat ? (
          <Loader />
        ) : (
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
                  checked={selectedCategory![category.name]}
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

      {Object.keys(selectedCategory!).length !== 0 && (
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
                    checked={selectedSub1![sub1.name]}
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

      {Object.keys(selectedSub1!).length !== 0 && (
        <Stack className='item' spacing={'2px'}>
          <Typography
            variant={'h5'}
            component={'h2'}
            fontWeight={'bold'}
            sx={{ mb: '.5rem' }}
          >
            Subsubcategoria
          </Typography>
          {subcategory2?.children.map((sub2: any) => (
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
                  checked={selectedSub2![sub2.name]}
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
          ))}
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
