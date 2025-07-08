/* eslint-disable no-console */
import { format } from 'date-fns'

class Logger {
  private tag: string

  constructor(tag: string = '') {
    this.tag = tag
  }

  private getTimestamp(): string {
    return format(new Date(), 'dd/MM/yyyy HH:mm:ss')
  }

  private getLocation(): string {
    const stack = new Error('Stack trace').stack
    if (stack) {
      const lines = stack.split('\n')
      const callerLine = lines[4]
      if (callerLine) {
        const match = callerLine.match(/\s+at\s+(.+)/)
        return match ? match[1] : 'unknown'
      }
    }
    return 'unknown'
  }

  private formatMessage(level: string, showLocation: boolean = false): string {
    const timestamp = ` [${this.getTimestamp()}]`
    const tag = this.tag ? ` [${this.tag}]` : ''
    const location = showLocation ? ` [${this.getLocation()}]` : ''

    return `${level}${timestamp}${tag}${location}`
  }

  debug(message: string, ...args: unknown[]) {
    console.debug(
      this.formatMessage('\x1B[36m[DEBUG]\x1B[0m', true),
      message,
      ...args
    )
  }

  info(message: string, ...args: unknown[]) {
    console.info(
      this.formatMessage('\x1B[32m[INFO]\x1B[0m', false),
      message,
      ...args
    )
  }

  warn(message: string, ...args: unknown[]) {
    console.warn(
      this.formatMessage('\x1B[33m[WARN]\x1B[0m', false),
      message,
      ...args
    )
  }

  error(message: string, ...args: unknown[]) {
    console.error(
      this.formatMessage('\x1B[31m[ERROR]\x1B[0m', true),
      message,
      ...args
    )
  }
}

export { Logger }
