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
    open: { opacity: 1, x: '0' },
    closed: { opacity: 0, y: '-100%' },
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
            <motion.li key={el.id} className='header-nav-options options-hover'>
              <motion.div
                className='parent_root'
                style={{
                  background: showSubMenu[el.id] ? '#0000001a' : '',
                  border: showSubMenu[el.id] ? '1px solid #2020202f' : '',
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
                animate={showSubMenu[el.id] ? 'open' : 'closed'}
                className='sub-menu-ul position'
              >
                {showSubMenu[el.id] &&
                  el.children.map((ele: any) => {
                    return (
                      <motion.li
                        onClick={() => subMenuWhileTapHandler(ele.id)}
                        key={ele.id}
                        className='sub-menu-options sub-menu-hover'
                      >
                        <motion.div
                          className='parent_root'
                          style={{
                            background: showSubMenu[ele.id] ? '#0000001a' : '',
                            border: showSubMenu[ele.id]
                              ? '1px solid #2020202f'
                              : '',
                          }}
                        >
                          {ele.children.length ? (
                            <>
                              <motion.span style={{ fontWeight: 'bold' }}>
                                {ele.name}
                              </motion.span>
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
                          variants={variants}
                          animate={showSubMenu[ele.id] ? 'open' : 'closed'}
                          className='sub-menu-ul position'
                        >
                          {showSubMenu[ele.id] &&
                            ele.children.map((elem: any) => {
                              return (
                                <motion.li
                                  key={elem.id}
                                  className='sub-menu-options sub-menu-hover'
                                >
                                  <Link
                                    className='parent_root'
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
