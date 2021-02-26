import React from 'react';
import { ChallengesProvider } from '../contexts/ChallengesContexts';
import '../styles/global.css';


function MyApp({ Component, pageProps }) {

  return (
    

      <Component {...pageProps} />


  )
}

export default MyApp
