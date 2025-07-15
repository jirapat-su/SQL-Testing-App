'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import { examDatabaseAPIService as apiService } from './service'

export function useExamDatabaseAPI() {
  const getDatabase = useQuery({
    queryFn: apiService.getDatabase,
    queryKey: ['useExamDatabaseAPI-getDatabase'],
  })

  const getTableData = useMutation({
    mutationFn: apiService.getTableData,
    mutationKey: ['useExamDatabaseAPI-getTableData'],
  })

  const runCommandQuery = useMutation({
    mutationFn: apiService.runCommandQuery,
    mutationKey: ['useExamDatabaseAPI-runCommandQuery'],
  })

  return {
    getDatabase,
    getTableData,
    runCommandQuery,
  }
}
