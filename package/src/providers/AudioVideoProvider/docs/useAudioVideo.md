# useAudioVideo

The `useAudioVideo` hook returns the [AudioVideo instance](https://aws.github.io/amazon-chime-sdk-js/interfaces/audiovideofacade.html) of a meeting session.

### Return Value

```javascript
AudioVideoFacade | null;
```

## Importing

```javascript
import { useAudioVideo } from 'react-18-amazon-chime-js-sdk';
```

## Usage

The hook depends on the `AudioVideoProvider`. If you are using `MeetingProvider`, it is rendered by default.

```jsx
import React from 'react';
import { MeetingProvider, useAudioVideo } from 'react-18-amazon-chime-js-sdk';

const App = () => (
  <MeetingProvider>
    <MyChild />
  </MeetingProvider>
);


const MyChild = () => {
  // When a meeting session is started, you'll have access to the audioVideo instance
  const audioVideo = useAudioVideo();

  useEffect(() => {
    if (audioVideo) {
      audioVideo.addObserver(...);
    }
  }, [audioVideo])
  ...
}
```

### Dependencies

- `AudioVideoProvider`
