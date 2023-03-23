# useMeetingEvent

The `useMeetingEvent` hook returns a meeting event provided by the `MeetingEventProvider`.
Please note that the `MeetingEventProvider` provides only the latest meeting event posted, therefore older events will be overridden when a new event is received.

### Return Value

Return value will be `undefined` unless any Amazon Chime SDK meeting event is received.
> Note: [EventName](https://aws.github.io/amazon-chime-sdk-js/globals.html#eventname) and [EventAttributes](https://aws.github.io/amazon-chime-sdk-js/interfaces/eventattributes.html) are types from [Amazon Chime SDK for JavaScript](https://github.com/aws/amazon-chime-sdk-js).

```typescript
{
  name: EventName;
  attributes: EventAttributes;
}
```

## Importing

```javascript
import { useMeetingEvent } from 'react-18-amazon-chime-js-sdk';
```

## Usage

This hook depends on the `MeetingEventProvider`.

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
