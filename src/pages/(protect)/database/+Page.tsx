import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import { Fragment, useCallback, useEffect, useState } from 'react'

import SqlEditor from '@/src/components/sql-editor'
import { httpClient } from '@/src/libs/eden'

type Databases = Awaited<
  ReturnType<typeof httpClient.api.exam_database.get>
>['data']

export default function Page() {
  const [open, setOpen] = useState<Array<boolean>>([true])
  const [databases, setDatabases] = useState<Databases>(null)
  const [dbSelected, setDbSelected] = useState<{
    database_name: string
    table_name: string
  } | null>(null)

  const databasesFunc = useCallback(async () => {
    const datbase = await httpClient.api.exam_database.get()
    return datbase
  }, [])

  const handleOpenMenu = useCallback((index: number) => {
    setOpen(prevOpen => {
      const newOpen = [...prevOpen]
      newOpen[index] = !newOpen[index]
      return newOpen
    })
  }, [])

  useEffect(() => {
    databasesFunc()
      .then(({ data }) => {
        if (!data) return
        setDatabases(data)
      })
      .catch(error => {
        console.error('Error fetching databases:', error)
        setDatabases([])
      })
  }, [databasesFunc])

  return (
    <div className="flex flex-col lg:flex-row lg:overflow-hidden overflow-auto w-full h-full">
      <div className="lg:max-w-[280px] w-full border-b lg:border-r-1 border-[var(--mui-palette-divider)]">
        <div className="p-4">Database List Items</div>

        <div className="max-h-[400px] lg:max-h-full overflow-auto">
          <List
            aria-labelledby="nested-list-subheader"
            component="nav"
            sx={{ width: '100%' }}
          >
            {databases?.map((database, idx) => {
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
                              ? 'text-[var(--mui-palette-primary-dark)] bg-[rgba(var(--mui-palette-primary-mainChannel)/var(--mui-palette-action-selectedOpacity))]'
                              : ''
                          }
                          component="div"
                          disablePadding
                          onClick={() => {
                            setDbSelected({
                              database_name: dbName!,
                              table_name: value,
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
            <p>{JSON.stringify(dbSelected, null, 2)}</p>
          </div>

          <div className="w-full h-[400px] mt-auto border-t border-[var(--mui-palette-divider)]">
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
