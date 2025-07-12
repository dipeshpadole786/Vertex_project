
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Login } from './Pages/Login'
import { Notification } from './Pages/Notification'
import { Profile } from './Pages/Profile'
import { Signup } from './Pages/Signup'
import { Footer } from './Components/Footer'
import { Header } from './Components/Header'
import { AskQuestion } from './Pages/Askquetion'
import { AnswerPage } from './Pages/AnswerPage'


const router = createBrowserRouter([
  {
    path: "/home",
    element: (
      <div>
        <Header />
        <Home />
        <Footer />
      </div>
    )
  },

  {
    path: "/login",
    element: (
      <div>
        <Header />
        <Login />
        <Footer />
      </div>
    )
  },
  {
    path: "/register",
    element: (
      <div>
        <Header />
        <Signup />
        <Footer />
      </div>
    )
  },
  {
    path: "/user/:username",
    element: (
      <div>
        <Header />
        <Profile />
        <Footer />
      </div>
    )
  },
  {
    path: "/question/:id",
    element: (
      <div>
        <Header />
        <AnswerPage />
        <Footer />
      </div>
    )
  },
  {
    path: "/add-question",
    element: (
      <div>
        <Header />
        <AskQuestion />
        <Footer />
      </div>
    )
  }
])
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;