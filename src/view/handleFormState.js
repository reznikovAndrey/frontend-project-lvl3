export default (formState, { input }) => {
  switch (formState) {
    case 'invalid':
      input.classList.add('is-invalid');
      break;
    case 'valid':
      input.classList.remove('is-invalid');
      break;
    default:
      throw new Error('Unknown rss form state:', formState);
  }
};
