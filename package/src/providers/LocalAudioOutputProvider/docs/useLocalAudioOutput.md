# useLocalAudioOutput

The `useLocalAudioOutput` hook returns the status of the user's output audio, and a function to mute/unmute the audio output.

** Note ** - This hook is for speaker volume, not the microphone/audio input volume.

### Return Value

```javascript
{
  // Whether or not the user's speaker is playing audio
  isAudioOn: boolean;

  // A function to turn on/off the audio output
  toggleAudio: () => void;
}
```

## Importing

```javascript
import { useLocalAudioOutput } from 'react-18-amazon-chime-js-sdk';
```

## Usage

The hook depends on the `LocalAudioOutputProvider`. If you are using `MeetingProvider`, it is rendered by default.

```jsx
import React from 'react';
import {
  MeetingProvider,
  useLocalAudioOutput
} from 'react-18-amazon-chime-js-sdk';

const App = () => (
  <MeetingProvider>
    <MyChild />
  </MeetingProvider>
);

const MyChild = () => {
  const { isAudioOn } = useLocalAudioOutput();

  return (
    <div>
      {isAudioOn ? 'Meeting audio output is on' : 'Meeting audio output is off'}
    </div>
  );
};
```
