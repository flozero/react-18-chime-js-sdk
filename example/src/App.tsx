import { AppThemeProvider, MeetingProvider } from "react-18-amazon-chime-js-sdk"
import { HomeView } from "./views/Home"

const root = () => {
  return (
    <>
      <AppThemeProvider>
        <MeetingProvider>
            <HomeView />
        </MeetingProvider>
      </AppThemeProvider>
    </>
  )
}

export default root