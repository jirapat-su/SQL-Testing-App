import { HTTP_STATUS } from '@/src/constants/http-status'

type ErrorDetail = { error: unknown }
type StatusCode = keyof typeof HTTP_STATUS

export class ErrorService extends Error {
  constructor(
    public status: StatusCode,
    public msg?: null | string,
    public detail?: ErrorDetail
  ) {
    super(msg || ErrorService.getMessageForCode(status))
    Object.setPrototypeOf(this, ErrorService.prototype)
  }

  private static getMessageForCode(status: StatusCode): string {
    return HTTP_STATUS[status] || 'Unknown Error'
  }

  public toJSON() {
    return {
      message: this.message,
      status: this.status,
      ...this.detail,
    }
  }
}
