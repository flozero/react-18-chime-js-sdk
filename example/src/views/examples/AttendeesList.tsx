import { useRosterState } from "react-18-amazon-chime-js-sdk";

export const AttendeesListView = () => {
    const { roster} = useRosterState()
    const attendees = Object.values(roster);

    const attendeeItems = attendees.map(attendee => {
        const { chimeAttendeeId, name } = attendee;
        return (
            <div key={chimeAttendeeId}>
                {chimeAttendeeId}
                {name}
            </div>
        );
    });


    return (
        <>
            {attendeeItems}
        </>
    )
}