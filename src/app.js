import i18next from 'i18next';

import getWatchedState from './views.js';
import resources from './locales/index.js';
import validate from './validation.js';

const runApp = (t) => {
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

  const watchedState = getWatchedState(state, elements, t);

  const { form, input } = elements;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const url = formData.get('url');
    const { feeds } = watchedState;

    validate(url, feeds).then((successFeedback) => {
      watchedState.rssForm.valid = true;
      watchedState.rssForm.feedback = successFeedback;
      watchedState.feeds.push(url);
      form.reset();
      input.focus();
    }).catch((err) => {
      const { name } = err;
      switch (name) {
        case 'ValidationError': {
          const { errors } = err;
          watchedState.rssForm.valid = false;
          watchedState.rssForm.feedback = errors;
          break;
        }
        default:
          break;
      }
    });
  });
};

export default () => {
  const defaultLng = 'en';
  const i18nextInstance = i18next.createInstance();

  i18nextInstance.init({
    lng: defaultLng,
    debug: true,
    resources,
  }).then((t) => runApp(t));
};
