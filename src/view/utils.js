export default (container, items, titleKey, t) => {
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
