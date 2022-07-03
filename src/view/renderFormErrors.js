/* eslint-disable no-param-reassign */
export default (errors, { feedbackContainer }, t) => {
  feedbackContainer.classList.add('text-danger');
  const text = errors.map((key) => t(key)).join('\n');
  feedbackContainer.textContent = text;
};
