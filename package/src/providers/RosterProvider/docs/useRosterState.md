# useRosterState

The `useRosterState` hook returns the state of present attendees in a meeting, it is also referred as `Roster`.

You have to provide the `MeetingManager` with a `getAttendee` function in order to get names in your roster. See the [MeetingManager](?path=/docs/providers-meetingmanager--page) for more information.

### Return Value

```javascript
{
 [AttendeeId: string]: {
   chimeAttendeeId: string;
   externalUserId?: string;
   name?: string;
 }
}
```

## Importing

```javascript
import { useRosterState } from 'react-18-amazon-chime-js-sdk';
```

## Usage

The hook depends on the `MeetingProvider` being rendered.

```jsx
import React from 'react';
import {
  MeetingProvider,
  useRosterState,
} from 'react-18-amazon-chime-js-sdk';

const App = () => (
  <MeetingProvider>
    <MyChild />
  </MeetingProvider>
);

const MyChild = () => {
  const { roster } = useRosterState();
  const attendees = Object.values(roster);

  const attendeeItems = attendees.map(attendee => {
    const { chimeAttendeeId, name } = attendee;
    return (
      <div key={chimeAttendeeId} attendeeId={chimeAttendeeId}>
        {chimeAttendeeId}
        {name}
      </div>
    );
  });

  return (
    {attendeeItems}
  );
};
```

### Dependencies

- `MeetingProvider`
