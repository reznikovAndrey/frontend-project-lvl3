export default ({ contents }) => {
  const parser = new DOMParser();
  const parsedData = parser.parseFromString(contents, 'application/xml');

  const feed = {
    title: parsedData.querySelector('title').textContent,
    description: parsedData.querySelector('description').textContent,
  };

  const postsData = parsedData.querySelectorAll('item');
  const posts = [...postsData].map((item) => ({
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
  }));

  return { feed, posts };
};
