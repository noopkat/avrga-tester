export function initialize(container, application) {
  application.inject('route', 'cookie', 'cookie:main');
}

export default {
  name: 'token-cookie',
  after: ['cookie'],
  initialize: initialize
};
