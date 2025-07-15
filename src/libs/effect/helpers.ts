import { Cause, Effect, Exit } from 'effect'

export type ErrorMsg = {
  error?: unknown
  msg?: string
}

export function createErrorFactory<T>(Self: new (payload: ErrorMsg) => T) {
  return (msg?: string) => (error?: unknown) => new Self({ error, msg })
}

export function getDataOrThrowRawError<A, E = never>(exit: Exit.Exit<A, E>) {
  return Exit.match(exit, {
    onFailure: error => {
      const err = Cause.squash(error)
      throw err
    },
    onSuccess: data => data,
  })
}

export async function runEffectTask<A, E>(effect: Effect.Effect<A, E>) {
  const exit = await Effect.runPromiseExit(effect)
  return getDataOrThrowRawError(exit)
}
