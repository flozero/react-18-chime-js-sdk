import { ChimeProvider } from "./modules/chime/provider"
import { SelectDriverView } from "./views/SelectDriver"

const root = () => {
  return (
    <ChimeProvider>
      <SelectDriverView />
    </ChimeProvider>
  )
}

export default root