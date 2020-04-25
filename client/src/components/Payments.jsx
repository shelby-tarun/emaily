import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { handleToken } from "../actions";

const Payments = (props) => {
  return (
    <div>
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 survey credits"
        amount={500}
        token={(token) => props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="ui button primary">Add Credits</button>
      </StripeCheckout>
    </div>
  );
};

export default connect(null, { handleToken })(Payments);
