import React from 'react'
import { AuthProvider } from 'oidc-react'
import ManageToken from './ManageToken'
import UserData from './UserData'

// main app component
function App () {
  return (
    <div>
      <AuthProvider
        authority={process.env.REACT_APP_AUTH_CONNECT_URL}
        clientId={process.env.REACT_APP_CLIENT_ID}
        redirectUri={process.env.REACT_APP_REDIRECT_URI}
        scope={process.env.REACT_APP_AUTH_SCOPE}
        responseType={process.env.REACT_APP_RESPONSE_TYPE}
        postLogoutRedirectUri={process.env.REACT_APP_REDIRECT_URI}
        automaticSilentRenew={true}
      >
        <ManageToken />
        <UserData />
      </AuthProvider>
    </div>
  )
}

export default App

// DOCs for OIDC-React: https://www.npmjs.com/package/oidc-react
