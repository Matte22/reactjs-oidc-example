import React from 'react'
import { DataGrid } from '@mui/x-data-grid'


export default function MUICollectionMetricAssetDataGrid ({ assetData }) {


  const columns = [
    { field: 'name', headerName: 'Asset', width: 200 },
    {
      field: 'labels',
      headerName: 'Labels',
        width: 0,
      renderCell: params => params.value.join(', ')
    },
    {
      field: 'benchmarkIdsLength',
      headerName: 'STIGs'
    },
    {
      field: 'assessments',
      headerName: 'Checks'
    },
    {
      field: 'oldest',
      headerName: 'Oldest'
    },
    {
      field: 'newest',
      headerName: 'Newest'
    },
    {
      field: 'updated',
      headerName: 'Updated'
    },
    {
      field: 'assessed',
      headerName: 'Assessed',

      renderCell: params => (
        <ProgressBar
          dividend={params.value.metrics.assessed}
          divisor={params.value.metrics.assessments}
        />
      )
    },
    {
      field: 'submitted',
      headerName: 'Submitted',

      renderCell: params => (
        <ProgressBar
          dividend={params.value.metrics.statuses.submitted}
          divisor={params.value.metrics.assessments}
        />
      )
    },
    {
      field: 'accepted',
      headerName: 'Accepted',

      renderCell: params => (
        <ProgressBar
          dividend={params.value.metrics.statuses.accepted}
          divisor={params.value.metrics.assessments}
        />
      )
    },
    {
      field: 'rejected',
      headerName: 'Rejected',

      renderCell: params => (
        <ProgressBar
          dividend={params.value.metrics.statuses.rejected}
          divisor={params.value.metrics.assessments}
        />
      )
    },
    {
      field: 'low',
      headerName: 'Cat3'
    },
    {
      field: 'medium',
      headerName: 'Cat2'
    },
    {
      field: 'high',
      headerName: 'Cat3'
    }
  ]

  const rows = assetData.map((asset, index) => ({
    id: asset.assetId,
    name: asset.name,
    labels: asset.labels.map(label => label.name),
    benchmarkIdsLength: asset.benchmarkIds.length,
    assessments: asset.metrics.assessments,
    oldest: asset.metrics.minTs ? daysPassedSince(asset.metrics.minTs) : '-',
    newest: asset.metrics.maxTs ? daysPassedSince(asset.metrics.maxTs) : '-',
    updated: asset.metrics.maxTs
      ? daysPassedSince(asset.metrics.maxTouchTs)
      : '-',
    assessed: asset,
    submitted: asset,
    accepted: asset,
    rejected: asset,
    low: asset.metrics.findings.low,
    medium: asset.metrics.findings.medium,
    high: asset.metrics.findings.high
  }))

  return (
    <div style={{ height: 300, width: '80%' }}>
      MUI GRID:
      <DataGrid
        rows={rows}
        rowHeight={35}
        columnHeaderHeight={40}
        density='compact'
        columns={columns}
        pageSize={5}
        checkboxSelection={true}
      />
    </div>
  )
}

function ProgressBar ({ dividend, divisor }) {
  const percentage = (dividend / divisor) * 100

  const progressBarStyle = {
    position: 'relative',
    width: '100%',
    height: '16px', 
    overflow: 'hidden',
    backgroundColor: '#e0e0e0' 
  }

  const filledStyle = {
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: '#88CCF5'
  }

  const labelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    fontSize: '110x',

  }

  return (
    <div style={progressBarStyle}>
      <div style={filledStyle}></div>
      <div style={labelStyle}>{Math.round(percentage)}%</div>
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
