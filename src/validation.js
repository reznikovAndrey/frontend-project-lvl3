import * as yup from 'yup';

export default (url, feeds) => {
  yup.setLocale({
    mixed: {
      required: 'emptyInput',
      notOneOf: 'linkAlreadyWasLoaded',
    },
    string: {
      url: 'invalidUrl',
    },
  });

  const schema = yup.string().required().url()
    .notOneOf(feeds);

  return schema.validate(url.trim())
    .then(() => ({ success: true, feedback: ['form.successMessage'] }))
    .catch(({ errors }) => ({
      success: false,
      feedback: errors.map((key) => `form.errorMessages.${key}`),
    }));
};
