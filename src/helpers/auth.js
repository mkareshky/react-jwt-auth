import Cookies from 'js-cookie';

export const AUTH_KEY = "auth-token";
export const setToken = (token) => {
  Cookies.set(AUTH_KEY, token, { expires: 1 });
};
export const removeToken = () => {
  Cookies.remove(AUTH_KEY);
};
export const getToken = () => Cookies.get(AUTH_KEY);