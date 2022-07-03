import axios from 'axios';

const BASE_URL = 'https://allorigins.hexlet.app/get';

const formTargetUrl = (url) => {
  const targetUrl = new URL(BASE_URL);
  targetUrl.searchParams.set('disableCache', true);
  targetUrl.searchParams.set('url', url);
  return targetUrl.href;
};

export default (url) => {
  const targetUrl = formTargetUrl(url);
  return axios.get(targetUrl);
};
