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

module.exports.postSignup = (event, context, callback) => {
  console.log(JSON.stringify(event.request.userAttributes))
  console.log(JSON.stringify(context))
  // Return result to Cognito
  context.done(null, event);      
}
