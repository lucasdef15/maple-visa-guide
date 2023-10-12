import { Stack, Typography, Button } from '@mui/material';
import { RiBookletFill } from 'react-icons/ri';
import Logo from '../../../logo/Logo';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DarkModeContext } from '../../../../contexts/DarkModeContext';
import config from '../../../../utilities/config';
import { Category } from '../../../menu/OptionsMenu';

export interface PostProps {
  author: {
    img: string;
    name: string;
  };
  category: {
    id: string;
    parentId: string;
    category: string;
  };
  createdAt: string;
  desc: string;
  id: number;
  img: string;
  title: string;
  updatedAt: string;
}

interface LoadedCats {
  cat: string | null;
  subcat: string | null;
  subsubcat: string | null;
}

export default function HeaderNav({ open }: any) {
  const location = useLocation();

  const [postData, setPostData] = useState<PostProps>({} as PostProps);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] =
    useState<LoadedCats | null>(null);

  const { isAdmin } = useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);

  const fullUrl = window.location.href;
  const parsedUrl = new URL(fullUrl);
  const params = new URLSearchParams(parsedUrl.search);
  const postId = params.get('categoryID');

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

  useEffect(() => {
    if (!isNaN(parseInt(location.pathname.split('/')[3]))) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(
            `${config.APP_BASE_URL}/posts/${parseInt(
              location.pathname.split('/')[3]
            )}`
          );
          setPostData(response.data[0]);
        } catch (error) {
          console.log(error);
        }
      };
      fetchPost();
    }
  }, [location.pathname]);

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
    if (postId) {
      setSelectedCategories(findCategoryAndDescendants(postId, categories));
    } else {
      setSelectedCategories(
        findCategoryAndDescendants(postData?.category?.id, categories)
      );
    }
  }, [categories, postData?.category?.id, postId]);

  let breadcrumbs = '';

  if (location.pathname.includes('guias')) {
    if (location.pathname.includes('write')) breadcrumbs = 'Guias / Write';
    if (location.pathname.includes('edit')) breadcrumbs = 'Guias / Edit';
    if (
      fullUrl.includes('/membros/guias') &&
      !fullUrl.includes('guias?categoryID=') &&
      location.pathname.split('/').length === 3
    )
      breadcrumbs = 'Guias / Todos';

    if (postId || !isNaN(parseInt(location.pathname.split('/')[3])))
      breadcrumbs = `Guias / ${
        selectedCategories?.subsubcat ?? ''
          ? selectedCategories?.subsubcat ?? ''
          : selectedCategories?.subcat ?? ''
          ? selectedCategories?.subcat ?? ''
          : selectedCategories?.cat ?? ''
      }`;
  }

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{ width: '100%' }}
      useFlexGap
      spacing={3}
    >
      <Stack>
        <Typography
          component={'h2'}
          sx={{
            fontSize: '25px',
            fontweight: '600',
            color: darkMode ? '#fff' : '',
            px: open ? 0 : 1,
          }}
        >
          {breadcrumbs}
        </Typography>
      </Stack>
      <Stack
        direction={'row'}
        spacing={{ xs: 2, md: 3.5 }}
        alignSelf={'end'}
        alignItems={'center'}
      >
        {isAdmin && (
          <Link to={'guias/write'}>
            <Button
              size='small'
              variant='contained'
              endIcon={<RiBookletFill />}
              sx={{
                background: (theme) =>
                  theme.palette.mode === 'dark' ? '#222f3e' : '#ff0000ca',
                p: '.3rem .7rem',
                '&:hover': {
                  background: (theme) =>
                    theme.palette.mode === 'dark' ? '#4b688a' : '#ff0000',
                },
                whiteSpace: 'nowrap',
                textTransform: 'unset',
                color: '#fff',
                fontSize: '.9rem',
              }}
            >
              New Post
            </Button>
          </Link>
        )}
        <Stack sx={{ '& svg': { width: '115px' } }}>
          <Logo color={'#fff'} />
        </Stack>
      </Stack>
    </Stack>
  );
}
