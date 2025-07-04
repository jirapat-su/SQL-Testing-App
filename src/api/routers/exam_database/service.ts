import { mysql } from '@/src/libs/mysql'

const exam_database_names = ['Hospital']

class ExamDatabaseService {
  async getDatabases() {
    const data = new Map<string, string[]>()

    for (const database_name of exam_database_names) {
      const connection = await mysql(database_name).getConnection()
      const [rows] = await connection.execute('SHOW TABLES')
      connection.release()

      const tableNames = Array.isArray(rows)
        ? rows
            .map(val => Object.values(val)[0])
            .filter(t => t !== '_prisma_migrations')
        : []

      data.set(database_name, tableNames)
    }

    return Array.from(data.entries()).map(([key, values]) => ({
      [key]: values,
    }))
  }

  async getTableData(database_name: string, table_name: string) {
    if (!exam_database_names.includes(database_name)) {
      throw new Error(`Database ${database_name} is not supported.`)
    }

    const connection = await mysql(database_name).getConnection()
    try {
      const [rows] = await connection.execute(`SELECT * FROM \`${table_name}\``)
      return rows
    } catch (error) {
      console.error(
        `Error fetching data from ${database_name}.${table_name}:`,
        error
      )
      throw error
    } finally {
      connection.release()
    }
  }
}

export { ExamDatabaseService }
