import { fill, flatten, uniq, zipObject } from 'lodash';

const fieldsWithOptions = blocks => flatten(
    blocks.map(container => container.filter(b => !!b.optionsProvider).map(b => b.field))
);

const fieldsReferences = blocks => flatten(
    blocks.map(container => container.filter(b => !!b.optionsProvider).map(b => ({ field: b.field, ref: b.optionsProvider })))
);

const getEmptyOptions = blocks => {
    const fields = fieldsWithOptions(blocks);

    return zipObject(fields, fill(Array(fields.length), []));
};

const fetchAllOptions = definition => {
    const fieldsRefs = fieldsReferences(definition.blocks);
    const fields = fieldsRefs.map(f => f.field);
    const refs = uniq(fieldsRefs.map(f => f.ref));

    return Promise.all(refs.map(r => definition.providers[r]())).then(results => {
        const refResults = zipObject(refs, results);

        return zipObject(fields, fieldsRefs.map(fr => refResults[fr.ref]));
    })
};

const fetchOptions = async (definition, block) => {
    const results = await definition.providers[block.optionsProvider]();
    const fieldsWithThisRef = flatten(definition
        .blocks
        .map(container => container
            .filter(b => b.optionsProvider && b.optionsProvider === block.optionsProvider)
            .map(b => b.field)
        ));

    return zipObject(
        fieldsWithThisRef,
        fill(new Array(fieldsWithThisRef.length), results)
    );
}

export { getEmptyOptions, fetchAllOptions, fetchOptions };
