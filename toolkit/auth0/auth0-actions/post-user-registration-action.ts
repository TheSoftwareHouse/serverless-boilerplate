/*
* Handler that will be called during the execution of a PostUserRegistration flow.
*
* @param {Event} event - Details about the context and user that has registered.
* @param {PostUserRegistrationAPI} api - Methods and utilities to help change the behavior after a signup.
*/

exports.onExecutePostUserRegistration = async (event, api) => {
  const axios = require('axios');

  try {
    await axios.post(
      event.secrets.POST_USER_REGISTRATION_URL,
      {
        email: event.user.email,
        firstName: event.user.given_name,
        lastName: event.user.family_name
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": event.secrets.X_AUTH_TOKEN,
        },
      },
    );
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
