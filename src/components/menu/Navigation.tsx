import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BiSolidRightArrow } from 'react-icons/bi';

interface SubMenuState {
  [key: number]: boolean;
}

export default function Navigation({ navLinksData, openOptions }: any) {
  const [showSubMenu, setShowSubMenu] = useState<SubMenuState>({});

  useEffect(() => {
    if (!openOptions) {
      const updatedSubMenuState: SubMenuState = {};
      for (const key in showSubMenu) {
        updatedSubMenuState[key] = false;
      }
      setShowSubMenu(updatedSubMenuState);
    }
  }, [openOptions, showSubMenu]);

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
        {navLinksData.map((el: any) => {
          return (
            <motion.li key={el.id} className='header-nav-options options-hover'>
              <motion.div
                className='parent_root'
                onClick={() => subMenuWhileTapHandler(el.id)}
              >
                <motion.span>{el.name}</motion.span>
                <motion.span
                  animate={{
                    rotate: showSubMenu[el.id] ? '-90deg' : '90deg',
                  }}
                >
                  {el.children.length ? <BiSolidRightArrow /> : ''}
                </motion.span>
              </motion.div>
              <motion.ul
                variants={variants}
                animate={showSubMenu[el.id] ? 'open' : 'closed'}
                className='sub-menu-ul'
              >
                {showSubMenu[el.id] &&
                  el.children.map((ele: any) => {
                    return (
                      <motion.li
                        onClick={() => subMenuWhileTapHandler(ele.id)}
                        key={ele.id}
                        className='sub-menu-options sub-menu-hover'
                      >
                        <motion.div className='parent_root'>
                          <motion.span>{ele.name}</motion.span>
                          <motion.span
                            animate={{
                              rotate: showSubMenu[ele.id] ? '-90deg' : '90deg',
                            }}
                          >
                            {ele.children.length ? <BiSolidRightArrow /> : ''}
                          </motion.span>
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
                                  <motion.div className='parent_root'>
                                    <motion.span>{elem.name}</motion.span>
                                  </motion.div>
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
