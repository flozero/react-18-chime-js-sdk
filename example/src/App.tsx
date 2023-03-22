import { MeetingProvider } from "react-18-amazon-chime-js-sdk"
import { SelectDriverView } from "./views/SelectDriver"

const root = () => {
  return (
    <MeetingProvider>
      <SelectDriverView />
    </MeetingProvider>
  )
}

export default root