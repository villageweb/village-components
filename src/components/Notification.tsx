import React, { Component } from "react";
import Icon from "./Icon";

type NotificationProps = {
  message: string;
  type?: "success" | "fail";
  persist?: boolean;
  onClose?: () => void;
};

class Notification extends Component<NotificationProps> {
  state = { show: true };
  timeout: number | undefined;

  close = () => {
    this.props.onClose && this.props.onClose();
    clearTimeout(this.timeout);
    this.setState({ show: false });
  };

  render() {
    const { message, persist, type } = this.props;

    if (!message || !this.state.show) {
      return null;
    }

    let animationClass = "message--stay";

    if (!persist) {
      animationClass = "message--go";
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.close();
      }, 10000);
    }

    return (
      <div
        className={`message message--${type} ${animationClass}`}
        onClick={this.close}
      >
        <Icon
          name={`${type === "success" ? "circle-tick" : "circle-cross"}`}
          size="md"
          className={`fill--${type} margin-r--sm v-align--middle cursor--pointer`}
        />
        <span>{message} </span>
      </div>
    );
  }
}

export { NotificationProps, Notification };
