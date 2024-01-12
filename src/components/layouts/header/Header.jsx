import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../sidebar/sidebarSlice';
import styles from './Header.module.scss';
import { Logo, MenuBtn } from '../../index';

const Header = () => {
  const openMenu = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <header className={styles['site-header']}>
      <div className="container flex--row">
        <h2 className={styles['mobile-logo']}>
          <Link to="/">
            <Logo
              logoLight={true}
              logoWidth={70}
              logoHeight={28}
              loadingLazy={false}
            />
          </Link>
        </h2>

        <MenuBtn
          menuBtnClass={styles['nav-toggler']}
          menuBtnOnClick={handleToggleSidebar}
          menuBtnSize={34}
          menuBtnLabel={openMenu ? 'close menu' : 'open menu'}
          menuBtnControls={'site-sidebar'}
          menuBtnState={openMenu}
        />
      </div>
    </header>
  );
};

export default Header;
