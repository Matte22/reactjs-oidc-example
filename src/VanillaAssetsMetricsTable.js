export default function VanillaCollectionMetricAssetDataTable ({ assetData }) {
  const cellStyle = {
    whiteSpace: 'nowrap',
    padding: '2px 6px',
    fontSize: '13px' // Reduce the default padding
  }

  const rowStyle = {
    height: 'auto',
    borderTop: '1px solid #e0e0e0',
    borderBottom: '1px solid #e0e0e0'
  }

  const progressCellStyle = {
    padding: '2px 3px',
    position: 'relative'
  }

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  }
  

  return (
    <div style={{ maxWidth: '75%' }}>
        Vanilla React:
      <div>
        <table style={tableStyle}>
          <thead>
            <tr style={rowStyle}>
              <th style={cellStyle}>Asset</th>
              <th style={cellStyle}>Labels</th>
              <th style={cellStyle}>STIGs</th>
              <th style={cellStyle}>Checks</th>
              <th style={cellStyle}>Oldest</th>
              <th style={cellStyle}>Newest</th>
              <th style={cellStyle}>Updated</th>
              <th style={cellStyle}>Assessed</th>
              <th style={cellStyle}>Submitted</th>
              <th style={cellStyle}>Accepted</th>
              <th style={cellStyle}>Rejected</th>
              <th style={cellStyle}>Cat3</th>
              <th style={cellStyle}>Cat2</th>
              <th style={cellStyle}>Cat1</th>
            </tr>
          </thead>
          <tbody>
            {assetData.map(asset => (
              <tr style={rowStyle}>
                <td style={cellStyle}>{asset.name}</td>
                <td style={cellStyle}>
                  {asset.labels.map(label => (
                    <>{label.name} </>
                  ))}
                </td>
                <td style={cellStyle}>{asset.benchmarkIds.length}</td>
                <td style={cellStyle}>{asset.metrics.assessments}</td>
                <td style={cellStyle}>
                  {asset.metrics.minTs
                    ? daysPassedSince(asset.metrics.minTs)
                    : '-'}
                </td>
                <td style={cellStyle}>
                  {' '}
                  {asset.metrics.minTs
                    ? daysPassedSince(asset.metrics.maxTs)
                    : '-'}
                </td>
                <td style={cellStyle}>
                  {' '}
                  {asset.metrics.minTs
                    ? daysPassedSince(asset.metrics.maxTs)
                    : '-'}
                </td>
                <td style={progressCellStyle}>
                  <ProgressBar
                    dividend={asset.metrics.assessed}
                    divisor={asset.metrics.assessments}
                  />
                </td>
                <td style={progressCellStyle}>
                  {' '}
                  <ProgressBar
                    dividend={asset.metrics.statuses.submitted}
                    divisor={asset.metrics.assessments}
                  />
                </td>
                <td style={progressCellStyle}>
                  {' '}
                  <ProgressBar
                    dividend={asset.metrics.statuses.accepted}
                    divisor={asset.metrics.assessments}
                  />
                </td>
                <td style={progressCellStyle}>
                  {' '}
                  <ProgressBar
                    dividend={asset.metrics.statuses.rejected}
                    divisor={asset.metrics.assessments}
                  />
                </td>
                <td style={cellStyle}>{asset.metrics.findings.low}</td>
                <td style={cellStyle}>{asset.metrics.findings.medium}</td>
                <td style={cellStyle}>{asset.metrics.findings.high}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ProgressBar ({ dividend, divisor }) {
  const percentage = (dividend / divisor) * 100

  return (
    <div
      style={{
        position: 'relative',
        height: '20px',
        backgroundColor: '#e0e0e0' // Background of the progress "track"
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${percentage}%`,
          backgroundColor: '#88CCF5' // Color of the progress "bar"
        }}
      ></div>
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
    </div>
  )
}

function daysPassedSince (date) {
  const today = new Date()
  const date1 = new Date(date)
  const diffTime = Math.abs(today - date1)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// ... rest of the code ...
