import CommentIcon from '@material-ui/icons/Comment';
import CommentAPI from '../../apis/CommentAPI';

export default {
    baseUrl: '/comments',
    icon: CommentIcon,
    titles: {
        list: 'Comments',
        create: 'Add a new comment',
        update: 'Update a comment'
    },
    calls: {
        list: CommentAPI.list,
        create: CommentAPI.create,
        update: CommentAPI.update,
        delete: CommentAPI.delete,
        read: CommentAPI.read
    },
    list: {
        displayedColumns: [
            {
                field: 'content',
                title: 'Content'
            }
        ],
        paginate: false
    },
    form: {
        blocks: []
    }
}
