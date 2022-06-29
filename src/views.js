import onChange from 'on-change';

export default (state, elements) => onChange(state, (path, value) => {
  const { form, input, feedbackContainer } = elements;

  if (path === 'rssForm.valid') {
    if (!value) {
      input.classList.add('is-invalid');
      feedbackContainer.classList.add('text-danger');
    } else {
      form.reset();
      feedbackContainer.classList.remove('text-danger');
      feedbackContainer.classList.add('text-success');
      input.classList.remove('is-invalid');
      input.focus();
    }
  }

  if (path === 'rssForm.feedback') {
    feedbackContainer.textContent = value;
  }
});
