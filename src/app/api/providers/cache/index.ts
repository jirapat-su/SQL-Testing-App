import { Duration, Effect, Match, Option } from 'effect'
import Keyv from 'keyv'

import { CacheDeleteError, CacheGetError, CacheSetError } from './cache.error'

const cacheConfig = new Keyv({
  namespace: 'api-cache',
  store: new Map(),
  useKeyPrefix: false,
})

export class CacheProvider extends Effect.Service<CacheProvider>()(
  'Provider/Cache',
  {
    dependencies: [],
    effect: Effect.fn(function* (
      defaultTtl: Option.Option<Duration.Duration> = Option.none()
    ) {
      const get = <T>(key: string) =>
        Effect.tryPromise({
          catch: error => CacheGetError.new()(error),
          try: () => cacheConfig.get<T>(key),
        }).pipe(Effect.andThen(Effect.fromNullable))

      const set = <T>(
        key: string,
        value: T,
        ttl: Option.Option<Duration.Duration> = Option.none()
      ) => {
        const ttlDuration = Match.value({ defaultTtl, ttl }).pipe(
          Match.when({ ttl: { _tag: 'Some' } }, ({ ttl }) => ttl.value),
          Match.when(
            { defaultTtl: { _tag: 'Some' } },
            ({ defaultTtl }) => defaultTtl.value
          ),
          Match.orElse(() => Duration.millis(0))
        )

        const ttlMillis = Duration.toMillis(ttlDuration)

        return Effect.tryPromise({
          catch: error => CacheSetError.new()(error),
          try: () => cacheConfig.set(key, value, ttlMillis),
        })
      }

      const getOrSet = <A, E>(
        key: string,
        fn: () => Effect.Effect<A, E>,
        ttl: Option.Option<Duration.Duration> = Option.none()
      ) =>
        get<A>(key).pipe(
          Effect.catchAll(() =>
            fn().pipe(Effect.tap(data => set(key, data, ttl)))
          )
        )

      const remove = (key: string) =>
        Effect.tryPromise({
          catch: error => CacheDeleteError.new()(error),
          try: () => cacheConfig.delete(key),
        })

      return {
        get,
        getOrSet,
        remove,
        set,
      }
    }),
  }
) {}
