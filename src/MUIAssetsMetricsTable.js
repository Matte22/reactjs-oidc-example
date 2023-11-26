import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  LinearProgress
} from '@mui/material'

export default function MUICollectionMetricAssetDataTable ({ assetData }) {
  console.log(assetData)

  const cellStyle = {
    whiteSpace: 'nowrap',
    padding: '2px 6px',
    fontSize: '12px' // Reduce the default padding
  }

  const rowStyle = {
    height: 'auto'
  }

  const progressCellStyle = {
    padding: '2px 3px',
    position: 'relative'
  }

  return (
    <div style={{ maxWidth: '75%' }}>
      MUI table:
      <TableContainer component={Paper}>
        <Table style={{ width: '100%' }}>
          <TableHead>
            <TableRow style={rowStyle}>
              <TableCell style={cellStyle}>Asset</TableCell>
              <TableCell style={cellStyle}>Labels</TableCell>
              <TableCell style={cellStyle}>STIGs</TableCell>
              <TableCell style={cellStyle}>Checks</TableCell>
              <TableCell style={cellStyle}>Oldest</TableCell>
              <TableCell style={cellStyle}>Newest</TableCell>
              <TableCell style={cellStyle}>Updated</TableCell>
              <TableCell style={cellStyle}>Assessed</TableCell>
              <TableCell style={cellStyle}>Submitted</TableCell>
              <TableCell style={cellStyle}>Accepted</TableCell>
              <TableCell style={cellStyle}>Rejected</TableCell>
              <TableCell style={cellStyle}>Cat3</TableCell>
              <TableCell style={cellStyle}>Cat2</TableCell>
              <TableCell style={cellStyle}>Cat1</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assetData.map(asset => (
              <TableRow style={rowStyle}>
                <TableCell style={cellStyle}>{asset.name}</TableCell>
                <TableCell style={cellStyle}>
                  {asset.labels.map(label => (
                    <>{label.name} </>
                  ))}
                </TableCell>
                <TableCell style={cellStyle}>
                  {asset.benchmarkIds.length}
                </TableCell>
                <TableCell style={cellStyle}>
                  {asset.metrics.assessments}
                </TableCell>
                <TableCell style={cellStyle}>
                  {asset.metrics.minTs
                    ? daysPassedSince(asset.metrics.minTs)
                    : '-'}
                </TableCell>
                <TableCell style={cellStyle}>
                  {' '}
                  {asset.metrics.minTs
                    ? daysPassedSince(asset.metrics.maxTs)
                    : '-'}
                </TableCell>
                <TableCell style={cellStyle}>
                  {' '}
                  {asset.metrics.minTs
                    ? daysPassedSince(asset.metrics.maxTouchTs)
                    : '-'}
                </TableCell>
                <TableCell style={progressCellStyle}>
                  <ProgressBar
                    dividend={asset.metrics.assessed}
                    divisor={asset.metrics.assessments}
                  />
                </TableCell>
                <TableCell style={progressCellStyle}>
                  {' '}
                  <ProgressBar
                    dividend={asset.metrics.statuses.submitted}
                    divisor={asset.metrics.assessments}
                  />
                </TableCell>
                <TableCell style={progressCellStyle}>
                  {' '}
                  <ProgressBar
                    dividend={asset.metrics.statuses.accepted}
                    divisor={asset.metrics.assessments}
                  />
                </TableCell>
                <TableCell style={progressCellStyle}>
                  {' '}
                  <ProgressBar
                    dividend={asset.metrics.statuses.rejected}
                    divisor={asset.metrics.assessments}
                  />
                </TableCell>
                <TableCell style={cellStyle}>{asset.metrics.findings.low}</TableCell>
                <TableCell style={cellStyle}>{asset.metrics.findings.medium}</TableCell>
                <TableCell style={cellStyle}>{asset.metrics.findings.high}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

function ProgressBar ({ dividend, divisor }) {
  const percentage = (dividend / divisor) * 100
  return (
    <>
      <LinearProgress
        variant='determinate'
        value={percentage}
        style={{ height: '20px' }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'black',
          fontSize: '12px'
        }}
      >
        {Math.round(percentage)}%
      </div>
    </>
  )
}

function daysPassedSince (date) {
  const today = new Date()
  const date1 = new Date(date)
  const diffTime = Math.abs(today - date1)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

