import _ from 'lodash';
export default function Contacts() {
  return {
    namespaced: true,
    state: {
      title: _.get(null, '', 'Contacts')
    },
  }
}
