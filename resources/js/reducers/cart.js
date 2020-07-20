const initialstate = {
    items: {},
    count: 0,
    total: 0
};

const cartReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "UPDATE_CART":
            return (state = action.payload);
        case "GET_CART":
            return (state = action.payload);
        default:
            return state;
    }
};

export default cartReducer;
