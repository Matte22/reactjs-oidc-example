import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

function UserDataTable ({ userData }) {
 
  return (
    <div style={{ maxWidth: '50%'}}>
      <TableContainer component={Paper}>
        <Table size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Grants</TableCell>
              <TableCell>Added</TableCell>
              <TableCell>Last Access</TableCell>
              <TableCell>Create Collection</TableCell>
              <TableCell>Adminstrator</TableCell>
              <TableCell>userID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{userData.username}</TableCell>
              <TableCell>{userData.displayName}</TableCell>
              <TableCell>{userData.statistics.collectionGrantCount}</TableCell>
              <TableCell>
                {new Date(userData.statistics.created).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(
                  userData.statistics.lastAccess * 1000
                ).toLocaleString()}
              </TableCell>
              <TableCell>
                {userData.privileges.canCreateCollection ? <CheckIcon /> : null}
              </TableCell>
              <TableCell>
                {userData.privileges.canAdmin ? <CheckIcon /> : null}
              </TableCell>
              <TableCell>{userData.userId}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserDataTable
