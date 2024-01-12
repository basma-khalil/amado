import { useRouteError } from 'react-router-dom';
import { MainContentContainer } from '../../components';
import styles from './Error.module.scss';

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <MainContentContainer>
      <div className={`flex--col ${styles['error-page']}`}>
        <h2 className="capitalize">oops!</h2>
        <p>
          Sorry, an unexpected error has occurred. Please try again or go to
          another page.
        </p>
        <p>
          <strong>
            {error.status && error.status + ' - '}{error.statusText || error.message}
          </strong>
        </p>
      </div>
    </MainContentContainer>
  );
};

export default Error;
