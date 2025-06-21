import mysqlLib from 'mysql2/promise'

import { env } from '@/src/env'

const baseConfig: mysqlLib.PoolOptions = {
  charset: 'utf8mb4',
  connectionLimit: 10,
  host: env.EXAM_MYSQL_HOST,
  password: env.EXAM_MYSQL_PASSWORD,
  port: env.EXAM_MYSQL_PORT,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false },
  timezone: '+07:00',
  typeCast(field, next) {
    if (field.type === 'BIT' && field.length === 1) {
      const bytes = field.buffer()
      return bytes ? Number(bytes[0]) : null
    }
    return next()
  },
  user: env.EXAM_MYSQL_USER,
  waitForConnections: true,
}

const pools = new Map<string, mysqlLib.Pool>()

function mysql(databaseName: string = 'Hospital'): mysqlLib.Pool {
  if (!pools.has(databaseName)) {
    const pool = mysqlLib.createPool({
      ...baseConfig,
      database: databaseName,
    })

    pools.set(databaseName, pool)
  }

  return pools.get(databaseName)!
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  for (const [_name, pool] of pools) {
    await pool.end().catch(console.error)
  }
  process.exit(0)
})

export { mysql }
