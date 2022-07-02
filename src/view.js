import onChange from 'on-change';

const buildHTML = (container, items, titleKey, t) => {
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

export default (state, elements, t) => onChange(state, (path, value) => {
  const {
    form, input, submitBtn, feedbackContainer, feedsContainer, postsContainer,
  } = elements;

  if (path === 'rssForm.state') {
    switch (value) {
      case 'invalid':
        input.classList.add('is-invalid');
        break;
      case 'valid':
        input.classList.remove('is-invalid');
        break;
      default:
        throw new Error('Unknown rss form state:', value);
    }
  }

  if (path === 'rssForm.errors') {
    feedbackContainer.classList.add('text-danger');
    const text = value.map((key) => t(key)).join('\n');
    feedbackContainer.textContent = text;
  }

  if (path === 'processState') {
    switch (value) {
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
        throw new Error('Unknown process state:', value);
    }
  }

  if (path === 'processError') {
    feedbackContainer.textContent = t(value);
  }

  if (path === 'feeds') {
    const items = value.map(({ title, description }) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item', 'border-0', 'border-end-0');

      const itemTitle = document.createElement('h3');
      itemTitle.textContent = title;
      const itemDesc = document.createElement('p');
      itemDesc.textContent = description;

      listItem.append(itemTitle, itemDesc);
      return listItem;
    });
    buildHTML(feedsContainer, items, 'feeds.title', t);
  }

  if (path === 'posts') {
    const items = value.map(({ link, title }) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

      const itemLink = document.createElement('a');
      itemLink.classList.add('fw-bold');
      itemLink.setAttribute('href', link);
      itemLink.setAttribute('target', '_blank');
      itemLink.setAttribute('rel', 'noopener noreferrer');
      itemLink.textContent = title;

      listItem.append(itemLink);
      return listItem;
    });
    buildHTML(postsContainer, items, 'posts.title', t);
  }
});
