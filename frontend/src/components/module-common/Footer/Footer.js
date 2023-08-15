import classNames from "classnames/bind";
import React from "react";
import styles from "./Footer.css";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx("Footer")}>
      <h1 className={cx("Footer-title")}>Amazon: Expect more. Pay less.</h1>
      <div className={cx("Container")}>
        <div className={cx("Row")}>
          <div className={cx("Column")}>
            <div className={cx("Heading")}>About Us</div>
            <a className={cx("FooterLink")} href="#">
              Aim
            </a>
            <a className={cx("FooterLink")} href="#">
              Vision
            </a>
            <a className={cx("FooterLink")} href="#">
              Testimonials
            </a>
          </div>
          <div className={cx("Column")}>
            <div className={cx("Heading")}>Services</div>
            <a className={cx("FooterLink")} href="#">
              Internships
            </a>
            <a className={cx("FooterLink")} href="#">
              Become an Affiliate
            </a>
            <a className={cx("FooterLink")} href="#">
              Currency Converter
            </a>
            <a className={cx("FooterLink")} href="#">
              Assistant
            </a>
          </div>
          <div className={cx("Column")}>
            <div className={cx("Heading")}>Contact Us</div>
            <a
              className={cx("FooterLink")}
              href="https://www.facebook.com/profile.php?id=100011684883483"
            >
              Le Minh Hoang
            </a>
            <a className={cx("FooterLink")} href="#">
              Nguyen Tung Lam
            </a>
            <a className={cx("FooterLink")} href="#">
              Trieu Quang Manh
            </a>
            <a className={cx("FooterLink")} href="#">
              Pham Tran Minh Hieu
            </a>
          </div>
          <div className={cx("Column")}>
            <div className={cx("Heading")}>Social Media</div>
            <a
              className={cx("FooterLink")}
              href="https://www.facebook.com/profile.php?id=100011684883483"
            >
              Facebook
            </a>
            <a className={cx("FooterLink")} href="#">
              Twitter
            </a>
            <a className={cx("FooterLink")} href="#">
              Youtube
            </a>
            <a className={cx("FooterLink")} href="#">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
