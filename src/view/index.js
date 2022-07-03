import onChange from 'on-change';

import handleFormState from './handleFormState.js';
import renderFormErrors from './renderFormErrors.js';
import handleProcessState from './handleProcessState.js';
import renderProcessError from './renderProcessError.js';
import renderFeed from './renderFeed.js';
import renderPosts from './renderPosts.js';
import renderModal from './renderModal.js';

export default (state, elements, t) => onChange(state, (path, value) => {
  if (path === 'rssForm.state') {
    handleFormState(value, elements);
  }

  if (path === 'rssForm.errors') {
    renderFormErrors(value, elements, t);
  }

  if (path === 'processState') {
    handleProcessState(value, elements, t);
  }

  if (path === 'processError') {
    renderProcessError(value, elements, t);
  }

  if (path === 'feeds') {
    renderFeed(value, elements, t);
  }

  if (path === 'posts') {
    renderPosts(value, state, elements, t);
  }

  if (path.includes('UIState.shownPosts')) {
    renderModal(value, state, elements);
  }
});
