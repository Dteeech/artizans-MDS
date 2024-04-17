import './App.css'
import Router from './navigation/Router'
import Header from './components/header/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/authContext'
import { NextUIProvider } from '@nextui-org/react'
function App () {
  return (
    <>
      <NextUIProvider>
        <AuthProvider>
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
        </AuthProvider>
      </NextUIProvider>
    </>
  )
}

export default App
