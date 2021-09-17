const express = require('express');
const config = require('../config');
const { postgraphile } = require('postgraphile');
const { verifyToken } = require('../helper/jwt');
const app = express.Router();

const devPostGraphileOptions = {
  watchPg: true,
  extendedErrors: ['hint', 'detail', 'errcode'],
  graphiqlRoute: '/graphiql',
  showErrorStack: 'json',
  exportGqlSchemaPath: 'schema.graphql',
  graphiql: true,
  enhanceGraphiql: true,
  disableQueryLog: false,
  allowExplain(req) {
    // TODO: customise condition!
    return true;
  },
  pgSettings: async () => { }
}

const prodPostgraphileOptions = {
  subscriptions: true,
  dynamicJson: true,
  enableQueryBatching: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  graphqlRoute: '/graphql',
  extendedErrors: ['errcode'],
  legacyRelations: 'omit',
  graphiql: false,
  retryOnInitFail: true,
  disableQueryLog: true,
  appendPlugins: [
    require('@graphile-contrib/pg-simplify-inflector'),
    require('postgraphile-plugin-connection-filter')
  ],
  pgSettings: async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Barrier ', '') || "error";
    const tokenData = await verifyToken(token);
    const loggedInUser = tokenData?.userId;

    if (!loggedInUser)
      throw new Error('No user found');

    req.loggedInUserId = loggedInUserId;
  }
};

app.use(
  postgraphile(config.DATABASE_URL, 'public', config.ENV === 'prod' ? prodPostgraphileOptions : { ...prodPostgraphileOptions, ...devPostGraphileOptions })
);

module.exports = app;
