import CategoryAPI from '../../apis/CategoryAPI';
import AddableSelect from '../../components/AddableSelect';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';

export default {
    blocks: [
        [
            {
                component: Input,
                field: 'name',
                props: {
                    label: 'Name'
                }
            },
            {
                component: TextArea,
                field: 'content',
                props: {
                    label: 'Content'
                },
                defaultValue: 'This is the default content'
            }
        ],
        [
            {
                component: AddableSelect,
                field: 'category',
                optionsProvider: 'category',
                props: {
                    onAdd: CategoryAPI.create
                },
                externalObjectProps: {
                    label: 'name'
                },
                refreshable: true
            }
        ]
    ],
    providers: {
        category: CategoryAPI.list
    }
};
