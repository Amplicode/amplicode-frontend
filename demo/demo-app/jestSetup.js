require('whatwg-fetch');

jest.mock('./src/config', () => {
  return {
    env: {}
  }
});
