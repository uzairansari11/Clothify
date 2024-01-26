import Cookies from 'js-cookie';

export const cookiesSetter = (payload, key) => {
  Cookies.set(key, JSON.stringify(payload), { expires: 7 });
};

export const cookiesGetter = (key) => {
  if (Cookies.get(key)) {
    return JSON.parse(Cookies.get(key));
  }
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};
