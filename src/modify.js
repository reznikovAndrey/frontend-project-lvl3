import { uniqueId } from 'lodash';

export const modifyFeed = (feed, url) => ({
  ...feed,
  id: uniqueId('feed-'),
  url,
});

export const modifyPosts = (posts, feedId) => posts.map((post) => ({
  ...post,
  feedId,
  id: uniqueId('post-'),
}));
