# MeetingProvider

The `MeetingProvider` is the **root provider** for building a realtime meeting application. It is responsible for rendering out a series of providers and providing a `MeetingManager` class that helps integration with the Chime JavaScript SDK. 
The `MeetingManager` has APIs for joining, starting, and leaving a meeting.

You can access the `MeetingManager` instance with the `useMeetingManager` hook.

## Importing

```jsx
import { MeetingProvider } from 'react-18-amazon-chime-js-sdk';
```
## Usage

1. Render the `MeetingProvider` near the root of your application.

```jsx
import React from 'react';
import { MeetingProvider } from 'react-18-amazon-chime-js-sdk';

const App = () => (
  <MeetingProvider>
    <MyApp />
  </MeetingProvider>
);
```