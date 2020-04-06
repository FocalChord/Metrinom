import Cookies from "js-cookie";

const CookieManager = {
    setUserToken: (token) => {
        Cookies.set("token", token);
    },
    getUserToken: () => {
        return Cookies.get("token");
    },
    removeUserToken: () => {
        Cookies.remove("token");
    },
};

export default CookieManager;
