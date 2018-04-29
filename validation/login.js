const validator = require("validator");
const checkEmpty = require("./checkEmpty");

const validateLoginInput = data => {
  let errors = { err: {} };

  // When the req comes in, if the keys arent present
  // validator wont check for empty objects
  // hence first check with custom checkEmpty function
  // and return empty strings for validator checks.
  data.email = !checkEmpty(data.email) ? data.email : "";
  data.password = !checkEmpty(data.password) ? data.password : "";

  // check email field
  if (!validator.isEmail(data.email))
    errors.err.email = "A valid email is required";

  // check passwords
  if (validator.isEmpty(data.password))
    errors.err.password = "Password cant be empty";
  /* if (!validator.isLength(data.password, { min: 6, max: 30 }))
    errors.err.password = "Password length must be between 6 and 30 characters"; */

  return {
    errors: errors,
    isValid: checkEmpty(errors.err)
  };
};

module.exports = validateLoginInput;
