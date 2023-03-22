# MeetingManager

The `MeetingManager` is a class that helps integration with the SDK. It is tied to the `MeetingProvider` and is primarily responsible for joining, starting, and leaving your meeting.

You can access the `MeetingManager` instance with the `useMeetingManager` hook.

## Interface

### `meetingManager.join`

`meetingManager.join` creates a `MeetingSession` using the passed `MeetingSessionConfiguration` and `options`. `options` use `MeetingManagerJoinOptions` type interface.
`join` will attempt to select default devices for the user.

```typescript
(meetingSessionConfiguration: MeetingSessionConfiguration, options?: MeetingManagerJoinOptions) => Promise<void>
```

Let's take a deeper look at the interface of the `join` method params.

##### `MeetingSessionConfiguration`

```typescript
// Use the `MeetingSessionConfiguration`.
// The default properties of the `MeetingSessionConfiguration` can be updated to customize the meeting as per the builder's preference.
// Reference `MeetingSessionConfiguration` properties in Amazon Chime SDK for JavaScript: https://aws.github.io/amazon-chime-sdk-js/classes/meetingsessionconfiguration.html
meetingSessionConfiguration: MeetingSessionConfiguration;
```

##### `MeetingManagerJoinOptions`

```typescript
options?: {
  // The kind of device for which the browser requests permission.
  // Or override the default device label trigger in the Amazon Chime SDK for JavaScript.
  deviceLabels?: DeviceLabels | DeviceLabelTrigger;

  // Override the default event controller in the Amazon Chime SDK for JavaScript.
  eventController?: EventController;

  // If you want to enable Amazon Voice Focus feature, you should enable Web Audio for the meeting and pass the `enableWebAudio` prop with value set to `true`.
  // By default, `enableWebAudio` is `false`.
  enableWebAudio?: boolean;

  // The `ActiveSpeakerPolicy` object that you want to be used in the meeting session.
  // For more information on `ActiveSpeakerPolicy`, check Amazon Chime SDK for JavaScript ActiveSpeakerPolicy (https://aws.github.io/amazon-chime-sdk-js/interfaces/activespeakerpolicy.html).
  activeSpeakerPolicy?: ActiveSpeakerPolicy;
}
```

### `meetingManager.start`

Starts the meeting session so that attendees can receive audio and video from the meeting. This must be called after calling `join`.

```javascript
() => Promise<void>
```

### `meetingManager.leave`

Stops the meeting session and performs cleanup. This should be called anytime a user needs to leave a meeting.

```javascript
() => Promise<void>
```

### `meetingManager.getAttendee`

This method is expected to be supplied by the developer. You may call this function with the Chime user ID and external user ID anytime an attendee joins the meeting, and expect to be resolved with an object that has a `name` property that will be used for video nameplates and roster state. We also add support for optional keys, so you can also pass any other data except `name`.

For example - you may want to fetch the attendee from the database, or get the name from some local application state. This is up to the developer.

```javascript
(
  chimeAttendeeId: string,
  externalUserId?: string
) => Promise<any>

```
## Usage

`MeetingProvider` must be rendered somewhere higher in the tree. Call `useMeetingManager` hook to get the `MeetingManager` object.

```jsx
import React from 'react';
import { MeetingProvider, useMeetingManager } from 'react-18-amazon-chime-js-sdk';

const App = () => (
  <MeetingProvider>
    <MyApp />
  </MeetingProvider>
);

const MyApp = () => {
  const meetingManager = useMeetingManager();

  ...
}
```

## Usage Examples

### `MeetingManager` instance is created internally in the `MeetingProvider` and can be retrieved using `useMeetingManager` hook.

```jsx
import {
  MeetingProvider,
  useMeetingManager,
} from 'react-18-amazon-chime-js-sdk';

const Root = () => (
  <MeetingProvider>
    <MyApp />
  </MeetingProvider>
);

const MyApp = () => {
  const meetingManager = useMeetingManager();

  useEffect(() => {
    meetingManager.getAttendee = async (
      chimeAttendeeId: string,
      externalUserId?: string
    ) => {
      const response = await fetch('/my-attendees-endpoint');
      const user = await response.json();

      return {
        name: user.name,
      };
    };
  }, []);
};
```

### Update the `MeetingSessionConfiguration` properties being passed to the `join` method

You can update the properties of `MeetingSessionConfiguration`. `MeetingSessionConfiguration` is a class that allows the users to configure the meeting session.

The class contains several properties like `videoUplinkBandwidthPolicy`, `videoDownlinkBandwidthPolicy`, `attendeePresenceTimeoutMs` etc. You can learn more about the available properties at [MeetingSessionConfiguration](https://aws.github.io/amazon-chime-sdk-js/classes/meetingsessionconfiguration.html)
in the SDK documentation.

The following code example shows a `MeetingSessionConfiguration` where the default value of the properties are overridden to cusomize the meeting session.

```jsx
import { useMeetingManager } from 'react-18-amazon-chime-js-sdk';
import { MeetingSessionConfiguration, VideoPriorityBasedPolicyConfig } from 'amazon-chime-sdk-js';

const MyApp = () => {
  const meetingManager = useMeetingManager();

  const joinMeeting = async () => {
    // Fetch the meeting and attendee data from your server application
    const response = await fetch('/my-server');
    const data = await response.json();

    // Initalize the `MeetingSessionConfiguration`
    const meetingSessionConfiguration = new MeetingSessionConfiguration(data.Meeting, data.Attendee);

    // Update the `MeetingSessionConfiguration` properties
    meetingSessionConfiguration.attendeePresenceTimeoutMs = 120;
    meetingSessionConfiguration.videoDownlinkBandwidthPolicy = new VideoPriorityBasedPolicy(
      logger,
      VideoPriorityBasedPolicyConfig.UnstableNetworkPreset,
    );

    // Create a `MeetingSession` using `join()` function with the modified `MeetingSessionConfiguration`
    await meetingManager.join(
      meetingSessionConfiguration
    );

    // At this point you could let users setup their devices, or by default
    // the SDK will select the first device in the list for the kind indicated
    // by `deviceLabels` (the default value is DeviceLabels.AudioAndVideo)
    ...

    // Start the `MeetingSession` to join the meeting
    await meetingManager.start();
  };

  return <button onClick={joinMeeting}>Join</button>;
};
```
### Opt-out of client event ingestion.

The Amazon Chime SDK for JavaScript sends meeting events to the Amazon Chime backend to analyze meeting health trends or identify common failures.
This helps to improve your meeting experience. For more information, check the [client event ingestion guide](https://aws.github.io/amazon-chime-sdk-js/modules/clientevent_ingestion.html) in the Amazon Chime SDK for JavaScript guides.

To opt-out of event ingestion from the Amazon Chime SDK for JavaScript, provide a `DefaultEventController` with a `NoOpEventReporter` as the `eventReporter` while joining the meeting.

```jsx
import React from 'react';
import {
  NoOpEventReporter,
  DefaultEventController,
  DefaultMeetingSessionConfiguration,
} from 'amazon-chime-sdk-js';
import { MeetingProvider } from 'react-18-amazon-chime-js-sdk';

const MeetingForm = () => {
  const meetingManager = useMeetingManager();

  const handleJoinMeeting = async () => {
    const response = await fetch('/my-meetings-endpoint');
    const data = await response.json();

    const meetingSessionConfiguration = new MeetingSessionConfiguration(
      data.Meeting,
      data.Attendee
    );

    const eventController = new DefaultEventController(
      meetingSessionConfiguration,
      new ConsoleLogger('SDK', LogLevel.WARN),
      new NoOpEventReporter()
    );

    const options = {
      eventController,
    };

    await meetingManager.join(meetingSessionConfiguration, options);
  };
  return <PrimaryButton label="Continue" onClick={handleJoinMeeting} />;
};

const App = () => (
  <MeetingProvider>
    <MeetingForm />
  </MeetingProvider>
);
```