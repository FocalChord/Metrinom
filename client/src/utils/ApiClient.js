import CookieManager from "./CookieManager";

const METRINOME_BACKEND_URL = "http://localhost:3001";

const ApiClient = (endpoint, { body, ...customConfig } = {}) => {
    const token = CookieManager.getUserToken();
    const headers = { "content-type": "application/json" };
    if (token) {
        headers.Authorization = `${token}`;
    }
    const config = {
        method: body ? "POST" : "GET",
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const url = `${METRINOME_BACKEND_URL}/${endpoint}`;

    console.log(url);

    return window.fetch(`${METRINOME_BACKEND_URL}/${endpoint}`, config).then(async (res) => {
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            return Promise.reject(data);
        }
    });
};

export default ApiClient;
