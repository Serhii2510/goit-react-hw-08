import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';

import css from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();

  const onFilter = e => {
    const value = e.target.value;
    console.log(value);

    dispatch(changeFilter(value));
  };

  return (
    <div className={css.searchBox}>
      <p className={css.label}>Find contacts by name or phone number</p>
      <input
        className={css.input}
        type="text"
        placeholder="Search..."
        onChange={onFilter}
      />
    </div>
  );
};

export default SearchBox;
