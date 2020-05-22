# Simple Admin Generator - Documentation - Using the Form component to create forms

If you don't want to use the back-office routes provided by Simple Admin Generator, you can still benefit from the form generation it offers by using the `Form` component.

First, create a light definition (you can still use options providers):
```javascript
// src/forms/TagFormDefinition.js
import { Input, Select } from '../components/FormComponents';
import API from '../api';

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
                component: Input,
                field: 'priority'
            },
            {
                component: Select,
                field: 'category',
                optionsProvider: 'category'
            }
        ]
    ],
    providers: {
        category: API.listCategories
    }
}
```

Then, invoke the Form component:
```javascript
// src/pages/MyPage.jsx

import { Form, definitionToDefaultValueHelper } from '@rememberfootball/simple-admin-generator';
import definition from '../forms/TagFormDefinition';

const MyPage = props => {
    const [data, setData] = useState(definitionToDefaultValueHelper(definition));

    const handleSave = data => { /* ... */ };

    return <div>
        <Form form={definition} data={data} onChange={setData} onSave={handleSave}  />
    </div>;   
}

export default MyPage;
```

As you can see, the Form component requires a definition, its data (the default value can be guessed from the definition using the `definitionToDefaultValueHelper`), and two handles (`onChange` and `onSave`). Pretty simple, eh?

## Next step

[Authentication](authentication.md)
