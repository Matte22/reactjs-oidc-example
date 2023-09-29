import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useAuth } from 'oidc-react'

// example code displaying how our access token config will work and flow
function ManageToken () {

  // calling authenicator from oidc-react
  const auth = useAuth()
  // calling user manager to get access to events
  const userManager = auth.userManager

  // getting access token, id token, refresh token, and expiration time
  /*
    We don't need to use the useState hook here as we are deriving these values directly from the 'auth' object.
  This 'auth' object is provided by a custom 'useAuth' hook from oidc-react.
  'useAuth' leverages the power a useContext hook to access our authentication context.
  The authentication context is state managed by the AuthProvider component, 
  wrapped within the AuthProvider component higher in our component tree.
  Since 'useAuth' manages its state and triggers a re-render for its consumers when it changes,
  our component always presents the most up-to-date authentication state to our users.

  useContext docs: https://react.dev/reference/react/useContext
  */
  const accessToken = auth.userData?.access_token
  const idToken = auth.userData?.id_token
  const refreshToken = auth.userData?.refresh_token
  const expiresAt = auth.userData?.expires_at

  // calculate the expiration date/time
  /*
  useMemo is a hook in React that allows you to memoize expensive 
  calculations so that they're not re-computed on every render,
  but only when one of its dependencies (expiresAt) changes.

  Creating a Date object is cheap but,
  it's still an operation that's being performed unnecessarily when expiresAt hasn't changed.
  Over time and with more expensive operations, these small inefficiencies can add up.

  usemMemo docs: https://react.dev/reference/react/useMemo
  */
  const expDate = useMemo(() => {
    return expiresAt ? new Date(expiresAt * 1000) : null
  }, [expiresAt])

  // calculating remaining time until token expires
  /*
    Here, calculateRemainingTime is a function that calculates the time remaining until expDate. 
    Without useCallback, every time the ManageToken component renders, a new reference for calculateRemainingTime would be created, 
    even if the logic inside the function hasn't changed.

    By using useCallback:
    The function reference remains the same across re-renders unless expDate changes.
    It prevents unnecessary re-renders or effects 
    (for instance, in the useEffect where calculateRemainingTime is used as a dependency) 
    because the function's reference remains stable.
    tldr: "Only give me a new function if expDate has changed; otherwise, use the old one.
  */
  const calculateRemainingTime = useCallback(() => {
    if (expDate) {
      return Math.max(Math.floor((expDate.getTime() - Date.now()) / 1000), 0)
    }
    return 0
  }, [expDate])

  /*
   * The useState hook returns an array with two elements
   * we are intializing the remaining time to the calculated remaining time so that it will have an initial value
   * we use 'useState' hook to let react know whenever
   * remainingTime changes, it should re-render the component and reflect latest value
   * */
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime)

  /* When the component is first rendered, the code inside the useEffect 
    (but not the cleanup function) will run.
    If expDate changes during the component's lifecycle, (we got a new token)
    cleanup function will run first (clearing the previous interval), 
    and then the code inside the useEffect will run again (setting a new interval).
    When the component is about to be removed from the DOM or unmounted,
    the cleanup function will run to clear the interval.
    When setRemainingTime is called, the component will re-render because it uses a 
    useState hook and the value of remainingTime will be updated.
*/
  useEffect(() => {
    // Update every second
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime)
    }, 1000)

    // Clear interval when component unmounts
    return () => clearInterval(intervalId)
  }, [expDate, calculateRemainingTime])

  // event handler for token expiring
  const handleTokenExpiring = () => {
    console.log('Access token expiring event fired')
    // console.log(auth.userData);
  }

  // adding event listener for token expiring from oidc-react
  useEffect(() => {
    console.log("in useEffect")
    if (userManager) {
      userManager.events.addAccessTokenExpiring(handleTokenExpiring)

      // Remove event listener with the exact function that was added
      return () => {
        userManager.events.removeAccessTokenExpiring(handleTokenExpiring)
      }
    }
  }, [userManager])

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
    return <div>Error: Authentication data not available.</div>
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
