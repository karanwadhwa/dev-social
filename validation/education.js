const validator = require("validator");
const checkEmpty = require("./checkEmpty");

const validateEduInput = data => {
  let errors = { err: {} };

  // When the req comes in, if the keys arent present
  // validator wont check for empty objects
  // hence first check with custom checkEmpty function
  // and return empty strings for validator checks.
  data.school = !checkEmpty(data.school) ? data.school : "";
  data.degree = !checkEmpty(data.degree) ? data.degree : "";
  data.major = !checkEmpty(data.major) ? data.major : "";
  data.from = !checkEmpty(data.from) ? data.from : "";

  // check title field
  if (validator.isEmpty(data.school))
    errors.err.school = "A school name is required";

  // check company field
  if (validator.isEmpty(data.degree)) errors.err.degree = "Degree is required";

  // check location field
  if (validator.isEmpty(data.major)) errors.err.major = "Enter your major";

  // check from date
  if (validator.isEmpty(data.from))
    errors.err.from = "From date cannot be empty";

  return {
    errors: errors,
    isValid: checkEmpty(errors.err)
  };
};

module.exports = validateEduInput;
