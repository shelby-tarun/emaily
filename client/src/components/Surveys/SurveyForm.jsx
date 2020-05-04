import React from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

const SurveyForm = (props) => {
  const renderFields = () => {
    return formFields.map(({ label, name }) => (
      <Field
        key={name}
        label={label}
        component={SurveyField}
        type="text"
        name={name}
      />
    ));
  };

  return (
    <div className="ui container" style={{ width: "30%" }}>
      <h2 className="ui heading">New Survey</h2>
      <form
        className="ui form error"
        onSubmit={props.handleSubmit(props.onSurveySubmit)}
      >
        {renderFields()}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/surveys">
            <button type="button" className="ui button">
              Cancel
            </button>
          </Link>
          <button type="submit" className="ui button primary">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

const validate = (values) => {
  const errors = {};

  for (const { name } of formFields) {
    if (name === "recipients") {
      errors[name] = validateEmails(values[name] || "");
    }

    if (!values[name]) {
      errors[name] = `You must provide ${name}`;
    }
  }

  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
