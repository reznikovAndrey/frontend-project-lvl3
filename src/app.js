import * as yup from 'yup';

import getWatchedState from './views.js';

const successMessage = 'Rss was successfully loaded!';

const validate = (url, feeds) => {
  const schema = yup.string().trim()
    .required('Please, provide RSS link')
    .url('RSS link must be a valid URL')
    .notOneOf(feeds, 'This RSS link was already loaded');

  return schema.validate(url).then(() => ([])).catch(({ errors }) => errors);
};

export default () => {
  const state = {
    rssForm: {
      valid: false,
      feedback: [],
    },
    feeds: [],
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('input[name="url"]'),
    submitBtn: document.querySelector('button[type="submit"]'),
    feedbackContainer: document.querySelector('.feedback'),
  };

  const watchedState = getWatchedState(state, elements);

  const { form } = elements;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const url = formData.get('url');
    const { feeds } = watchedState;

    validate(url, feeds).then((errors) => {
      const haveErrors = errors.length !== 0;
      if (haveErrors) {
        watchedState.rssForm.valid = false;
        watchedState.rssForm.feedback = errors.join('\n');
      } else {
        watchedState.rssForm.valid = true;
        watchedState.rssForm.feedback = successMessage;
        watchedState.feeds.push(url);
      }
    });
  });
};
