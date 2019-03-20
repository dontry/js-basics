import React from "react";
import PropTypes from "prop-types";
import AutoScalingText from "./AutoScalingText";
import { css } from "emotion";
import { getFormattedValue } from "./utils";

class CalculatorDisplay extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired
  };
  render() {
    const { value, ...props } = this.props;
    const formattedValue = getFormattedValue(
      value,
      typeof window === "undefined" ? "en-US" : window.navigator.language
    );

    return (
      <div
        {...props}
        css={css`
          color: "white",
          background: "#1c191c",
          lineHeight: "130px",
          fontSize: "6em",
          flex: "1"
        `}
      >
        <span>
          <AutoScalingText>{formattedValue}</AutoScalingText>
        </span>
      </div>
    );
  }
}

export default CalculatorDisplay;
