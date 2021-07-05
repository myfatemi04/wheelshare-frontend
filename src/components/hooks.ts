import { useContext } from 'react';
import AuthenticationContext from './Authentication/AuthenticationContext';

export const useAuth = () => useContext(AuthenticationContext);
export const useMe = () => useAuth().user;
