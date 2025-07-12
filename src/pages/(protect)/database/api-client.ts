import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { httpClient } from '@/src/libs/eden'

function useExamDatabaseAPI() {
  const baseHttpClient = httpClient.api['test-database']
  const getDatabasesQueryKey = useMemo(() => ['getDatabases'], [])

  const getDatabases = useQuery({
    queryFn: async () => {
      const { data } = await baseHttpClient.get()
      return data
    },
    queryKey: getDatabasesQueryKey,
  })

  const getTableData = useMutation({
    mutationFn: async ({
      databaseName,
      tableName,
    }: {
      databaseName: string
      tableName: string
    }) => {
      const { data } = await baseHttpClient({ databaseName })({
        tableName,
      }).get()

      return data
    },
  })

  return {
    // Queries
    getDatabases,
    getTableData,
  }
}

export { useExamDatabaseAPI }
