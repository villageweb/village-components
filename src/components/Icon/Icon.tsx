import axios from "axios";
import React from "react";
import IconContext from "./IconContext";

type IconProps = {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: (e?: Event) => void;
};

class Icon extends React.Component<IconProps> {
  static contextType = IconContext;
  state: { icon: string | null } = { icon: null };

  async componentDidMount() {
    this.fetchIcon();
  }

  async fetchIcon() {
    let icon = this.context[this.props.name];
    if (icon) {
      return this.setState({ icon });
    }

    const res = await axios.get(
      `https://res.cloudinary.com/vw/image/upload/icons/${this.props.name}.svg`
    );
    icon = res.data;

    this.context[this.props.name] = icon;

    this.setState({ icon });
  }

  async componentDidUpdate(nextProps: IconProps) {
    if (this.props.name === undefined || nextProps.name === undefined) {
      return;
    }
    if (this.props.name !== nextProps.name) {
      this.fetchIcon();
    }
  }

  render() {
    if (!this.state.icon) {
      return (
        <span
          className={`icon-placeholder ${this.props.className} ${
            this.props.size
              ? `icon-placeholder--${this.props.size}`
              : "icon-placeholder--md"
          }`}
        ></span>
      );
    }

    let __html = this.state.icon;

    if (this.props.className || this.props.size) {
      const template = document.createElement("template");
      template.innerHTML = this.state.icon;

      template.content.firstElementChild &&
        template.content.firstElementChild.classList.add(
          `icon--${this.props.size}`
        );
      if (this.props.className) {
        template.content.firstElementChild &&
          template.content.firstElementChild.classList.add(
            ...this.props.className.split(" ").filter((c) => !!c)
          );
      }

      if (template.content.firstElementChild) {
        __html = template.content.firstElementChild.outerHTML;
      }
    }

    return (
      <span
        dangerouslySetInnerHTML={{ __html }}
        onClick={this.props.onClick}
      ></span>
    );
  }
}

export { Icon, IconProps };
