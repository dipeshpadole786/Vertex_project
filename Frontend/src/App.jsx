
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Askquetion } from './Pages/Askquetion'
import { Home } from './Pages/Home'
import { Login } from './Pages/Login'
import { Notification } from './Pages/Notification'
import { Profile } from './Pages/Profile'
import { Question } from './Pages/Question'
import { Signup } from './Pages/Signup'
import { Footer } from './Components/Footer'
import { Header } from './Components/Header'


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
    path: "/add-quetion",
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
        <Home />
        <Footer />
      </div>
    )
  },
  {
    path: "/signup",
    element: (
      <div>
        <Header />
        <Home />
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