import buildHTML from './utils.js';

export const POSTS_TITLE_KEY = 'posts.title';

export const itemLinkAttrs = {
  href: '#',
  'data-id': '',
  target: '_blank',
  rel: 'noopener noreferrer',
};

export const btnAttrs = {
  type: 'button',
  'data-id': '',
  'data-bs-toggle': 'modal',
  'data-bs-target': '#modal',
};

const setAttributes = (element, attrs) => Object.entries(attrs)
  .forEach(([attrName, attrVal]) => {
    element.setAttribute(attrName, attrVal);
  });

export default (posts, state, { postsContainer }, t) => {
  const { UIState: { shownPosts } } = state;

  const items = posts.map(({ link, title, id }) => {
    const wasPostShown = shownPosts.map(({ postId }) => postId).includes(id);
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const itemLink = document.createElement('a');
    itemLink.classList.add(wasPostShown ? 'fw-normal' : 'fw-bold');
    itemLinkAttrs.href = link;
    itemLinkAttrs['data-id'] = id;
    setAttributes(itemLink, itemLinkAttrs);
    itemLink.textContent = title;

    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    btnAttrs['data-id'] = id;
    setAttributes(btn, btnAttrs);
    btn.textContent = t('openModalButtonText');

    listItem.append(itemLink, btn);
    return listItem;
  });
  buildHTML(postsContainer, items, 'posts.title', t);
};
