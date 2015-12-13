export function initialize(container, application) {  
  application.inject('route', 'websockets', 'service:websockets');
}

export default {
  name: 'websockets',
  initialize
};
