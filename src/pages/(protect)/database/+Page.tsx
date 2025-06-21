import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Collapse, Grid, List, ListItemButton, ListItemText, ListSubheader } from '@mui/material'
import { Fragment, useCallback, useEffect, useState } from 'react'

import { httpClient } from '@/src/libs/eden'

type Databases = Awaited<ReturnType<typeof httpClient.api.exam_database.get>>['data']

export default function Page() {
  const [open, setOpen] = useState<Array<boolean>>([])
  const [databases, setDatabases] = useState<Databases>(null)

  const [dbSelected, setDbSelected] = useState<{ database_name: string, table_name: string } | null>(null)

  const databasesFunc = useCallback(async () => {
    const datbase = await httpClient.api.exam_database.get()
    return datbase
  }, [])

  const handleOpenMenu = (index: number) => {
    setOpen((prevOpen) => {
      const newOpen = [...prevOpen]
      newOpen[index] = !newOpen[index]
      return newOpen
    })
  }

  useEffect(() => {
    databasesFunc().then(({ data }) => {
      if (!data)
        return
      setDatabases(data)
    }).catch((error) => {
      console.error('Error fetching databases:', error)
      setDatabases([])
    })
  }, [databasesFunc])

  return (
    <Grid columns={12} container spacing={2} sx={{ height: 'inherit', overflow: 'hidden' }}>
      <Grid className="overflow-auto lg:h-full max-lg:h-[400px]" size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
        <List
          aria-labelledby="nested-list-subheader"
          component="nav"
          subheader={(
            <ListSubheader component="div" id="nested-list-subheader">
              Database List Items
            </ListSubheader>
          )}
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
                    <Collapse in={open?.[idx]} key={key} timeout="auto" unmountOnExit>
                      <List
                        className={database_name === dbName && table_name === value ? 'text-[var(--mui-palette-primary)] dark:text-[var(--mui-palette-primary-dark)] bg-[rgba(var(--mui-palette-primary-mainChannel)/var(--mui-palette-action-selectedOpacity))]' : ''}
                        component="div"
                        disablePadding
                        onClick={() => {
                          setDbSelected({ database_name: dbName!, table_name: value })
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
      </Grid>

      <Grid size={{ lg: 8, md: 12, sm: 12, xs: 12 }}>
        <Box>
          1
        </Box>
      </Grid>
    </Grid>
  )
}
