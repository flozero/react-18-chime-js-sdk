<Meta title="SDK Providers/RosterProvider" />

# RosterProvider

The `RosterProvider` provides the state of the roster. You must provide the `MeetingManager` with a `getAttendee` function in order to get names. Additional data returned from the `getAttendee` function will be available through the `RosterProvider`.

### State

```javascript
{
 [AttendeeId: string]: {
   chimeAttendeeId: string;
   externalUserId?: string;
   name?: string;
 }
}
```
You can access the state by using the [useRosterState](/docs/sdk-hooks-userosterstate--page) hook.

## Usage

If you are using `MeetingProvider`, the `RosterProvider` is rendered by default.

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
