import styles from './SkipLink.module.scss';

const skipLink = () => {
  return (
    <a className={`capital--first--letter ${styles['skip-link']}`} href="#main-content">
      skip to main content
    </a>
  );
};

export default skipLink;
