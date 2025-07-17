import { t } from 'elysia'

export const handlerSchema = {
  commandQuery: {
    body: t.Object(
      {
        databaseName: t.String(),
        sqlCommand: t.String(),
      },
      { additionalProperties: false }
    ),
  },
  getTableData: {
    params: t.Object(
      {
        databaseName: t.String(),
        tableName: t.String(),
      },
      { additionalProperties: false }
    ),
  },
}
