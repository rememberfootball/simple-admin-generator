import API from './API';

const defaultCollection = [
    {
        id: 1,
        name: 'Champions League: Rennes finally qualified',
        content: 'Thanks to its third position in French Ligue 1, Rennes will compete for the first time in the most prestigious football competition in the world',
        category: 2
    },
    {
        id: 2,
        name: 'Ligue 2: Final challenge for Ntep?',
        content: 'The former genius joins Guingamp, for what looks like a last chance of finally relaunching his career.',
        category: 2
    }
];

export default API(defaultCollection);
