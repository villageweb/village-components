import React, { Component } from "react";
import Icon from "./Icon";

export type NotificationProps = {
  message: string;
  type?: "success" | "fail";
  persist?: boolean;
  onClose?: () => void;
};

export class Notification extends Component<NotificationProps> {
  timeout: number | undefined;
  ref: HTMLDivElement | null;

  close = () => {
    if(window.location.origin.includes('localhost')) {
      console.log('closing notification', this.ref);
    }
    this.ref?.parentElement?.removeChild(this.ref);
    this.props.onClose && this.props.onClose();
    clearTimeout(this.timeout);
  };

  componentWillUnmount() {
    if(window.location.origin.includes('localhost')) {
      console.log('unmounting notification component', this.ref);
    }
  }

  render() {
    const { message, persist, type } = this.props;

    if (!message) {
      return;
    }

    let animationClass = "message--stay";

    if (!persist) {
      animationClass = "message--fade-out";
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.close();
      }, 10000);
    }

    return (
      <div
        ref={(ref) => (this.ref = ref)}
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

export default Notification;
