import onChange from 'on-change';

import handleFormState from './handleFormState.js';
import renderFormErrors from './renderFormErrors.js';
import handleProcessState from './handleProcessState.js';
import renderProcessError from './renderProcessError.js';
import renderFeed from './renderFeed.js';
import renderPosts from './renderPosts.js';
import renderModal from './renderModal.js';

export default (state, elements, t) => onChange(state, (path, value) => {
  switch (path) {
    case 'rssForm.state':
      handleFormState(value, elements);
      break;
    case 'rssForm.errors':
      renderFormErrors(value, elements, t);
      break;
    case 'processState':
      handleProcessState(value, elements, t);
      break;
    case 'processError':
      renderProcessError(value, elements, t);
      break;
    case 'feeds':
      renderFeed(value, elements, t);
      break;
    case 'posts':
      renderPosts(value, state, elements, t);
      break;
    default:
      if (path.includes('UIState.shownPosts')) {
        renderModal(value, state, elements);
      }
      break;
  }
});
