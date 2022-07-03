/* eslint-disable no-param-reassign */
export default (processState, {
  submitBtn, feedbackContainer, form, input,
}, t) => {
  switch (processState) {
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
      throw new Error('Unknown process state:', processState);
  }
};
