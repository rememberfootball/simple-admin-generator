import Input from '../../components/Input';
import AddableSelect from '../../components/AddableSelect';
import CommentAPI from '../../apis/CommentAPI';
import CategoryAPI from '../../apis/CategoryAPI';

export default {
    blocks: [
        [
            {
                component: Input,
                field: 'name'
            }
        ],
        [
            {
                component: AddableSelect,
                field: 'goodComments',
                defaultValue: [],
                optionsProvider: 'comments'
            },
            {
                component: AddableSelect,
                field: 'badComments',
                defaultValue: [],
                optionsProvider: 'comments'
            }
        ],
        [
            {
                component: AddableSelect,
                field: 'category',
                defaultValue: null,
                optionsProvider: 'category'
            }
        ]
    ],
    providers: {
        comments: CommentAPI.list,
        category: CategoryAPI.list
    }
};
