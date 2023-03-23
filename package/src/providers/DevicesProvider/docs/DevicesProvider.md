# DevicesProvider

The `DevicesProvider` renders the audio and video providers, which provide state around the available and currently selected audio and video devices.

## Importing

```jsx
import { DevicesProvider } from 'react-18-amazon-chime-js-sdk';
```

## Usage

If you are using `MeetingProvider`, `DevicesProvider` is rendered by default.

```jsx
import React from 'react';
import {
  MeetingProvider,
  useVideoInputs,
} from 'react-18-amazon-chime-js-sdk';

const App = () => (
  <MeetingProvider>
    <MyChild />
  </MeetingProvider>
);

const MyChild = () => {
  const { devices, selectedDevice } = useVideoInputs();
  const items = devices.map((device) => <li>{device.label}</li>);

  return (
    <div>
      <p>Current Selected Device: {selectedDevice}</p>
      <p>Devices</p>
      <ul>{items}</ul>
    </div>
  );
};
```