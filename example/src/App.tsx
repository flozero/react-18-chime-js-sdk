import { MeetingProvider } from "react-18-amazon-chime-js-sdk"
import { HomeView } from "./views/Home"

const root = () => {
  return (
    <MeetingProvider>
      <HomeView />
    </MeetingProvider>
  )
}

export default root