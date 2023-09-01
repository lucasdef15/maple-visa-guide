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
  name: string;
  img: string;
  userImg: string;
  id: number;
  title: string;
  desc: string;
  date: number;
  edited: number;
  categoryID: number;
}

interface LoadedCats {
  cat: string | null;
  subcat: string | null;
  subsubcat: string | null;
}

export default function HeaderNav() {
  const location = useLocation();

  const [postData, setPostData] = useState<PostProps>({} as PostProps);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] =
    useState<LoadedCats | null>(null);

  const { isAdmin } = useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);

  const headerStyle = {
    background: darkMode ? '#222' : '#ecececdd',
    width: '100%',
    paddingInline: { xs: '1rem', lg: '0' },
    maxWidth: '1700px',
    '& .logo': {
      width: '115px',
    },
  };

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
    function findCategoryAndDescendants(id: number, categories: any) {
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
      setSelectedCategories(
        findCategoryAndDescendants(Number(postId), categories)
      );
    } else {
      setSelectedCategories(
        findCategoryAndDescendants(postData?.categoryID, categories)
      );
    }
  }, [categories, postData?.categoryID, postId]);

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
        selectedCategories?.subsubcat
          ? selectedCategories?.subsubcat
          : selectedCategories?.subcat
          ? selectedCategories?.subcat
          : selectedCategories?.cat
      }`;
  }

  return (
    <Stack
      component={'header'}
      sx={{
        width: '100%',
        paddingBlock: '1rem',
        paddingInline: '2rem',
        background: darkMode ? '#222' : '#ecececdd',
        boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.103)',
        display: { xs: 'none', sm: 'flex' },
      }}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Stack
        sx={headerStyle}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        useFlexGap
        spacing={3}
      >
        <Stack>
          <Typography
            component={'h2'}
            sx={{
              fontSize: '28px',
              fontweight: 'bold',
              color: darkMode ? '#fff' : '',
            }}
          >
            {breadcrumbs}
          </Typography>
          <Typography
            color={'text.secondary'}
            sx={{ fontSize: '15px', fontweight: 'light' }}
          >
            Explore nossas postagens mais recentes e mantenha-se atualizado!
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
                variant='contained'
                endIcon={<RiBookletFill />}
                sx={{
                  background: '#44b700',
                  py: '.5rem',
                  '&:hover': { background: 'limegreen' },
                  whiteSpace: 'nowrap',
                  color: '#fff',
                }}
              >
                New post
              </Button>
            </Link>
          )}
          <span className='logo'>
            <Logo color={darkMode ? '#fff' : '#222'} />
          </span>
        </Stack>
      </Stack>
    </Stack>
  );
}
