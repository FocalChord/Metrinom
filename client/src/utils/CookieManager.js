import Cookies from "js-cookie";

const CookieManager = {
    setUserToken: (token) => {
        Cookies.set("metrinom_token", token);
    },
    getUserToken: () => {
        return Cookies.get("metrinom_token");
    },
    removeUserToken: () => {
        Cookies.remove("metrinom_token");
    },
    setUserName: (name) => {
        Cookies.set("name", name);
    },
    getUserName: () => {
        return Cookies.get("name");
    },
    removeUserName: () => {
        return Cookies.remove("name");
    },
};

export default CookieManager;
