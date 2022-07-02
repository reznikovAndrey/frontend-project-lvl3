import onChange from 'on-change';
import { last } from 'lodash';

import { buildHTML, buildFeedHTML, buildPostHTML } from './utils.js';

export default (state, elements, t) => onChange(state, (path, value) => {
  const {
    form, input, submitBtn, feedbackContainer, feedsContainer, postsContainer, modal,
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
    const items = value.map((feedData) => buildFeedHTML(feedData));
    buildHTML(feedsContainer, items, 'feeds.title', t);
  }

  if (path === 'posts') {
    const { UIState: { shownPosts } } = state;

    const items = value.map((postData) => {
      const wasShown = shownPosts.map(({ postId }) => postId).includes(postData.id);
      return buildPostHTML(postData, wasShown, t);
    });
    buildHTML(postsContainer, items, 'posts.title', t);
  }

  if (path.includes('UIState.shownPosts')) {
    const { postId } = last(value);
    const { title, description, link } = state.posts.find(({ id }) => id === postId);

    const targetEl = document.querySelector(`a[data-id="${postId}"]`);
    targetEl.classList.remove('fw-bold');
    targetEl.classList.add('fw-normal');

    const modalTitle = modal.querySelector('.modal-title');
    modalTitle.textContent = title;

    const modalBody = modal.querySelector('.modal-body');
    modalBody.textContent = description;

    const linkBtn = modal.querySelector('a[role="button"]');
    linkBtn.href = link;
  }
});
