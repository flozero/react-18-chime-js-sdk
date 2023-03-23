# MeetingEventProvider

The `MeetingEventProvider` is responsible for providing the latest meeting event posted by Amazon Chime SDK for JavaScript.
Please note that the `MeetingEventProvider` provides only the latest meeting event posted, therefore older events will be overridden when a new event is received.
For more information on meeting events, please check [Amazon Chime SDK meeting events guide](https://aws.github.io/amazon-chime-sdk-js/modules/meetingevents.html).

You can access the provided meeting event with the [useMeetingEvent](/story/sdk-hooks-usemeetingevent--page) hook.

## Importing

```jsx
import { MeetingEventProvider } from 'react-18-amazon-chime-js-sdk';
```

## Usage

If you are using `MeetingProvider`, the `MeetingEventProvider` is rendered by default and you don't need to do anything else.

```jsx
import React from 'react';
import { MeetingProvider, useMeetingEvent } from 'react-18-amazon-chime-js-sdk';

const App = () => (
  <MeetingProvider>
    <MeetingEventReceiver />
  </MeetingProvider>
);

const MeetingEventReceiver = () => {
  const meetingEvent = useMeetingEvent();
  console.log('Received a meeting event', meetingEvent);
  return null;
};
```

### Dependencies
- [MeetingProvider](/story/sdk-providers-meetingprovider--page)