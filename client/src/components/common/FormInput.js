import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const FormInput = ({
  name,
  placeholder,
  type,
  value,
  error,
  info,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group has-feedback">
      <input
        className={classnames("form-control", {
          "is-invalid": error
        })}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

FormInput.defaultProps = {
  type: "text"
};

export default FormInput;
