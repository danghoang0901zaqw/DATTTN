import { forwardRef } from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

const Button = forwardRef(
  ({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    className,
    onClick,
    ...passProps
  },ref) => {
    let Comp = "button";
    const props = {
      onClick,
      ...passProps,
    };

    if (disabled) {
      Object.keys(props).forEach((key) => {
        if (key.startsWith("on") && typeof props[key] === "function") {
          delete props[key];
        }
      });
    }
    if (to) {
      props.to = to;
      Comp = Link;
    } else if (href) {
      props.href = href;
      Comp = "a";
    }
    return (
      <Comp ref={ref} className={className} {...props}>
        {children}
      </Comp>
    );
  }
);

export default Button;
