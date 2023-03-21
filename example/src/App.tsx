import { ChimeProvider } from "react-18-amazon-chime-js-sdk"
import { SelectDriverView } from "./views/SelectDriver"

const root = () => {
  return (
    <ChimeProvider>
      <SelectDriverView />
    </ChimeProvider>
  )
}

export default root