import React, {useState} from 'react';
import definitionToDefaultValueHelper from '../helpers/definitionToDefaultValueHelper';
import Form from '../Form';
import Backdrop from '../components/Backdrop';
import Snackbar from '../components/Snackbar';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export default props => {
    const [data, setData] = useState(definitionToDefaultValueHelper(props.definition.form));
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);
    const history = useHistory();

    const handleChange = (d) => {
        setData({...d});
    };

    const handleSave = () => {
        setLoading(true);
        props.definition.calls.create(data)
            .then(result => {
                setResult(result);
                setLoading(false);
                setSuccessSnackbar(true);
            })
            .catch(() => {
                setLoading(false);
                setErrorSnackbar(true);
            });
    };

    const handleCloseSuccessSnackbar = () => {
        setSuccessSnackbar(false);
        history.push(`${props.definition.baseUrl}/edit/${result.id}`);
    };

    const handleCloseErrorSnackbar = () => {
        setErrorSnackbar(false);
    };

    return <section data-testid="page-create">
        <h1>{ props.definition.titles.create }</h1>

        <Breadcrumb
            links={[
                { label: 'Home', href: '/', icon: HomeIcon },
                { label: props.definition.titles.list, href: props.definition.baseUrl, icon: ListIcon }
            ]}
            label={props.definition.titles.create}
            icon={AddCircleOutlineIcon}
        />

        <Form
            data={data}
            form={props.definition.form}
            onChange={handleChange}
            onSave={handleSave}
        />
        <Backdrop open={loading} />
        <Snackbar
            open={successSnackbar}
            onClose={handleCloseSuccessSnackbar}
            severity="success"
            message="Saved successfully"
        />
        <Snackbar
            open={errorSnackbar}
            onClose={handleCloseErrorSnackbar}
            severity="error"
            message="Error while saving"
        />
    </section>;
}
