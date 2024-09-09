import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component, redirectTo = '/' }) => {
  const isLoggedin = useSelector(selectAuthIsLoggedIn);
  return isLoggedin ? component : <Navigate to={redirectTo} replace />;
};
