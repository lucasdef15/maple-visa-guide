import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BiSolidRightArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface SubMenuState {
  [key: number]: boolean;
}

export default function Navigation({
  categories,
  openOptions,
  setOpenOptions,
}: any) {
  const [showSubMenu, setShowSubMenu] = useState<SubMenuState>({});

  useEffect(() => {
    if (!openOptions) {
      setShowSubMenu({});
    }
  }, [openOptions]);

  const variants = {
    open: { opacity: 1, x: '0', padding: '.3rem 1rem .7rem 1rem' },
    closed: { opacity: 0, y: '-100%', display: 'none' },
  };

  const variants2 = {
    open: { opacity: 1, x: '0' },
    closed: { opacity: 0, y: '-100%', display: 'none' },
  };

  const subMenuWhileTapHandler = (subMenuId: number) => {
    setShowSubMenu((prev) => {
      return { ...prev, [subMenuId]: !prev[subMenuId] };
    });
  };

  return (
    <motion.nav>
      <motion.ul className='main-nav'>
        {categories.map((el: any) => {
          return (
            <motion.li key={el.id}>
              <motion.div
                className='parent_root'
                style={{
                  color: showSubMenu[el.id] ? '#0080e8' : '',
                  borderBottom: showSubMenu[el.id] ? 'none' : '',
                }}
                onClick={() => subMenuWhileTapHandler(el.id)}
              >
                {el.children.length ? (
                  <>
                    <motion.span style={{ fontWeight: 'bold' }}>
                      {el.name}
                    </motion.span>
                    <motion.span
                      animate={{
                        rotate: showSubMenu[el.id] ? '-90deg' : '90deg',
                      }}
                    >
                      {el.children.length ? <BiSolidRightArrow /> : ''}
                    </motion.span>
                  </>
                ) : (
                  <Link
                    style={{ width: '100%' }}
                    onClick={() => setOpenOptions(false)}
                    to={`/membros/guias?categoryID=${el.id}`}
                  >
                    <motion.span>{el.name}</motion.span>
                    <motion.span
                      animate={{
                        rotate: showSubMenu[el.id] ? '-90deg' : '90deg',
                      }}
                    >
                      {el.children.length ? <BiSolidRightArrow /> : ''}
                    </motion.span>
                  </Link>
                )}
              </motion.div>

              <motion.ul
                variants={variants}
                animate={
                  showSubMenu[el.id]
                    ? el.children.length
                      ? 'open'
                      : 'closed'
                    : 'closed'
                }
                className='sub-menu-ul'
              >
                {showSubMenu[el.id] &&
                  el.children.map((ele: any) => {
                    return (
                      <motion.li
                        onClick={() => subMenuWhileTapHandler(ele.id)}
                        key={ele.id}
                      >
                        <motion.div
                          className='sub-menu-ul-options'
                          style={{
                            color: showSubMenu[ele.id] ? '#0080e8' : '',
                            borderBottom: showSubMenu[ele.id] ? '#f7f9fb' : '',
                            borderRadius: showSubMenu[ele.id]
                              ? '5px 5px 0 0'
                              : '5px',
                          }}
                        >
                          {ele.children.length ? (
                            <>
                              <motion.span>{ele.name}</motion.span>
                              <motion.span
                                animate={{
                                  rotate: showSubMenu[ele.id]
                                    ? '-90deg'
                                    : '90deg',
                                }}
                              >
                                {ele.children.length ? (
                                  <BiSolidRightArrow />
                                ) : (
                                  ''
                                )}
                              </motion.span>
                            </>
                          ) : (
                            <Link
                              style={{ width: '100%' }}
                              onClick={() => setOpenOptions(false)}
                              to={`/membros/guias?categoryID=${ele.id}`}
                            >
                              <motion.span>{ele.name}</motion.span>
                              <motion.span
                                animate={{
                                  rotate: showSubMenu[ele.id]
                                    ? '-90deg'
                                    : '90deg',
                                }}
                              >
                                {ele.children.length ? (
                                  <BiSolidRightArrow />
                                ) : (
                                  ''
                                )}
                              </motion.span>
                            </Link>
                          )}
                        </motion.div>

                        <motion.ul
                          variants={variants2}
                          animate={
                            showSubMenu[ele.id]
                              ? ele.children.length
                                ? 'open'
                                : 'closed'
                              : 'closed'
                          }
                          className='subsub-menu-ul'
                        >
                          {showSubMenu[ele.id] &&
                            ele.children.map((elem: any) => {
                              return (
                                <motion.li key={elem.id}>
                                  <Link
                                    className='subsub-menu-ul-options'
                                    onClick={() => setOpenOptions(false)}
                                    to={`/membros/guias?categoryID=${elem.id}`}
                                  >
                                    <motion.span>{elem.name}</motion.span>
                                  </Link>
                                </motion.li>
                              );
                            })}
                        </motion.ul>
                      </motion.li>
                    );
                  })}
              </motion.ul>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.nav>
  );
}
