const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateRegisterInput = (data) => {
  let errors = [];

  //convert empty fields to string
  //should receive email, username and password
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //check if string has a length of zero
  if (Validator.isEmpty(data.email)) {
    // errors.email = "Email address is required"
    errors.push("Email address is required")
  } else if (!Validator.isEmail(data.email)) {
    // errors.email = "Email address must be valid"
    errors.push("Email address must be valid")
  }

  if (Validator.isEmpty(data.username)) {
    // errors.username = "Username is required"
    errors.push("Username is required")
  }

  if (Validator.isEmpty(data.password)) {
    // errors.password = "Password is required"
    errors.push("Password is required")
  } else if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    // errors.password = "Password must be at least 6 characters"
    errors.push("Password must be at least 6 characters")
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}