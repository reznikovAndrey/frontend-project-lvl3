import * as yup from 'yup';

export default (url, feeds) => {
  yup.setLocale({
    mixed: {
      required: 'form.errorMessages.emptyInput',
      notOneOf: 'form.errorMessages.linkAlreadyWasLoaded',
    },
    string: {
      url: 'form.errorMessages.invalidUrl',
    },
  });

  const schema = yup.string().required().url()
    .notOneOf(feeds);

  return schema.validate(url.trim()).then(() => ['form.successMessage']);
};
