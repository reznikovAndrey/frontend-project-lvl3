const itemLinkAttrs = {
  href: '#',
  'data-id': '',
  target: '_blank',
  rel: 'noopener noreferrer',
};

const btnAttrs = {
  type: 'button',
  'data-id': '',
  'data-bs-toggle': 'modal',
  'data-bs-target': '#modal',
};

const setAttributes = (element, attrs) => Object.entries(attrs)
  .forEach(([attrName, attrVal]) => {
    element.setAttribute(attrName, attrVal);
  });

export const buildHTML = (container, items, titleKey, t) => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const header = document.createElement('h2');
  header.textContent = t(titleKey);
  cardBody.append(header);

  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');
  list.replaceChildren(...items);

  card.replaceChildren(cardBody, list);
  container.replaceChildren(card);
};

export const buildFeedsHTML = ({ title, description }) => {
  const listItem = document.createElement('li');
  listItem.classList.add('list-group-item', 'border-0', 'border-end-0');

  const itemTitle = document.createElement('h3');
  itemTitle.textContent = title;
  const itemDesc = document.createElement('p');
  itemDesc.textContent = description;

  listItem.append(itemTitle, itemDesc);
  return listItem;
};

export const buildPostsHTML = ({ link, title, id }, t) => {
  const listItem = document.createElement('li');
  listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

  const itemLink = document.createElement('a');
  itemLink.classList.add('fw-bold');
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
};
