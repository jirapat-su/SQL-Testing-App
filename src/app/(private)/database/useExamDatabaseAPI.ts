'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import {
  getDatabase,
  getTableData as getTableDataSrv,
  runCommandQuery as runCommandQuerySrv,
} from './service'

export function useExamDatabaseAPI() {
  const getDatabases = useQuery({
    queryFn: () => getDatabase(),
    queryKey: ['getDatabases'],
  })

  const getTableData = useMutation({
    mutationFn: (body: { databaseName: string; tableName: string }) =>
      getTableDataSrv(body.databaseName, body.tableName),
    mutationKey: ['getTableData'],
  })

  const runCommandQuery = useMutation({
    mutationFn: (body: { databaseName: string; sqlCommand: string }) =>
      runCommandQuerySrv(body.databaseName, body.sqlCommand),
    mutationKey: ['runCommandQuery'],
  })

  return {
    getDatabases,
    getTableData,
    runCommandQuery,
  }
}
