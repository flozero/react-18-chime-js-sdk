export interface PromiseAttendee {
    name: string
    attendee: string
    meeting: string
}

export const getAttendee = async (
    chimeAttendeeId: string,
    externalUserId?: string
) : Promise<PromiseAttendee> => {
    console.log("ask get Attendee", chimeAttendeeId, externalUserId)
    return await Promise.resolve({
        attendee: window.attendee ? window.attendee : "",
        meeting: window.meeting ? window.meeting : "",
        name: "Florent"
    })
}