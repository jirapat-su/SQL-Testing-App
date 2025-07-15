import type mysqlLib from 'mysql2/promise'

import { env } from '@/src/env'

const mysqlPoolConfig: mysqlLib.PoolOptions = {
  charset: 'utf8mb4',
  connectionLimit: 10,
  enableKeepAlive: true,
  host: env.EXAM_MYSQL_HOST,
  password: env.EXAM_MYSQL_PASSWORD,
  port: env.EXAM_MYSQL_PORT,
  queueLimit: 20,
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

export { mysqlPoolConfig }
