import { BrowserRouter, Route, Routes } from "react-router-dom"
import RootLayout from "./RootLayout/RootLayout"
import { Home } from "./Pages/Home/Home"
import { About } from "./Pages/About/About"
import { ContactPage } from "./Pages/ContactPage/ContactPage"
import { NoPage } from "./Pages/NoPage/NoPage"
import PostForm from "./Features/PostForm/PostForm"

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="post" element={<PostForm />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
