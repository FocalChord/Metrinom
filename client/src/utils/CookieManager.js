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
};

export default CookieManager;
