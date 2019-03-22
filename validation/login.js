const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = ValidateLoginInput = (data) => {
  // let errors = {};
  let errors = [];
  //data.username && data.password
  //if input is empty, convert them to empty strings
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //
  if (Validator.isEmpty(data.username)) {
    // errors.username = "Username is required"
    errors.push("Username is required");
  }

  if (Validator.isEmpty(data.password)) {
    // errors.password = "Password is required"
    errors.push("Password is required");
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}