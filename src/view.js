import onChange from 'on-change';

import { buildHTML, buildFeedsHTML, buildPostsHTML } from './utils.js';

export default (state, elements, t) => onChange(state, (path, value) => {
  const {
    form, input, submitBtn, feedbackContainer, feedsContainer, postsContainer,
  } = elements;

  if (path === 'rssForm.state') {
    switch (value) {
      case 'invalid':
        input.classList.add('is-invalid');
        break;
      case 'valid':
        input.classList.remove('is-invalid');
        break;
      default:
        throw new Error('Unknown rss form state:', value);
    }
  }

  if (path === 'rssForm.errors') {
    feedbackContainer.classList.add('text-danger');
    const text = value.map((key) => t(key)).join('\n');
    feedbackContainer.textContent = text;
  }

  if (path === 'processState') {
    switch (value) {
      case 'filling':
        submitBtn.disabled = false;
        break;
      case 'loading':
        submitBtn.disabled = true;
        break;
      case 'loaded':
        submitBtn.disabled = false;

        feedbackContainer.classList.remove('text-danger');
        feedbackContainer.classList.add('text-success');
        feedbackContainer.textContent = t('successMessage');

        form.reset();
        input.focus();
        break;
      case 'error':
        submitBtn.disabled = false;
        feedbackContainer.classList.add('text-danger');
        break;
      default:
        throw new Error('Unknown process state:', value);
    }
  }

  if (path === 'processError') {
    feedbackContainer.textContent = t(value);
  }

  if (path === 'feeds') {
    const items = value.map((feedData) => buildFeedsHTML(feedData));
    buildHTML(feedsContainer, items, 'feeds.title', t);
  }

  if (path === 'posts') {
    const items = value.map((postData) => buildPostsHTML(postData, t));
    buildHTML(postsContainer, items, 'posts.title', t);
  }
});
