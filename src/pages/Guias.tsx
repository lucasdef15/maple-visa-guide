import { AnimatePresence, motion } from 'framer-motion';
import { routesVariants } from '../animations/animations';
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Stack } from '@mui/material';
import ArticlesCard from '../components/cards/ArticlesCard';
import Loader from '../components/loaders/Loader';
import { useLocation } from 'react-router-dom';
import config from '../utilities/config';
import PostsContext from '../contexts/PostsContext';
import ListPostCard from '../components/cards/ListPostCard';
import MainContext from '../contexts/MainContext';
import { DarkModeContext } from '../contexts/DarkModeContext';
import HeaderSearchBar from '../components/header/MenbersNav/LayoutHeader/HeaderSearchBar';

export default function Members() {
  const cat = useLocation().search;

  const { posts, setPost, loading, setLoading, fetchpost, query } =
    useContext(PostsContext);

  const { isList, isBlock, openMenu } = useContext(MainContext);
  const { darkMode } = useContext(DarkModeContext);

  const filteredItems = posts.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Tem certeza que deseja exlcuir essa Post?'
    );
    if (confirmed) {
      try {
        await axios.delete(`${config.APP_BASE_URL}/posts/${id}`);
        setPost(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchInit = async () => {
      setLoading(true);
      await fetchpost(cat);
    };
    fetchInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat]);

  const ArticleStyles = {
    minHeight: 'calc(100vh -130px)',
    marginBlock: { xs: '180px', sm: openMenu ? '170px' : '100px', lg: '50px' },
    width: '100%',
    zIndex: -1,
    position: 'relative',
    maxWidth: '1700px',
  };

  return (
    <>
      <HeaderSearchBar />
      <motion.div
        className='guiasWrapper'
        variants={routesVariants}
        initial='initial'
        animate='visible'
        exit='exit'
        style={{
          height: '100%',
          width: '100%',
          zIndex: '-1',
          isolation: 'isolate',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          paddingInline: '2rem',
        }}
      >
        <Stack
          sx={ArticleStyles}
          direction='row'
          justifyContent='center'
          flexWrap='wrap'
          useFlexGap
          spacing={4}
        >
          <AnimatePresence>
            {loading ? (
              <Loader />
            ) : filteredItems.length ? (
              filteredItems.map((post) => (
                <React.Fragment key={post.id}>
                  {isList && (
                    <ListPostCard
                      id={post.id}
                      title={post.title}
                      img={post.img}
                      desc={post.desc}
                      handleDelete={handleDelete}
                    />
                  )}
                  {isBlock && (
                    <ArticlesCard
                      id={post.id}
                      title={post.title}
                      img={post.img}
                      desc={post.desc}
                      handleDelete={handleDelete}
                    />
                  )}
                </React.Fragment>
              ))
            ) : (
              <Stack
                direction='column'
                justifyContent='center'
                alignItems='center'
                flexWrap='wrap'
                sx={{ color: darkMode ? '#fff' : '' }}
              >
                <p>Nenhuma Publicação Encontrada</p>
              </Stack>
            )}
          </AnimatePresence>
        </Stack>
      </motion.div>
    </>
  );
}
