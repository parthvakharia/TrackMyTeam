const appRoutes = require('../components/routes');
const { authRoutes } = require('../components/auth');
const { responseHandler, globalErrorHandler } = require('./middleware');

module.exports = (app) => {
  app.use(responseHandler);

  // unprotected routes
  app.use('/auth', authRoutes);

  // protected routes
  app.use('/api', appRoutes);

  // global error handler for joi.
  app.use(globalErrorHandler);
};
