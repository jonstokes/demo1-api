'use strict';

module.exports.hello = (event, context, callback) => {
  const body = JSON.parse(event.body)
  const authorizer = event.requestContext.authorizer

  console.log(body)
  console.log(authorizer)

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
      authorizer
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

