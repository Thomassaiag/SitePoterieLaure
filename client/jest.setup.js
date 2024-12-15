require('@testing-library/jest-dom');
const fetch = require('node-fetch');  // Use require instead of import


global.importMetaEnv = {
  VITE_API_URL: 'localhost:14001',
};

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

global.fetch = fetch;
global.Response = fetch.Response;
global.Headers = fetch.Headers;
global.Request = fetch.Request;

global.BroadcastChannel = class {
  constructor() {}
  postMessage() {}
  close() {}
};