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

```typescript
import { SvgIcon } from "village-components";
```

You can also import the type definitions if you're using TypeScript like so:

```typescript
import { SvgIcon, SvgIconProps } from "village-components";
```

## Components

- [Form](#form)
- [SvgIcon](#svgicon)
- [Notification](#notification)
- [Button](#button)

## Functions and Utilities

- [Redux Loader Reducer](#redux-loader-reducer)
- [isDeviceSize](#isdevicesize)

### Form

An extensive (and highly opinionated) form component. For configuration and example usage see [`FormConfig`](https://github.com/villageweb/village-components/blob/master/src/components/Form/form-config.ts). For styling the fields and button there are a couple of [classes to override](#css-classes-to-override).

```typescript
import { Form } from "village-components";

<Form
  config={loginForm}
  submit={(data) =>
    this.props.login({ username: data.email, password: data.password })
  }
  submitButtonText="Log in"
  error={this.props.loginError}
  footerContent={this.signUpOption}
  isLoading={this.props.isLoading}
/>;
```

#### css classes to override

- `form`
- `button`, `button--primary`
- `form__input`, `form__input--bg`
- `form__textarea`, `form__radio`, `form__radio-checkmark`
- `form__label`, `form__field-message`, `form__validation`, `form__error`
- `form__footer`

### SvgIcon

This component renders an svg icon retrieved from some external source.

```typescript
import { SvgIcon } from "village-components";
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

Optionally, a `saveIcon` function can be passed in to once retrieval is done for caching into some kind of store. *NB* this is recommended since on every render a fetch of the icon will be executed. For this case you ideally want to wrap `SvgIcon` in a container component that hooks onto a store. Example with react-redux below. Code below is all you'd need to code effectively with this approach.

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
import { Notification } from "village-components";
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
  type?: "success" | "fail";
  persist?: boolean;
  onClose?: () => void;
};
```

### Button

### Redux Loader Reducer

Provides a reducer for actions that might require a loader/ spinner because they are async e.g calls to your backend. Dispatch `startAsync` before your long running code and the reducer adds your action into state. Then dispatch `stopAsync` once it is done, the action is then removed from state. You can use this in your components to show a loader while your action is stored as state managed by the `reduxLoaderReducer`.

```typescript
import { reduxLoaderReducer } from "village-components";

const rootReducer = combineReducers({
  common,
  orders,
  loader: reduxLoaderReducer,
});
```

```typescript
import { startAsync, stopAsync } from "village-components";

dispatch(startAsync(LOGIN));
// your code to the server.
// any component listening to state from our reducer knows this is in progress if the LOGIN action is part of reduxLoaderReducer's state array
dispatch(stopAsync(LOGIN));
```

##### shape of the state managed by this reducer

```typescript
{
  action: string;
  ...params: any
}[];

// You can pass in an optional second argument that has to be an object that will eventually get spread onto the object in state. This is useful when there might be multiple place where the loader could land and you want to match a specific one.

// e.g
// state => [{ action: LOGIN }, { action: DELETE_ITEM, id: 3 }];
```

### isDeviceSize

Returns a boolean that determines whether the window width is one of `SMALL` (<= 425px), `MEDIUM` (<= 768px) or `LARGE` (> 768px).

```typescript
const isMobile: boolean = isDeviceSize(DeviceSize.SMALL);
```

`DeviceSize` is the enumeration of the 3 device sizes.
