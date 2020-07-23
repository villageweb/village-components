import React from "react";

export type IconProps = {
  icons?: {};
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  fetchIcon: (name: string) => Promise<string>;
  saveIcon?: (name: string, svg: string) => void;
  onClick?: () => void;
};

class SvgIcon extends React.Component<IconProps> {
  state: { icon: string | null } = { icon: null };

  async componentDidMount() {
    this.getIcon();
  }

  async getIcon() {
    let icon;
    if (this.props.icons) {
      icon = this.props.icons[this.props.name];
      if (icon) {
        return this.setState({ icon });
      }
    }

    icon = await this.props.fetchIcon(this.props.name);
    this.props.saveIcon && this.props.saveIcon(this.props.name, icon);

    this.setState({ icon });
  }

  async componentDidUpdate(nextProps: IconProps) {
    if (this.props.name === undefined || nextProps.name === undefined) {
      return;
    }
    if (this.props.name !== nextProps.name) {
      const icon = await this.props.fetchIcon(this.props.name);
      this.setState({ icon });
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

export default SvgIcon;
