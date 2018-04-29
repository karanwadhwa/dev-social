const validator = require("validator");
const checkEmpty = require("./checkEmpty");

const validateRegisterInput = data => {
  let errors = { err: {} };

  // When the req comes in, if the keys arent present
  // validator wont check for empty objects
  // hence first check with custom checkEmpty function
  // and return empty strings for validator checks.
  data.name = !checkEmpty(data.name) ? data.name : "";
  data.email = !checkEmpty(data.email) ? data.email : "";
  data.password = !checkEmpty(data.password) ? data.password : "";
  data.password2 = !checkEmpty(data.password2) ? data.password2 : "";

  // check name field
  if (!validator.isLength(data.name, { min: 2, max: 30 }))
    errors.err.name = "Name must be between 2 and 30 characters";
  if (validator.isEmpty(data.name)) errors.err.name = "Name field is required";

  // check email field
  if (validator.isEmpty(data.email))
    errors.err.email = "A valid email is required";
  if (!validator.isEmail(data.email))
    errors.err.email = "A valid email is required";

  // check passwords
  if (validator.isEmpty(data.password))
    errors.err.password = "Password cant be empty";
  if (!validator.isLength(data.password, { min: 6, max: 30 }))
    errors.err.password = "Password length must be between 6 and 30 characters";
  if (validator.isEmpty(data.password2))
    errors.err.password2 = "Confirm your password";
  if (!validator.equals(data.password, data.password2))
    errors.err.password2 = "Passwords dont match";

  return {
    errors: errors,
    isValid: checkEmpty(errors.err)
  };
};

module.exports = validateRegisterInput;
