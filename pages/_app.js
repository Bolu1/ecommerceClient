// import "tailwindcss/tailwind.css"
import { useEffect } from 'react'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { PayPalScriptProvider} from '@paypal/react-paypal-js'
import { StoreProvider } from '../utils/Store'


function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    const jssStyles = document.querySelector('#jss-server-side')
    if(jssStyles){
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return(<StoreProvider>
    <PayPalScriptProvider deferLoading={true}>
     <Component {...pageProps} />
     </PayPalScriptProvider>
     </StoreProvider>)
}

export default MyApp
