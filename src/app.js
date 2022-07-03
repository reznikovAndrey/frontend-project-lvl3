import i18next from 'i18next';
import { differenceBy } from 'lodash';

import resources from './locales/index.js';
import getWatchedState from './view/index.js';
import {
  validate, parse, fetchData, modifyFeed, modifyPosts, DELAY, DEFAULT_LNG,
} from './utils/index.js';

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
    activeTimerId: null,
    UIState: {
      shownPosts: [],
    },
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('input[name="url"]'),
    submitBtn: document.querySelector('button[type="submit"]'),
    feedbackContainer: document.querySelector('.feedback'),
    feedsContainer: document.querySelector('.feeds'),
    postsContainer: document.querySelector('.posts'),
    modal: document.querySelector('#modal'),
  };

  const watchedState = getWatchedState(state, elements, t);

  const updatePosts = () => {
    const { feeds, activeTimerId } = watchedState;
    clearTimeout(activeTimerId);

    const promises = feeds.map(({ url }) => fetchData(url));
    return Promise.all(promises).then((res) => {
      const freshPosts = res.map(({ data }, idx) => {
        const { posts } = parse(data);
        const { id: feedId } = feeds[idx];

        const freshFeedPosts = differenceBy(posts, state.posts, 'link');
        return modifyPosts(freshFeedPosts, feedId);
      }).flat();
      watchedState.posts = [...freshPosts, ...state.posts];
    }).finally(() => {
      watchedState.activeTimerId = setTimeout(updatePosts, DELAY);
    });
  };

  const { form, postsContainer } = elements;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const url = formData.get('url');
    const { feeds } = watchedState;

    validate(url, feeds).then(() => {
      watchedState.rssForm.state = 'valid';
      watchedState.processState = 'loading';

      return fetchData(url);
    }).then(({ data }) => {
      const { feed, posts } = parse(data);
      const modifiedFeed = modifyFeed(feed, url);
      const modifiedPosts = modifyPosts(posts, modifiedFeed.id);

      watchedState.feeds = [modifiedFeed, ...state.feeds];
      watchedState.posts = [...modifiedPosts, ...state.posts];
      watchedState.processState = 'loaded';
      watchedState.activeTimerId = setTimeout(updatePosts, DELAY);
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

  postsContainer.addEventListener('click', (e) => {
    const postId = e.target.dataset.id;
    const targetPost = watchedState.posts.find(({ id }) => id === postId);

    watchedState.UIState.shownPosts.push({ postId: targetPost.id });
  }, true);
};

export default () => {
  const i18nextInstance = i18next.createInstance();

  i18nextInstance.init({
    lng: DEFAULT_LNG,
    resources,
  }).then((t) => runApp(t));
};
