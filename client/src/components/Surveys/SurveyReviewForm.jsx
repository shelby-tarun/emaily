import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";
import { submitSurvey } from "../../actions";

const SurveyReviewForm = ({ onCancel, formValues, submitSurvey, history }) => {
  const renderFields = () => {
    return formFields.map(({ label, name }) => {
      return (
        <div key={name} className="field">
          <label>
            <span>{label}</span>
          </label>
          <span className="ui label">{formValues[name]}</span>
        </div>
      );
    });
  };

  return (
    <div className="ui container" style={{ width: "30%" }}>
      <h2>Please confirm your entries</h2>
      <form className="ui form">
        {renderFields()}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="ui button" onClick={onCancel}>
            Back
          </button>
          <button
            className="ui button primary"
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              await submitSurvey(formValues);
              history.push("/surveys");
            }}
          >
            Send Survey&nbsp;&nbsp;
            <i className="fas fa-envelope"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.form);
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, { submitSurvey })(
  withRouter(SurveyReviewForm)
);
