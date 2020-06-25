import { intersection } from 'lodash';

export default (definitions, withAuth, user) => {
    if (withAuth) {
        const availableDefinitions = user ? definitions.filter(d => !d.roles || intersection(d.roles, user.roles).length > 0) : [];

        return availableDefinitions.map(d => ({
            ...d,
            form: {
                ...d.form,
                blocks: [
                    ...(d.form.blocks.map ? d.form.blocks.map(r => r.filter(c => !c.roles || intersection(c.roles, user.roles).length > 0)).filter(r => r.length > 0) : [])
                ]
            },
            canCreate: !d.create || !d.create.roles || intersection(d.create.roles, user.roles).length > 0,
            canDelete: !d.delete || !d.delete.roles || intersection(d.delete.roles, user.roles).length > 0
        }));
    }

    return definitions.map(d => ({
        ...d,
        canCreate: true,
        canDelete: true
    }));
};
