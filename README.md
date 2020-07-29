# Village Web Components

Common React components used on Village Web

## How to use

Clone this repo to your local computer, then run:

- `npm install && npm run build`
- To make this component available to other projects on your local computer, run `npm link` or `yarn link`.
- Then go to the project where you want to use this package and run `npm/ yarn link village-components`.

Finally, to fix the multiple copies of React bug that shows up with linked React packages:

- navigate to the root of the `village-components` package
- run `npm link ../path/to/your/parent/project/node_modules/react`

You can now import `village-components` as a normal package installed from npm like so:

```
import SvgIcon from 'village-components'
```

You can also import the type definitions if you're using TypeScript like so:

```
import SvgIcon, { SvgIconProps } from 'village-components'
```

## Components

- [SvgIcon](#svgicon)
- [Notification](#notification)
- [Button](#button)

### SvgIcon

This component renders an svg icon retrieved from some external source.

```typescript
import SvgIcon from "village-components";
```

The consumer has to pass in a function taking in a name and returning a promise that eventually returns the actual svg markup as a string.

```jsx
render() {
    const fetchIcon = async (name) => {
      const res = await axios.get(
        `https://res.cloudinary.com/vw/image/upload/icons/${name}.svg`
      );
      return res.data;
    };
    return <SvgIcon fetchIcon={fetchIcon} />;
  }
```

Optionally, a `saveIcon` function can be passed in to once retrieval is done for caching into some kind of store. For this case you ideally want to wrap `SvgIcon` in a container component that hooks onto a store. Example with react-redux below. Code below is all you'd need to code effectively with this approach.

// your icon component that you will use everywhere.

```typescript
...
import { saveIcon } from "../store/ui";

class Icon extends React.Component<SvgIconProps> {
  render() {
    const fetchIcon = async (name) => {
      const res = await axios.get(
        `https://res.cloudinary.com/vw/image/upload/icons/${name}.svg`
      );
      return res.data;
    };
    return <SvgIcon {...this.props} fetchIcon={fetchIcon} />;
  }
}

const mapStateToProps = (state) => ({ ...state.ui });

export default connect(mapStateToProps, { saveIcon })(Icon); // saveIcon passed in as a prop to SvgIcon

```

#### List of props

```typescript
SvgIconProps = {
  icons?: {}; // a dictionary with icon names as keys and svg markup as values, used to lookup icons instead of fetching over the network or another expensive operation
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  fetchIcon: (name: string) => Promise<string>;
  saveIcon?: (name: string, svg: string) => void;
  onClick?: () => void; // a callback to a click on the icon
};
```

### Notification

This component renders a notification on the top right of the screen and in the center for mobile.

```typescript
import Notification from "village-components";
```

```typescript
<Notification
  message="This is a test message"
  type="success"
  persist={true}
  onClose={() => console.log("Notification closed")}
/>
```

#### List of props

```typescript
NotificationProps = {
  message: string;
  type: "success" | "fail";
  persist: boolean;
  onClose: () => void;
};
```

### Button
