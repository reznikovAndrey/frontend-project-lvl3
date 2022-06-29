import onChange from 'on-change';

export default (state, elements, t) => onChange(state, (path, value) => {
  const { input, feedbackContainer } = elements;

  if (path === 'rssForm.valid') {
    if (!value) {
      input.classList.add('is-invalid');
      feedbackContainer.classList.add('text-danger');
    } else {
      feedbackContainer.classList.remove('text-danger');
      feedbackContainer.classList.add('text-success');
      input.classList.remove('is-invalid');
    }
  }

  if (path === 'rssForm.feedback') {
    const text = value.map((key) => t(key)).join('\n');
    feedbackContainer.textContent = text;
  }
});
