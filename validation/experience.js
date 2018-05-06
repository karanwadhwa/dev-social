const validator = require("validator");
const checkEmpty = require("./checkEmpty");

const validateExpInput = data => {
  let errors = { err: {} };

  // When the req comes in, if the keys arent present
  // validator wont check for empty objects
  // hence first check with custom checkEmpty function
  // and return empty strings for validator checks.
  data.title = !checkEmpty(data.title) ? data.title : "";
  data.company = !checkEmpty(data.company) ? data.company : "";
  data.location = !checkEmpty(data.location) ? data.location : "";
  data.from = !checkEmpty(data.from) ? data.from : "";

  // check title field
  if (validator.isEmpty(data.title))
    errors.err.title = "A valid Job Title is required";

  // check company field
  if (validator.isEmpty(data.company))
    errors.err.company = "Company field is required";

  // check location field
  if (validator.isEmpty(data.location))
    errors.err.location = "Enter your job location";

  // check from date
  if (validator.isEmpty(data.from))
    errors.err.from = "From date cannot be empty";

  return {
    errors: errors,
    isValid: checkEmpty(errors.err)
  };
};

module.exports = validateExpInput;
