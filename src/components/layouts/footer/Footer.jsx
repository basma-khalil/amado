import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Logo, MenuBtn } from '../../index';
import { FaRegHeart } from '../../../lib';

const Footer = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleFooterNav = () => {
    setOpenMenu(!openMenu);
  };

  const closeFooterNav = () => {
    setOpenMenu(false);
  };

  return (
    <footer className={styles['site-footer']}>
      <div className="container flex--row">
        <div className={styles['footer__text']}>
          <Link className={styles['footer__logo']} to="/">
            <Logo
              logoLight={false}
              logoWidth={137}
              logoHeight={55}
              loadingLazy={true}
            />
          </Link>

          <p className={styles.copywrite}>
            Copyright ©{new Date().getFullYear()} All rights reserved |&nbsp;
            This template is made with&nbsp;
            <FaRegHeart />
            &nbsp; by&nbsp;
            <a href="https://colorlib.com" target="_blank" rel="noreferrer">
              Colorlib
            </a>
            &nbsp; & Re-distributed by&nbsp;
            <a href="https://themewagon.com" target="_blank" rel="noreferrer">
              Themewagon
            </a>
          </p>
        </div>

        <div className={styles['footer__menu']}>
          <MenuBtn
            menuBtnClass={styles['nav-toggler']}
            menuBtnOnClick={() => toggleFooterNav()}
            menuBtnSize={25}
            menuBtnLabel={openMenu ? 'close menu' : 'open menu'}
            menuBtnControls={'footer-menu'}
            menuBtnState={openMenu}
          />

          <nav
            id="footer-menu"
            className={openMenu ? `${styles.open}` : ''}
            aria-live="polite"
          >
            <ul>
              <li>
                <NavLink to="/" onClick={closeFooterNav} end>
                  home
                </NavLink>
              </li>
              <li>
                <NavLink to="shop" onClick={closeFooterNav}>
                  shop
                </NavLink>
              </li>
              <li>
                <NavLink to="cart" onClick={closeFooterNav}>
                  cart
                </NavLink>
              </li>
              <li>
                <NavLink to="checkout" onClick={closeFooterNav}>
                  checkout
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
