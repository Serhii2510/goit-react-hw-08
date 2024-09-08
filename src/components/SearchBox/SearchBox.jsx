import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice';

import css from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();

  const onFilter = e => {
    const value = e.target.value;
    dispatch(changeFilter(value));
  };

  return (
    <div className={css.searchBox}>
      <p className={css.label}>Find contacts by name</p>
      <input className={css.input} type="text" onChange={onFilter} />
    </div>
  );
};

export default SearchBox;
