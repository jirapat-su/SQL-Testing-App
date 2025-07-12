import z from 'zod'

export const handlerSchema = {
  getTableData: {
    params: z.object({
      databaseName: z.string(),
      tableName: z.string(),
    }),
  },
}
