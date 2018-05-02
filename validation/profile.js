const validator = require("validator");
const checkEmpty = require("./checkEmpty");

const validateProfileInput = data => {
  let errors = { err: {} };

  // When the req comes in, if the keys arent present
  // validator wont check for empty objects
  // hence first check with custom checkEmpty function
  // and return empty strings for validator checks.
  data.handle = !checkEmpty(data.handle) ? data.handle : "";
  data.status = !checkEmpty(data.status) ? data.status : "";
  data.skills = !checkEmpty(data.skills) ? data.skills : "";

  // check handle field
  if (!validator.isLength(data.handle, { min: 2, max: 20 }))
    errors.err.handle = "Handle needs to be between 2 and 20 characters";

  // check status
  if (validator.isEmpty(data.status))
    errors.err.status = "Please enter your current status";

  // check skills
  if (validator.isEmpty(data.skills))
    errors.err.skills = "Skills cant be empty";

  // check socialmedia links
  if (!checkEmpty(data.website)) {
    if (!validator.isURL(data.website)) errors.err.website = "Not a valid URL";
  }
  if (!checkEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) errors.err.twitter = "Not a valid URL";
  }
  if (!checkEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook))
      errors.err.facebook = "Not a valid URL";
  }
  if (!checkEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin))
      errors.err.linkedin = "Not a valid URL";
  }
  if (!checkEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram))
      errors.err.instagram = "Not a valid URL";
  }
  if (!checkEmpty(data.github)) {
    if (!validator.isURL(data.github)) errors.err.github = "Not a valid URL";
  }
  if (!checkEmpty(data.gitlab)) {
    if (!validator.isURL(data.gitlab)) errors.err.gitlab = "Not a valid URL";
  }
  if (!checkEmpty(data.bitbucket)) {
    if (!validator.isURL(data.bitbucket))
      errors.err.bitbucket = "Not a valid URL";
  }

  return {
    errors: errors,
    isValid: checkEmpty(errors.err)
  };
};

module.exports = validateProfileInput;
