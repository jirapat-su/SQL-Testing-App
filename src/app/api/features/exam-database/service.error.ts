import { Data } from 'effect'

import { EffectHelpers } from '@/src/libs/effect'

export class DatabaseNotAllowedError extends Data.TaggedError(
  'Task/DatabaseNotAllowed/Error'
)<EffectHelpers.ErrorMsg> {
  static new = EffectHelpers.createErrorFactory(this)
}

export class CommandQueryError extends Data.TaggedError(
  'Task/CommandQuery/Error'
)<EffectHelpers.ErrorMsg> {
  static new = EffectHelpers.createErrorFactory(this)
}
