import API from './API';

const defaultCollection = [
    {
        id: 1,
        label: 'News'
    },
    {
        id: 2,
        label: 'Sports'
    }
];

export default API(defaultCollection);
