import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burgerbuilder-14d6b.firebaseio.com'
});

export default instance;
