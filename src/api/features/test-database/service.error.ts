import { Data } from 'effect'

import { EffectHelpers } from '@/src/libs/effect'

export class GetAllDatabaseError extends Data.TaggedError(
  'Task/GetAllDatabase/Error'
)<EffectHelpers.ErrorMsg> {
  static new = EffectHelpers.createErrorFactory(this)
}

export class DatabaseNotAllowedError extends Data.TaggedError(
  'Task/GetTableData/DatabaseNotAllowed/Error'
)<EffectHelpers.ErrorMsg> {
  static new = EffectHelpers.createErrorFactory(this)
}

export class GetTableDataError extends Data.TaggedError(
  'Task/GetTableData/Error'
)<EffectHelpers.ErrorMsg> {
  static new = EffectHelpers.createErrorFactory(this)
}
