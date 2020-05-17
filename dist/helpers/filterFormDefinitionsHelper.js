import { intersection } from 'lodash';
export default ((definitions, withAuth, user) => {
  if (withAuth) {
    return user ? definitions.filter(d => !d.roles || intersection(d.roles, user.roles).length > 0) : [];
  }

  return definitions;
});