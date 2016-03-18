export const selectedWidget = (state: any = null, {type, payload}) => {
  switch (type) {
    case 'SELECT_WIDGET':
      return payload;
    default:
      return state;
  }
};
