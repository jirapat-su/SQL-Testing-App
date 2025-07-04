import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import { Fragment, useCallback, useState } from 'react'

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
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Selected Table</h3>
              <p className="text-sm text-gray-600 mb-4">
                {JSON.stringify(dbSelected, null, 2)}
              </p>

              {getTableData.isPending && <div>Loading table data...</div>}

              {getTableData.error && (
                <div className="text-red-500">Error loading table data</div>
              )}

              {getTableData.data &&
                Array.isArray(getTableData.data) &&
                getTableData.data.length > 0 && (
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        {Object.keys(getTableData.data[0] || {}).map(column => (
                          <th
                            className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700"
                            key={column}
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {getTableData.data.map(row => (
                        <tr
                          className="hover:bg-gray-50"
                          key={`row-${JSON.stringify(row)}`}
                        >
                          {Object.entries(row).map(([column, value]) => (
                            <td
                              className="border border-gray-300 px-4 py-2 text-sm"
                              key={`${column}`}
                            >
                              {value === null ? (
                                <span className="text-gray-400 italic">
                                  null
                                </span>
                              ) : (
                                String(value)
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

              {getTableData.data &&
                (!Array.isArray(getTableData.data) ||
                  getTableData.data.length === 0) && (
                  <div>
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
