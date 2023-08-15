import classNames from "classnames";
import React from "react";
import styles from "./ErrorMessage.css";
const cx = classNames.bind(styles);

function ErrorMessage({ variant = "info", children }) {
  return (
    <div className={cx("Alert")}>
      <strong className={cx("Alert-message")}>{children}</strong>
    </div>
  );
}

export default ErrorMessage;
