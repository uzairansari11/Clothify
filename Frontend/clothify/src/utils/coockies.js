import Cookies from "js-cookie";

export const cookiesSetter = (payload) => {
  Cookies.set("uzair_app_token", JSON.stringify(payload), { expires: 7 });
};

export const cookiesGetter = () => {
  if (Cookies.get("uzair_app_token")) {
    return JSON.parse(Cookies.get("uzair_app_token"));
  }
};

export const removeCookie = () => {
  Cookies.remove("uzair_app_token");
};
