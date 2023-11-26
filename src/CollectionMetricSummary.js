import { useState } from 'react'
import axios from 'axios'
import { useAuth } from 'oidc-react'
import MUICollectionMetricAssetDataTable from './MUIAssetsMetricsTable'
import VanillaCollectionMetricAssetDataTable from './VanillaAssetsMetricsTable'
import MUICollectionMetricAssetDataGrid from './MUIDataGrid'

/**
 * Fetches user data from the API using the provided token.
 * @param {string} token - The access token to authenticate the request.
 * @returns {Promise} A Promise that resolves with the user data.
 */
const fetchAssetMetrics = async token => {
  const API_BASE = process.env.REACT_APP_API_BASE
  const API_USER = process.env.REACT_APP_API_USER

  const API_USER_URL = `${API_BASE}${API_USER}`

  const temp = "http://localhost:54000/api/collections/21/metrics/summary/asset"

  return await axios.get(temp, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    params: {
      format: 'json'
    }
  })
}

// example api use with oidc-react access tokens and axios
export default function CollectionMetricSummary () {
  // calling authenicator from oidc-react
  const auth = useAuth()

  const [assetData, setAssetData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // fetching from /api/user endpoint with access token from oidc-react 'auth'
  const handleFetchAssetData = async () => {
    if (!auth || !auth.userData) {
      setError(new Error('Authentication data not available.'))
      return
    }
    setAssetData(null)
    setError(null)
    try {
      setLoading(true)
      const token = auth.userData.access_token
      const response = await fetchAssetMetrics(token)
      setAssetData(response.data)
    } catch (err) {
      console.error('There was an error fetching the user data', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  // hiding user data
  const handleHideAssetData = () => {
    setAssetData(null)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h2>/api/collections/collectionID/metrics/summary/asset API Example</h2>
      {/* fetch from api */}
      <button onClick={handleFetchAssetData}>Fetch Data</button>

      {/* if userData is not null show data and give ability to clear data  */}
      {assetData && (
        <>
          <button onClick={handleHideAssetData}>Hide Data</button>
          {/* <UserDataTable userData={userData} /> */}
        
          <MUICollectionMetricAssetDataTable assetData={assetData} />
          <VanillaCollectionMetricAssetDataTable assetData={assetData} />
          <MUICollectionMetricAssetDataGrid assetData={assetData} />
        </>
      )}
      {/* loading between request  */}
      {loading && <p>Loading...</p>}
    </div>
  )
}
