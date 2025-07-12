import type { GridColDef } from '@mui/x-data-grid'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Fragment, useCallback, useMemo, useState } from 'react'

import SqlEditor from '@/src/components/sql-editor'

import { useExamDatabaseAPI } from './api-client'

export default function Page() {
  const [sqlCommand, setSqlCommand] = useState<string | undefined>('')
  const [dbSelected, setDbSelected] = useState<{
    databaseName?: string
    tableName?: string
  }>({
    databaseName: undefined,
    tableName: undefined,
  })

  const { getDatabases, getTableData } = useExamDatabaseAPI()
  const {
    data: dbData,
    isError: isErrorDatabases,
    isLoading: isLoadingDatabases,
  } = getDatabases
  const {
    data: tbData,
    isError: isErrorTableData,
    isPending: isLoadingTableData,
    mutateAsync: queryMutateAsync,
  } = getTableData

  const handleFetchTableData = useCallback(
    async (databaseName: string, tableName: string) => {
      setDbSelected({
        databaseName,
        tableName,
      })

      await queryMutateAsync({
        databaseName,
        tableName,
      }).catch(err => {
        console.error('Error fetching table data:', err)
      })
    },
    [queryMutateAsync]
  )

  const { columns, rows } = useMemo(() => {
    const { result } = tbData || {}

    if (!result || !Array.isArray(result) || result.length === 0) {
      return { columns: [], rows: [] }
    }

    const firstRow = result[0]
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
      width: 150,
    }))

    const rowData = result?.map((row, index) => ({
      id: index,
      ...row,
    }))

    return { columns: columnDefs, rows: rowData }
  }, [tbData])

  return (
    <div className="flex flex-col lg:flex-row overflow-hidden w-full h-full">
      <div className="lg:max-w-[280px] lg:min-w-[280px] w-full border-b lg:border-r-1 border-divider">
        <div className="p-4">Database List Items</div>

        <div className="max-h-[200px] lg:max-h-full overflow-auto">
          {isLoadingDatabases && (
            <div className="p-4">Loading databases...</div>
          )}

          {isErrorDatabases && (
            <div className="p-4 text-red-500">Error loading databases</div>
          )}

          <List
            aria-labelledby="nested-list-subheader"
            component="nav"
            sx={{ width: '100%' }}
          >
            {dbData?.result?.map(database => {
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
                          onClick={() => {
                            setSqlCommand(`SELECT * FROM \`${tbName}\``)
                            handleFetchTableData(dbName!, tbName)
                          }}
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
          <div className="flex flex-col p-4 overflow-hidden min-h-[400px]">
            <p>Result</p>

            {isErrorTableData && (
              <div className="text-red-500">Error loading table data</div>
            )}

            {!isErrorTableData && (
              <div className="mt-4 flex-1 overflow-hidden">
                <DataGrid
                  columns={columns}
                  disableRowSelectionOnClick
                  getRowId={row => row.id}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 25,
                      },
                    },
                  }}
                  loading={isLoadingTableData}
                  pageSizeOptions={[5, 10, 25, 50]}
                  rows={rows}
                  sx={{
                    '& .MuiDataGrid-row:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                />
              </div>
            )}
          </div>

          <div className="w-full h-[400px] mt-auto border-t border-divider">
            <div className="flex items-center justify-between h-[60px] px-4">
              <div>Code Editor</div>

              <div>
                <Button
                  disabled={!dbSelected?.databaseName}
                  onClick={() => {
                    alert('Run command is not implemented yet.')
                  }}
                  size="small"
                  variant="outlined"
                >
                  Run Command
                </Button>
              </div>
            </div>

            <div className="h-[calc(100%-60px)] overflow-hidden">
              <SqlEditor
                onChange={val => setSqlCommand(val)}
                value={sqlCommand}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
