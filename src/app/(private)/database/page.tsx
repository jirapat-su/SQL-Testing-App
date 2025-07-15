'use client'

import type { GridColDef } from '@mui/x-data-grid'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { DataGrid } from '@mui/x-data-grid'
import { Fragment, useCallback, useMemo, useState } from 'react'

import SqlEditor from '@/src/components/sql-editor'

import { useExamDatabaseAPI } from './useExamDatabaseAPI'

const PAGINATION_SIZES = [5, 10, 25, 50] as const
const DEFAULT_PAGE_SIZE = 25
const SIDEBAR_WIDTH = '280px'
const EDITOR_HEIGHT = '400px'
const EDITOR_HEADER_HEIGHT = '60px'

type DatabaseSelection = {
  databaseName?: string
  tableName?: string
}

type SqlCommandState = {
  isPrimary: boolean
  value: string
}

export default function DatabasePage() {
  const [sqlCommand, setSqlCommand] = useState<SqlCommandState>({
    isPrimary: false,
    value: '',
  })
  const [dbSelected, setDbSelected] = useState<DatabaseSelection>({
    databaseName: undefined,
    tableName: undefined,
  })

  const { getDatabases, getTableData, runCommandQuery } = useExamDatabaseAPI()
  const {
    data: databaseResponse,
    error: databaseError,
    isLoading: isLoadingDatabases,
  } = getDatabases
  const {
    data: tableDataResponse,
    error: tableDataError,
    isPending: isLoadingTableData,
    mutateAsync: queryMutateAsync,
  } = getTableData
  const {
    data: runCommandResponse,
    error: runCommandError,
    isPending: isLoadingRunCommand,
    mutateAsync: runCommandMutateAsync,
  } = runCommandQuery

  const isLoading = useMemo(
    () => isLoadingDatabases || isLoadingTableData || isLoadingRunCommand,
    [isLoadingDatabases, isLoadingTableData, isLoadingRunCommand]
  )

  const databaseData = useMemo(() => {
    const { result } = databaseResponse || {}
    if (!result || !Array.isArray(result)) return { result: [] }

    return { result }
  }, [databaseResponse])

  const currentError = useMemo(() => {
    const { isPrimary } = sqlCommand
    return isPrimary ? runCommandError : tableDataError
  }, [runCommandError, sqlCommand, tableDataError])

  const tableData = useMemo(() => {
    if (currentError) return { result: [] }

    const { isPrimary } = sqlCommand

    if (isPrimary) {
      const { result } = runCommandResponse || {}
      const { action, affter } = result || {}
      return { action, result: affter || [] }
    }

    const { result } = tableDataResponse || {}
    return { action: undefined, result: result || [] }
  }, [runCommandResponse, sqlCommand, tableDataResponse, currentError])

  const handleFetchTableData = useCallback(
    async (databaseName: string, tableName: string) => {
      setDbSelected({
        databaseName,
        tableName,
      })

      setSqlCommand(prev => ({
        ...prev,
        isPrimary: false,
        value: `SELECT * FROM \`${tableName}\``,
      }))

      await queryMutateAsync({
        databaseName,
        tableName,
      }).catch(err => {
        console.error('Error fetching table data:', err)
      })
    },
    [queryMutateAsync]
  )

  const handleRunCommand = useCallback(async () => {
    if (!dbSelected.databaseName || !sqlCommand.value.trim()) {
      console.warn('Please select a database and enter a SQL command.')
      return
    }

    // Reset the table selection when running a command
    setDbSelected(prev => ({
      ...prev,
      tableName: undefined,
    }))

    // Set the command as primary to indicate it's a custom SQL command
    setSqlCommand(prev => ({
      ...prev,
      isPrimary: true,
    }))

    runCommandMutateAsync({
      databaseName: dbSelected.databaseName,
      sqlCommand: sqlCommand.value,
    })
  }, [dbSelected.databaseName, runCommandMutateAsync, sqlCommand.value])

  const { columns, rows } = useMemo(() => {
    const { result } = tableData || {}

    if (!result || !Array.isArray(result) || result.length === 0) {
      return { columns: [], rows: [] }
    }

    const firstRow = result?.[0]
    const columnDefs: GridColDef[] = Object.keys(firstRow).map(key => ({
      field: key,
      flex: 1,
      headerName: key,
      valueFormatter: value => {
        if (value === null || value === undefined) {
          return 'null'
        }
        return String(value)
      },
    }))

    const rowData = result?.map((row, index) => ({
      id: index,
      ...row,
    }))

    return { columns: columnDefs, rows: rowData }
  }, [tableData])

  return (
    <div className="flex flex-col lg:flex-row overflow-hidden w-full h-full">
      <div
        className="w-full border-b lg:border-r-1 border-divider"
        style={{
          maxWidth: SIDEBAR_WIDTH,
          minWidth: SIDEBAR_WIDTH,
          width: SIDEBAR_WIDTH,
        }}
      >
        <div className="p-4">Database List</div>

        <div className="max-h-[200px] lg:max-h-full overflow-auto">
          {isLoadingDatabases && (
            <div className="p-4">Loading databases...</div>
          )}

          {databaseError && (
            <div className="p-4 text-red-500">
              Error loading databases {databaseError.value?.message}
            </div>
          )}

          <List
            aria-labelledby="nested-list-subheader"
            component="nav"
            sx={{ width: '100%' }}
          >
            {databaseData?.result?.map(database => {
              const dbName = Object.keys(database).shift()

              return (
                <Fragment key={dbName}>
                  <ListItemButton
                    onClick={() =>
                      setDbSelected(prev => ({
                        databaseName:
                          prev?.databaseName === dbName ? undefined : dbName,
                        tableName: undefined,
                      }))
                    }
                  >
                    <ListItemText primary={dbName} />
                    {dbSelected?.databaseName === dbName ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </ListItemButton>

                  {Object.entries(database[dbName!]).map(([key, tbName]) => {
                    const { databaseName, tableName } = dbSelected || {}

                    return (
                      <Collapse
                        in={dbSelected?.databaseName === dbName}
                        key={key}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List
                          className={
                            databaseName === dbName && tableName === tbName
                              ? 'text-primary-dark bg-primary/10'
                              : ''
                          }
                          component="div"
                          disablePadding
                          onClick={() => handleFetchTableData(dbName!, tbName)}
                        >
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary={tbName} />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    )
                  })}
                </Fragment>
              )
            })}
          </List>
        </div>
      </div>

      <div className="flex-1 overflow-x-hidden">
        <div className="flex flex-col h-full">
          <div className="flex flex-col p-4 overflow-hidden min-h-[400px] gap-4">
            <p>Result</p>

            {currentError && (
              <Alert severity="error" variant="outlined">
                <AlertTitle>Error</AlertTitle>
                <p>
                  {currentError?.value?.message ?? 'Error loading table data'}
                </p>
              </Alert>
            )}

            {tableData?.action && (
              <Alert severity="success" variant="outlined">
                <AlertTitle>Success</AlertTitle>
                <p>Affected Rows: {tableData?.action?.affectedRows || 0}</p>
              </Alert>
            )}

            <div className="flex-1 overflow-hidden">
              <DataGrid
                columns={columns}
                disableRowSelectionOnClick
                getRowId={row => row.id}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: DEFAULT_PAGE_SIZE,
                    },
                  },
                }}
                loading={isLoading}
                pageSizeOptions={PAGINATION_SIZES}
                rows={rows}
                sx={{
                  '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              />
            </div>
          </div>

          <div
            className="w-full mt-auto border-t border-divider"
            style={{ height: EDITOR_HEIGHT }}
          >
            <div
              className="flex items-center justify-between px-4"
              style={{ height: EDITOR_HEADER_HEIGHT }}
            >
              <div>Code Editor</div>

              <div>
                <Button
                  disabled={!dbSelected?.databaseName}
                  loading={isLoading}
                  onClick={handleRunCommand}
                  size="small"
                  type="button"
                  variant="outlined"
                >
                  Run Command
                </Button>
              </div>
            </div>

            <div
              className="overflow-hidden"
              style={{ height: `calc(100% - ${EDITOR_HEADER_HEIGHT})` }}
            >
              <SqlEditor
                onCodeChange={val =>
                  setSqlCommand(prev => ({
                    ...prev,
                    value: val ?? '',
                  }))
                }
                value={sqlCommand.value}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
