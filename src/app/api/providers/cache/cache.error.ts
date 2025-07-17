import { Data } from 'effect'

import { EffectHelpers } from '@/src/libs/effect'

export class CacheGetError extends Data.TaggedError(
  'Cache/Get/Error'
)<EffectHelpers.ErrorMsg> {
  static new = EffectHelpers.createErrorFactory(this)
}

export class CacheSetError extends Data.TaggedError(
  'Cache/Set/Error'
)<EffectHelpers.ErrorMsg> {
  static new = EffectHelpers.createErrorFactory(this)
}

export class CacheDeleteError extends Data.TaggedError(
  'Cache/delete/Error'
)<EffectHelpers.ErrorMsg> {
  static new = EffectHelpers.createErrorFactory(this)
}
