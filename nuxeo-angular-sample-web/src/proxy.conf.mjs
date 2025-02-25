import 'dotenv/config';

export default {
  '/nuxeo': {
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
    headers: {
      authorization: process.env.NUXEO_AUTHORIZATION,
      'nuxeo-virtual-host': ' http://localhost:4200/',
    },
  },
};
