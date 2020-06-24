# Simple Admin Generator - Documentation - Form definitions reference

## FormDefinition

| Property | Type               | Required | Default value | Purpose                                                                                 |
|----------|--------------------|----------|---------------|-----------------------------------------------------------------------------------------|
| baseUrl  | String             | Yes      |               | Base URL of the routes for this form                                                    |
| titles   | [Titles](#titles)  | Yes      |               | Titles of pages                                                                         |
| calls    | [Calls](#calls)    | Yes      |               | Methods to call to perform form actions                                                 |
| list     | [List](#list)      | Yes      |               | Specfic settings of list page                                                           |
| form     | [Form](#form)      | Yes      |               | The form definition                                                                     |
| icon     | React Component    | No       | undefined     | Icon for home page link to the list page of this form                                   |
| roles    | Array<String>      | No       | undefined     | If auth required for the backoffice, which user roles will have access to this resource |

## Titles

| Property | Type                             | Required |  Purpose                                                                                                                                                          |
|----------|----------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| list     | String                           | Yes      | List page title                                                                                                                                                   |
| create   | String                           | Yes      | Creation page title                                                                                                                                               |
| update   | String                           | Yes      | Update page title                                                                                                                                                 |
| vars     | Object<placeholder, replacement> | No       | Variables to replace placeholders in the update page title. `replacement` must represent a property path (separated with `.` if nested) of the form's data object |

## Calls

| Property | Type     | Required                                                | Purpose                                                                                                                                                 |
|----------|----------|---------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| read     | Function | Yes                                                     | Called with an id if `list.noList` unspecified or false, with no argument otherwise. Must return a promise with an object representing the form's data. |
| update   | Function | Yes                                                     | Called with an object representing the resource's data. Must return a promise.                                                                          |
| list     | Function | Yes if `list.noList` unspecified of false, no otherwise | Called with no argument. Must return a promise with an array of objects with an `id` property.                                                          |
| create   | Function | Yes if `list.noList` unspecified of false, no otherwise | Called with an object representing the resource's data. Must return a promise with the created object.                                                  |
| delete   | Function | Yes if `list.noList` unspecified of false, no otherwise | Called with an id. Must return a promise.                                                                                                               |

## List

| Property         | Type                                               | Required                     | Default value | Purpose                                            |
|------------------|----------------------------------------------------|------------------------------|---------------|----------------------------------------------------|
| displayedColumns | Array<[ListDisplayedColumn](#listdisplayedcolumn)> | Yes                          |               | Columns that will be displayed on the list page    |
| filters          | Array<[ListFilter](#listfilter)>                   | No                           |               | Available list filters                             |
| paginate         | Boolean                                            | No                           | false         | Whether or not the list page should be paginated   |
| rowsPerPage      | Integer                                            | Yes (if `paginate` is `true` |               | Amount of displayed rows if list page is paginaged |
| component        | React Component                                    | No                           |               | Override the default list component                |
| noList           | Boolean                                            | No                           | false         | True to avoid the list page                        |

### ListDisplayedColumn

| Property | Type   | Required |  Purpose                                                                |
|----------|--------|----------|-------------------------------------------------------------------------|
| field    | String | Yes      |  Property path (separated with `.` if nested) of the form's data object |
| title    | String | Yes      |  Title of the column                                                    |

### ListFilter

| Property | Type     | Required |  Purpose                                                                                                    |
|----------|----------|----------|-------------------------------------------------------------------------------------------------------------|
| title    | String   | Yes      |  Filter title                                                                                               |
| filter   | Function | Yes      |  Takes two arguments, the `item` and the `value` of the filter, must return `true` if the item must be kept |

## Form

| Property  | Type                                  | Required |  Purpose                                                                                                  |
|-----------|---------------------------------------|----------|-----------------------------------------------------------------------------------------------------------|
| blocks    | Array<Array<[FormBlock](#formblock)>> | Yes      | Two-levels array, first level for all the form rows, second-level one for a form row's blocks definitions |
| providers | Object<name, function>                | No       | Used to feed some form components with extra data. Function must return a promise with the data           |

### FormBlock

| Property            | Type                        | Required | Default value | Purpose                                                                                                                           |
|---------------------|-----------------------------|----------|---------------|-----------------------------------------------------------------------------------------------------------------------------------|
| component           | React Component             | Yes      |               | The component that will handle this field. Must have `value` and `onChange` props. `onChange` must only be fed with the new value |
| field               | String                      | Yes      |               | Property of form's data handled in this block                                                                                     |
| props               | Object<propName, propValue> | No       |               | Props to be sent to the component                                                                                                 |
| externalObjectProps | Object<propName, path>      | No       |               | Extra props to be sent, that are based on a given property of the form's data. If `path` is nested, must be splitted with `.`     |
| defaultValue        | mixed                       | No       | ''            | Default value for this property. Must be specified if it's something else than an empty string                                    |
| optionsProvider     | String                      | No       |               | Feed the component with extra data (in the `options` prop). Specify the provider name (defined in form's `providers` section      |
| refreshable         | Boolean                     | No       | false         | Activates the refreshability of the component's extra data                                                                        |
| roles               | Array<String>               | No       | undefined     | If auth required for the backoffice, which user roles will have access to this resource                                           |
