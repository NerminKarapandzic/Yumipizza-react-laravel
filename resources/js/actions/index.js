export const getCart = items => {
    return {
        type: "GET_CART",
        payload: items
    };
};

export const updateCart = items => {
    return {
        type: "UPDATE_CART",
        payload: items
    };
};

export const setSnackbar = payload => {
    return {
        type: "SET_SNACKBAR",
        payload: payload
    };
};

export const closeSnackbar = () => {
    return {
        type: "CLOSE_SNACKBAR"
    };
};

export const changeCurrency = currency => {
    return {
        type: "CHANGE_CURRENCY",
        currency: currency
    };
};
