import React from "react";

const SurveyField = ({ input, label, meta: { touched, error } }) => {
  const renderError = () => {
    if (touched && error) {
      return <div className="ui red basic label">{error}</div>;
    }
  };

  const className = `field ${error && touched ? "error" : ""}`;

  return (
    <div className={className}>
      <label>
        <span>{label}</span>
        <input {...input} autoComplete="off" />
      </label>
      {renderError()}
    </div>
  );
};

export default SurveyField;
