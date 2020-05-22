import DescriptionIcon from '@material-ui/icons/Description';
import ArticleAPI from '../../apis/ArticleAPI';
import ArticleFormDefinition from '../forms/ArticleFormDefinition';

export default {
    baseUrl: '/articles',
    icon: DescriptionIcon,
    roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'],
    titles: {
        list: 'Articles',
        create: 'Add a new article',
        update: 'Update "%article_name%"',
        vars: {
            '%article_name%': 'name'
        }
    },
    calls: {
        list: ArticleAPI.list,
        create: ArticleAPI.create,
        update: ArticleAPI.update,
        delete: ArticleAPI.del,
        read: ArticleAPI.read
    },
    list: {
        displayedColumns: [
            {
                field: 'name',
                title: 'Name'
            }
        ],
        filters: [
            {
                title: 'Name',
                filter: (item, value) => item.name.indexOf(value) !== -1
            }
        ],
        paginate: true,
        rowsPerPage: 20,
    },
    form: ArticleFormDefinition
}
