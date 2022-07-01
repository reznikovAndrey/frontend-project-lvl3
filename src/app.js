import i18next from 'i18next';
import axios from 'axios';
import { uniqueId } from 'lodash';

import getWatchedState from './views.js';
import resources from './locales/index.js';
import validate from './validation.js';
import parse from './parser.js';

const runApp = (t) => {
  const state = {
    processState: 'filling',
    processError: null,
    rssForm: {
      state: 'invalid',
      errors: [],
    },
    feeds: [],
    posts: [],
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('input[name="url"]'),
    submitBtn: document.querySelector('button[type="submit"]'),
    feedbackContainer: document.querySelector('.feedback'),
    feedsContainer: document.querySelector('.feeds'),
    postsContainer: document.querySelector('.posts'),
  };

  const watchedState = getWatchedState(state, elements, t);

  const { form } = elements;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const url = formData.get('url');
    const { feeds } = watchedState;

    validate(url, feeds).then(() => {
      watchedState.rssForm.state = 'valid';
      watchedState.processState = 'loading';

      return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`);
    }).then(({ data }) => {
      const { feed, posts } = parse(data);

      feed.id = uniqueId('feed-');
      feed.url = url;

      const postsLinkedWithFeed = posts.map((post) => ({ ...post, feedId: feed.id, id: uniqueId('post-') }));

      watchedState.feeds.unshift(feed);
      watchedState.posts = [...postsLinkedWithFeed, ...watchedState.posts];
      watchedState.processState = 'loaded';
    }).catch((err) => {
      watchedState.processState = 'error';
      const { name } = err;
      switch (name) {
        case 'ValidationError': {
          const { errors } = err;
          watchedState.rssForm.state = 'invalid';
          watchedState.rssForm.errors = errors;
          break;
        }
        case 'AxiosError':
          watchedState.processState = 'error';
          watchedState.processError = 'errorMessages.network';
          break;
        case 'TypeError':
          watchedState.processState = 'error';
          watchedState.processError = 'errorMessages.parsing';
          break;
        default:
          throw err;
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
