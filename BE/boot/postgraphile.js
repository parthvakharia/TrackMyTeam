const express = require('express');
const config = require('../config');
const { postgraphile } = require('postgraphile');
const app = express.Router();

const postgraphileOptions = {
  dev: {
    subscriptions: true,
    watchPg: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    ignoreIndexes: false,
    graphqlRoute: '/graphql',
    graphiqlRoute: '/graphiql',
    showErrorStack: 'json',
    extendedErrors: ['hint', 'detail', 'errcode'],
    appendPlugins: [
      require('@graphile-contrib/pg-simplify-inflector'),
      require("postgraphile-plugin-connection-filter")
    ],
    exportGqlSchemaPath: 'schema.graphql',
    graphiql: true,
    enhanceGraphiql: true,
    allowExplain(req) {
      // TODO: customise condition!
      return true;
    },
    enableQueryBatching: true,
    legacyRelations: 'omit',
    pgSettings(req) {
      /* TODO */
    },
  },
  prod: {
    subscriptions: true,
    retryOnInitFail: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    ignoreIndexes: false,
    graphqlRoute: '/graphql',
    extendedErrors: ['errcode'],
    appendPlugins: [
      require('@graphile-contrib/pg-simplify-inflector'),
      require('postgraphile-plugin-connection-filter')
    ],
    graphiql: false,
    enableQueryBatching: true,
    disableQueryLog: true, // our default logging has performance issues, but do make sure you have a logging system in place!
    legacyRelations: 'omit',
    pgSettings(req) {
      /* TODO */
    },
  },
};

app.use(
  postgraphile(config.DATABASE_URL, 'public', postgraphileOptions[config.ENV])
);

module.exports = app;
