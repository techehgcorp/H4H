// utils.js
import Cookies from 'js-cookie';

export const getPrefLangCookie = () => {
  return Cookies.get('googtrans') || 'en';
};
