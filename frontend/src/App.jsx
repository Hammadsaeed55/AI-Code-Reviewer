import Home from "./pages/Home"
import {Routes, Route} from "react-router-dom"
import History from "./pages/History"

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/history" element={<History/>}/>
    </Routes>
  )
}

export default App
