'use strict';

module.exports.hello = (event, context, callback) => {
  const { body } = event
  const { authorizer } = event.requestContext

  console.log('Logging:')
  console.log(body)
  console.log(authorizer)
  console.log(event)
  console.log(context)
  console.log('/Logging')
  
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
      authorizer,
      event,
      context
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

