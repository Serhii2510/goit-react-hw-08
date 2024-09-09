import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors';
import { apiLogout } from '../../redux/auth/operations';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const onLogout = () => {
    dispatch(apiLogout());
  };

  return (
    <div className={css.userBlock}>
      <p className={css.userName}>Welcome, {user.name}</p>
      <button className={css.btn} type="button" onClick={onLogout}>
        Log Out
      </button>
    </div>
  );
};
