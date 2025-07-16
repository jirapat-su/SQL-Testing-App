import { httpClient } from '@/src/libs/eden'
import { createEffectFromTreaty } from '@/src/libs/eden/utils'
import { EffectHelpers } from '@/src/libs/effect'

class ExamDatabaseAPIService {
  private static instance: ExamDatabaseAPIService

  private constructor() {}

  static getInstance(): ExamDatabaseAPIService {
    if (!ExamDatabaseAPIService.instance) {
      ExamDatabaseAPIService.instance = new ExamDatabaseAPIService()
    }
    return ExamDatabaseAPIService.instance
  }

  async getDatabase() {
    const task = createEffectFromTreaty(() =>
      httpClient.api['exam-database'].get()
    )
    const response = await EffectHelpers.runEffectTask(task)
    return response
  }

  async getTableData(params: { databaseName: string; tableName: string }) {
    const task = createEffectFromTreaty(() =>
      httpClient.api['exam-database']({ databaseName: params.databaseName })({
        tableName: params.tableName,
      }).get()
    )
    const response = await EffectHelpers.runEffectTask(task)
    return response
  }

  async runCommandQuery(body: { databaseName: string; sqlCommand: string }) {
    const task = createEffectFromTreaty(() =>
      httpClient.api['exam-database']['command-query'].post(body)
    )
    const response = await EffectHelpers.runEffectTask(task)
    return response
  }
}

export const examDatabaseAPIService = ExamDatabaseAPIService.getInstance()
