import classNames from "classnames/bind";
import styles from "./Button.css";

const cx = classNames.bind(styles);

function Button({ size, status, title }) {
  return (
    <button
      style={{ marginLeft: "auto", marginRight: "auto" }}
      className={cx("button", size, status)}
    >
      <h4 className={cx("button__title")}>{title}</h4>
    </button>
  );
}

export default Button;
