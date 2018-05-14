const validator = require("validator");
const checkEmpty = require("./checkEmpty");

const validatePostInput = data => {
  let errors = { err: {} };

  // When the req comes in, if the keys arent present
  // validator wont check for empty objects
  // hence first check with custom checkEmpty function
  // and return empty strings for validator checks.
  data.body = !checkEmpty(data.body) ? data.body : "";

  // check post body
  if (!validator.isLength(data.body, { min: 10, max: 300 }))
    errors.err.body = "Post length must be between 10 and 300 characters";

  if (validator.isEmpty(data.body)) errors.err.body = "Post Body is required";

  return {
    errors: errors,
    isValid: checkEmpty(errors.err)
  };
};

module.exports = validatePostInput;
