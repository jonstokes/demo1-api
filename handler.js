'use strict';

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",      
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      identity: event.requestContext.identity,
      context: context
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.putHello = (event, context, callback) => {
  const body = JSON.parse(event.body)
  const { query, variables } = body
  const identity = event.requestContext.identity

  console.log(query)
  console.log(variables)

  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",      
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      body,
      query,
      variables,
      identity
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.postSignup = (event, context, callback) => {
  console.log(JSON.stringify(event.request.userAttributes))
  console.log(JSON.stringify(context))
  // Return result to Cognito
  context.done(null, event);      
}

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean
} = require('graphql')

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    isLoggedIn: {
      type: GraphQLBoolean,
      resolve: (parent, args, ctx) => true
    },
    userName: {
      type: GraphQLString,
      resolve: (parent, args, ctx) => "DudesName"
    }
  }
})

// Here we declare the schema and resolvers for the query
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Root',
    fields: {
      viewer: {
        type: viewerType,
        resolve: (parent, args, ctx) => ({ isLoggedIn: true, userName: "dude" })
      }
    }
  }),
})


module.exports.graphql = (event, context, callback) => {
  const body = JSON.parse(event.body)
  const { query, variables } = body
  const identity = event.requestContext.identity
  const headers =  {
    "Content-Type": "application/json",      
    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
  }

  graphql(schema, query, null, identity, variables)
  .then(
    result => callback(null, {statusCode: 200, headers, body: JSON.stringify(result)}),
    err => callback(err)
  )
}
