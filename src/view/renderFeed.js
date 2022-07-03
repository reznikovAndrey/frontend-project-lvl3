import buildHTML from './utils.js';

const FEED_TITLE_KEY = 'feeds.title';

export default (feeds, { feedsContainer }, t) => {
  const items = feeds.map(({ title, description }) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'border-0', 'border-end-0');

    const itemTitle = document.createElement('h3');
    itemTitle.textContent = title;
    const itemDesc = document.createElement('p');
    itemDesc.textContent = description;

    listItem.append(itemTitle, itemDesc);
    return listItem;
  });
  buildHTML(feedsContainer, items, FEED_TITLE_KEY, t);
};
