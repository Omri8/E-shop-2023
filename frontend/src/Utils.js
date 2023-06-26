import { ADD_TO_CART, GET_FAIL, axios, useLocation } from './Imports';

export const getError = (error) => {
    return (
        error.message && error.response.data.message ?
            error.response.data.message : error.response
    );
};

export const addToCartHandler = async (product, cartItems, ctxDispatch) => {
    
    const existedItem = cartItems.find((x) => x._id === product._id);
    const quantity = existedItem ? existedItem.quantity + 1 : 1;

    try {
        const { data } = await axios.get(`/api/v1/products/${product._id}`);

        if (data.countInStock < quantity) {
            window.alert('Sorry, Product is out of stock');
            return;
        }

        ctxDispatch({ type: ADD_TO_CART, payload: { ...product, quantity } });

    } catch (err) {
        ctxDispatch({ type: GET_FAIL, payload: err.message });
    }
}

export const getFilterUrl = (searchFromURI, filter, skipPathname) => {

    const searchParams = new URLSearchParams(searchFromURI);
    const category = searchParams.get('category') || 'all';
    const query = searchParams.get('query') || 'all';
    const price = searchParams.get('price') || 'all';
    const rating = searchParams.get('rating') || 'all';
    const order = searchParams.get('order') || 'newest';
    const page = searchParams.get('page') || 1;

    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    const link = `${skipPathname ? '' : '/search?'}category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
    return link;
};
