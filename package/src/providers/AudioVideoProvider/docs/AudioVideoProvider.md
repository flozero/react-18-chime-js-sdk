# AudioVideoProvider

The `AudioVideoProvider` provides [AudioVideo instance](https://aws.github.io/amazon-chime-sdk-js/interfaces/audiovideofacade.html) of the meeting session to your application.

This instance is used internally by our components and hooks, but is also available if you need to set up your own observers to the Chime JS SDK.

## Usage

If you are using `MeetingProvider`, the `AudioVideoProvider` is rendered by default and you don't need to do anything else.

If necessary, you can access the audioVideo instance directly by the `useAudioVideo` hook.

```jsx
import React from 'react';
import { MeetingProvider, useAudioVideo } from 'amazon-chime-sdk-component-library-react';

const App = () => (
  <MeetingProvider>
    <MyApp>
      <MyChild />
    </MyApp>
  </MeetingProvider>
);


const MyChild = () => {
  // When a meeting session is started, you'll have access to the audioVideo instance
  const audioVideo = useAudioVideo();

  ...
}
```
