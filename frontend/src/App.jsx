import './App.css'
import Router from './navigation/Router'
import Header from './components/header/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App () {
  return (
    <>
      <Header />
      <Router />
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'

      />
    </>
  )
}

export default App
