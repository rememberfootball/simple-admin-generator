# Simple Admin Generator - Documentation - Creating form definitions

## Table of contents
  - [Definitions exporter](#definitions-exporter)
  - [Basic definition skeleton](#basic-definition-skeleton)
    - [Base URL](#base-url)
    - [Titles](#titles)
    - [Calls](#calls)
    - [List](#list)
    - [Form](#form)
    - [Sum up](#sum-up)
  - [Digging deeper](#digging-deeper)
    - [Root config](#root-config)
      - [Adding an icon to the home page link to this form](#adding-an-icon-to-the-home-page-link-to-this-form)
      - [Restricting access to the form to users with a given role](#restricting-access-to-the-form-to-users-with-a-given-role)
    - [Titles](#titles-1)
      - [Customizing the update page title](#customizing-the-update-page-title)
    - [List page](#list-page)
      - [Adding filters to the list page](#adding-filters-to-the-list-page)
      - [Paginating the list page](#paginating-the-list-page)
    - [Forms](#forms)
      - [Blocks](#blocks)
        - [Specifying component props](#specifying-component-props)
        - [Specifying component's default value](#specifying-components-default-value)
      - [Fetching extra data for components](#fetching-extra-data-for-components)
  - [Full reference](#full-reference)
  - [Next step](#next-step)

## Definitions exporter

Before everything, create the directory in which will be hosted all your form definitions, and a simple file that will export all of them.

```bash
mkdir src/forms && touch src/forms/definitions.js
```

After you've created a few form definitions this file should look like this:
```javascript
// src/forms/definitions.js

import ArticleFormDefinition from './ArticleFormDefinition';
import CategoryFormDefinition from './CategoryFormDefinition';
import TagFormDefinition from './TagFormDefinition';

export default [ // export these in their appearance order on home page
    ArticleFormDefinition,
    CategoryFormDefinition,
    TagFormDefinition
]
```

## Basic definition skeleton

A form definition is a Javascript object, basically. Let's build a simple one together:

### Base URL

```javascript
// src/forms/TagFormDefinition.js
export default {
    baseUrl: '/tags'
}
```

`baseUrl` is the base route our forms will be created at. `{baseUrl}/` will be used for the list, `{baseUrl}/new` for the creation page, and `{baseUrl}/{id}` for the edition.

### Titles

Then, define the titles your pages will have
```javascript
// src/forms/TagFormDefinition.js
export default {
    ...,
    titles: {
        list: 'List of tags',
        create: 'Add a new tag',
        update: 'Update a tag'
    }
} 
```

### Calls

Then, define the functions that will allow the admin generator to retrieve the list of resources, and read, update, create or delete a resource
```javascript
import API from '../api'

export default {
    ...,
    calls: {
        list: API.list,
        create: API.create,
        update: API.edit,
        delete: API.remove,
        read: API.read
    }
}
```

Read will be called with an id, and must return a Javascript object
Remove will be called with an id
List will be called without argument and must return an array of objects with an `id` property each
Create and update will be called with an object, and must return it, just as read would do

### List

Then, add some information for the list page only
```javascript
import API from '../api'

export default {
    ...,
    list: {
        displayedColumns: [
            {
                field: 'name',
                title: 'Name'
            }
        ]
    }
}
```

Here, you can specify which columns will be displayed, and to which fields they correspond. If the field is nested, retrieve it by separating the properties with dots (ex: `category.name`)

### Form

And, finally, here we go. The form definition. 
```javascript
import API from '../api'
import Input from '../components/Input'

export default {
    ...,
    form: {
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
                }
            ]
        ]
    }
}
```

A sub property blocks, which holds an array of arrays containing components definitions. The component definition consists in specifying the component and the field it refers to. **All components must accept `value` and `onChange` props, and the `onChange` prop must be fed with the new value, and nothing else.**

Why an array of arrays? Because the first-level one represents the different rows, and the second-level one the different cells of your form.
Please note that on mobile display, components belonging to the same row won't be aligned.

### Sum up

Here is the final definition:
```javascript
import API from '../api'
import Input from '../components/Input'

export default {
    titles: {
        list: 'List of tags',
        create: 'Add a new tag',
        update: 'Update a tag'
    },
    calls: {
        list: API.list,
        create: API.create,
        update: API.edit,
        delete: API.remove,
        read: API.read
    },
    list: {
        displayedColumns: [
            {
                field: 'name',
                title: 'Name'
            }
        ]
    },
    form: {
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
                }
            ]
        ]
    }
}
``` 


## Digging deeper

### Root config

#### Adding an icon to the home page link to this form

```javascript
export default {
    ...,
    icon: IconComponent
}
```

#### Restricting access to the form to users with a given role

```javascript
export default {
    ...,
    roles: ['admin'],
}
```

### Titles

#### Customizing the update page title

```javascript
export default {
    ...,
    titles: {
        ...,
        update: 'Update tag %tag_name%',
        vars: {
            '%tag_name%': 'name'
        }
    }
}
```

If the field is nested, separate the path with dots.

### List page

#### Adding filters to the list page

```javascript
import { get } from 'lodash';

export default {
    ...,
    list: {
        ...,
        filters: [
            {
                title: 'Name',
                filter: (item, val) => get(item, 'name').indexOf(val) !== -1
            }
        ]
    }
}
```

#### Paginating the list page

```javascript
export default {
    ...,
    list: {
        ...,
        paginate: true,
        rowsPerPage: 20,
    }
}
```

#### Overriding the list component

```javascript
export default {
    ...,
    list: {
        ...,
        component: MyListComponent
    }
}
```

### Forms

#### Blocks

##### Specifying component props

```javascript
export default {
    ...,
    form: {
        blocks: [
            [
                {
                    ...,
                    props: {
                        label: 'Tag name'
                    },
                    externalObjectProps: {
                        placeholderPicture: 'picture.displayPath'
                    }
                }       
            ]
        ]
    }
}
```

`externalObjectProps` are additional props that are based on a given property of the resource. If the given field is nested, separate the path with dots.

##### Specifying component's default value

```javascript
export default {
    ...,
    form: {
        blocks: [
            [
                {
                    ...,
                    defaultValue: new Date()
                }       
            ]
        ]
    }
}
```

#### Fetching extra data for components

Some components need extra data to be fetched before it can work (like selects, for instance). You can configure data providers in order to achieve this.

```javascript
import API from './api';

export default {
    ...,
    form: {
        providers: {
            category: API.listCategories
        }
    }
}
```

Then, in your form component definition, add the `optionsProvider` option by specifying the property you used for the provider's definition.

```javascript
export default {
    ...,
    form: {
        blocks: [
            [
                {
                    ...,
                    optionsProvider: 'category'
                }       
            ]
        ]
    }
}
```

#### Refreshing component extra data

A component can ask at some point for its extra data to be refreshed (for instance, if a new option has been added). It can trigger the `onRequireRefresh` for this, and its definition must have the `refreshable` property set to `true`.

```javascript
export default {
    ...,
    form: {
        blocks: [
            [
                {
                    ...,
                    optionsProvider: 'category',
                    refreshable: true
                }
            ]
        ]
    }
}
```

## Full reference

[Form definitions reference](reference.md)

## Next step

[Using routes vs using router](routes-or-router.md)
