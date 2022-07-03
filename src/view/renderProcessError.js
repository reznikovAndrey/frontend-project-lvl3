/* eslint-disable no-param-reassign */
export default (error, { feedbackContainer }, t) => {
  feedbackContainer.textContent = t(error);
};
