const path = require('path');

module.exports = function (options) {
  return {
    ...options,
    resolve: {
      ...options.resolve,
      alias: {
        ...(options.resolve && options.resolve.alias),
        '@app/prisma': path.resolve(__dirname, 'libs/prisma/src'),
      },
    },
  };
};
