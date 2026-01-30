type DOMAIN_TYPE = "development" | "production";

const BASE_URL = "https://www.saucedemo.com";

export const handleTestUrl = (type: DOMAIN_TYPE) => {
    switch (type) {
        case "development":
        case "production":
            return BASE_URL;

        default:
            break;
    }
};

export const TEST_URL = handleTestUrl(
    (process.env.TEST_ENV as DOMAIN_TYPE) || "development"
);

export const URL_ROUTES = {
    LOGIN: BASE_URL + "/",
    INVENTORY: BASE_URL + "/inventory.html",
    CART: BASE_URL + "/cart.html",
    CHECKOUT: BASE_URL + "/checkout-step-two.html",
    CHECKOUT_COMPLETE: BASE_URL + "/checkout-complete.html"
};