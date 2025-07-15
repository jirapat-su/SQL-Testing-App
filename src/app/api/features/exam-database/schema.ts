import z from 'zod'

export const handlerSchema = {
  commandQuery: {
    body: z.object({
      databaseName: z.string(),
      sqlCommand: z.string(),
    }),
  },
  getTableData: {
    params: z.object({
      databaseName: z.string(),
      tableName: z.string(),
    }),
  },
}
