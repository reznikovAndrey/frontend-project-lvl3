import { last } from 'lodash';

export default (shownPostsIds, { posts }, { modal }) => {
  const { postId } = last(shownPostsIds);
  const { title, description, link } = posts.find(({ id }) => id === postId);

  const targetEl = document.querySelector(`a[data-id="${postId}"]`);
  targetEl.classList.remove('fw-bold');
  targetEl.classList.add('fw-normal');

  const modalTitle = modal.querySelector('.modal-title');
  modalTitle.textContent = title;

  const modalBody = modal.querySelector('.modal-body');
  modalBody.textContent = description;

  const linkBtn = modal.querySelector('a[role="button"]');
  linkBtn.href = link;
};
