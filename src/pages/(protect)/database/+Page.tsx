import type { GridColDef } from '@mui/x-data-grid'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Fragment, useCallback, useMemo, useState } from 'react'

import SqlEditor from '@/src/components/sql-editor'

import { useExamDatabaseAPI } from './api-client'

export default function Page() {
  const [open, setOpen] = useState<Array<boolean>>([true])
  const [dbSelected, setDbSelected] = useState<{
    database_name: string
    table_name: string
  } | null>(null)

  const { getDatabases, getTableData } = useExamDatabaseAPI()

  const handleOpenMenu = useCallback((index: number) => {
    setOpen(prevOpen => {
      const newOpen = [...prevOpen]
      newOpen[index] = !newOpen[index]
      return newOpen
    })
  }, [])

  const { columns, rows } = useMemo(() => {
    if (
      !getTableData.data ||
      !Array.isArray(getTableData.data) ||
      getTableData.data.length === 0
    ) {
      return { columns: [], rows: [] }
    }

    const firstRow = getTableData.data[0]
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

    const rowData = getTableData.data.map((row, index) => ({
      id: index,
      ...row,
    }))

    return { columns: columnDefs, rows: rowData }
  }, [getTableData.data])

  return (
    <div className="flex flex-col lg:flex-row lg:overflow-hidden overflow-auto w-full h-full">
      <div className="lg:max-w-[280px] w-full border-b lg:border-r-1 border-divider">
        <div className="p-4">Database List Items</div>

        <div className="max-h-[400px] lg:max-h-full overflow-auto">
          {getDatabases.isLoading && (
            <div className="p-4">Loading databases...</div>
          )}
          {getDatabases.error && (
            <div className="p-4 text-red-500">Error loading databases</div>
          )}
          <List
            aria-labelledby="nested-list-subheader"
            component="nav"
            sx={{ width: '100%' }}
          >
            {getDatabases.data?.map((database, idx) => {
              const dbName = Object.keys(database).shift()

              return (
                <Fragment key={dbName}>
                  <ListItemButton onClick={() => handleOpenMenu(idx)}>
                    <ListItemText primary={dbName} />
                    {open?.[idx] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItemButton>

                  {Object.entries(database[dbName!]).map(([key, value]) => {
                    const { database_name, table_name } = dbSelected || {}

                    return (
                      <Collapse
                        in={open?.[idx]}
                        key={key}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List
                          className={
                            database_name === dbName && table_name === value
                              ? 'text-primary-dark bg-primary/10'
                              : ''
                          }
                          component="div"
                          disablePadding
                          onClick={() => {
                            setDbSelected({
                              database_name: dbName!,
                              table_name: value,
                            })
                            getTableData.mutate({
                              databaseName: dbName!,
                              tableName: value,
                            })
                          }}
                        >
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary={value} />
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

      <div className="flex-1">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-auto">
            <div className="p-4 flex flex-col h-full">
              <p>{`Database: ${dbSelected?.database_name ?? ''}`}</p>
              <p>{`Table: ${dbSelected?.table_name ?? ''}`}</p>

              <div className="min-h-0 mt-4">
                <DataGrid
                  columns={columns}
                  disableRowSelectionOnClick
                  getRowId={row => row.id}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  loading={getTableData.isPending}
                  pageSizeOptions={[5, 10, 25, 50]}
                  rows={rows}
                  sx={{
                    '& .MuiDataGrid-row:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    height: '100%',
                  }}
                />
              </div>

              {getTableData.error && (
                <div className="text-red-500 mt-4">
                  Error loading table data
                </div>
              )}

              {getTableData.data &&
                (!Array.isArray(getTableData.data) ||
                  getTableData.data.length === 0) && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Table Data:</h4>
                    <div className="p-4 bg-gray-50 rounded">
                      <pre className="text-sm overflow-auto">
                        {JSON.stringify(getTableData.data, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
            </div>
          </div>

          <div className="w-full h-[400px] mt-auto border-t border-divider">
            <div className="p-4">Code Editor</div>
            <SqlEditor
              onChange={val => {
                // eslint-disable-next-line no-console
                console.log('SQL Editor Value Changed:', val)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
