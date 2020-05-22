import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import titleHelper from '../../lib/helpers/titleHelper';

test('replaces placeholders with object vars', () => {
    const object = {
        name: 'Alexander Frei',
        picture: {
            path: '/frei.jpg'
        }
    };
    const vars = {
        '%name%': 'name',
        '%picture%': 'picture.path'
    };

    expect(titleHelper('Update %name% with picture %picture%', vars, object)).toEqual('Update Alexander Frei with picture /frei.jpg');
});
