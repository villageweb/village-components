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
import { Icon } from "village-components";
```

You can also import the type definitions if you're using TypeScript like so:

```typescript
import { Icon, IconProps } from "village-components";
```

For the styles import `index.css`. For the breakpoints mixin import `breakpoint.scss`.

```css
@import "~village-components/dist/index.css";
@import "~village-components/dist/breakpoints.scss";
```

## Components

- [Form](#form)
- [Icon](#icon)
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
- `form__input`, `form__input--lg`
- `form__textarea`, `form__radio`, `form__radio-checkmark`
- `form__label`, `form__field-message`, `form__validation`, `form__error`
- `form__footer`

### Icon

This component renders an svg icon retrieved from icons stored on Cloudinary.

```typescript
import { Icon } from "village-components";

<Icon
  name="cross"
  size="sm"
  className="fill--white cursor--pointer v-align--middle"
  onClick={this.closeMessage}
/>;
```

#### List of props

```typescript
IconProps = {
  name: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xlg";
  onClick?: (e?: Event) => void; // a callback to a click on the icon
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

```typescript
import { Button } from "village-components";

<Button isLoading={false} mode="primary" isContained>
  Click Me!!
</Button>;
```

#### Props

```typescript
{
  isLoading?: boolean | undefined;
  mode?: "primary" | "secondary" | "tertiary";
  isContained?: boolean;
}
```

#### Classes to override

`button`, `button--primary`, `button--secondary`, `button--tertiary`, `button--contained`,

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
