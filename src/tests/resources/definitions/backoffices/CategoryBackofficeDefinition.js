import DescriptionIcon from '@material-ui/icons/Description';
import Input from '../../components/Input';

export default {
    baseUrl: '/categories',
    icon: DescriptionIcon,
    roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'],
    form: {
        blocks: [
            [
                {
                    component: Input,
                    field: 'name',
                    props: {
                        label: 'Name'
                    },
                    roles: ['ROLE_SUPER_ADMIN']
                },
                {
                    component: Input,
                    field: 'priority',
                    props: {
                        label: 'Priority'
                    }
                }
            ],
            [
                {
                    component: Input,
                    field: 'name',
                    props: {
                        label: 'Name'
                    },
                    roles: ['ROLE_SUPER_ADMIN']
                }
            ]
        ]
    }
}
