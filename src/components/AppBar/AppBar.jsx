import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../../redux/auth/selectors';
import { Navigation } from '../Navigation/Navigation';
import { UserMenu } from '../UserMenu/UserMenu';
import { AuthNav } from '../AuthNav/AuthNav';
import css from './AppBar.module.css';

export const AppBar = () => {
  const isLoggedin = useSelector(selectAuthIsLoggedIn);

  return (
    <header className={css.header}>
      <Navigation />
      {isLoggedin ? <UserMenu /> : <AuthNav />}
    </header>
  );
};
