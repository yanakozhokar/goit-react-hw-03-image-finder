import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loadingIconContainer}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="50"
        visible={true}
      />
    </div>
  );
};

export default Loader;
