import React, { useEffect, useState } from 'react'
import { useAuth } from 'oidc-react'

// example code displaying how our access token config will work and flow 
function ManageToken () {
  // calling authenicator
  const auth = useAuth()

  // getting access token, id token, refresh token, and expiration time
  const accessToken = auth.userData?.access_token
  const idToken = auth.userData?.id_token
  const refreshToken = auth.userData?.refresh_token
  const expiresIn = auth.userData?.expires_in
  // calculate the expiration date/time
  const expDate = auth.userData?.expires_at
    ? new Date(auth.userData.expires_at * 1000)
    : null

  // setting remaining time
  const [remainingTime, setRemainingTime] = useState(expiresIn)

  // reducing remaining time by 1 second every second
  useEffect(() => {
    // Set initial value
    setRemainingTime(expiresIn)

    // Update every second
    const intervalId = setInterval(() => {
      setRemainingTime(prev => (prev > 0 ? prev - 1 : 0)); // Prevent negative values
    }, 1000)

    // Clear interval when component unmounts
    return () => clearInterval(intervalId)
  }, [expiresIn])

  // event handler for token expiring
  const handleTokenExpiring = () => {
    console.log('Access token expiring event fired');
    console.log(auth.userData);
  };

  // adding event listener for token expiring from oidc-react 
  useEffect(() => {
    const userManager = auth.userManager;

    if (userManager) {
      userManager.events.addAccessTokenExpiring(handleTokenExpiring);

      // Remove event listener with the exact function that was added
      return () => {
        userManager.events.removeAccessTokenExpiring(handleTokenExpiring);
      };
    }
  }, [auth, handleTokenExpiring]);

  // formatting token to be shorter and easier to read
  const formatToken = token => {
    if (!token) return null
    const start = token.substring(0, 8)
    const end = token.substring(token.length - 8)
    return `${start}...${end}`
  }

  // error handling for if auth is null/undefined or userData doesn't exist
  if (!auth || !auth.userData) {
    // Handle the situation where auth is null/undefined or userData doesn't exist
    return <div>Error: Authentication data not available.</div>;
  }
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Hello, {auth.userData?.profile?.name}</h3>
      <div
        style={{
          border: '1px solid #e1e1e1',
          padding: '10px',
          borderRadius: '5px'
        }}
      >
        <h4>Access Token (shortend)</h4>
        <p>{formatToken(accessToken)}</p>

        <h4>ID Token (shortend)</h4>
        <p>{formatToken(idToken)}</p>

        <h4>Refresh Token (shortend)</h4>
        <p>{formatToken(refreshToken)}</p>

        <h4>Token Expires In ~ </h4>
        <p>{remainingTime} seconds</p>

        <h4>Expiration Date/Time</h4>
        <p>{expDate?.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default ManageToken
