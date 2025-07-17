import { Data } from 'effect'

import { EffectHelpers } from '@/src/libs/effect'

export class MySQLConnectionError extends Data.TaggedError(
  'MySQL/Connection/Error'
)<EffectHelpers.ErrorMsg> {
  static new = EffectHelpers.createErrorFactory(this)
}

export class MySQLQueryError extends Data.TaggedError(
  'MySQL/Query/Error'
)<EffectHelpers.ErrorMsg> {
  static new = EffectHelpers.createErrorFactory(this)
}
