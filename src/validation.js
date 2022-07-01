import * as yup from 'yup';

export default (targetUrl, feeds) => {
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
    .notOneOf(feeds.map(({ url }) => url));

  return schema.validate(targetUrl.trim());
};
