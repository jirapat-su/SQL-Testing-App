import type { PrismaClient } from '@custom-prisma/client'

import { Data, Effect } from 'effect'

import { EffectHelpers } from '../effect'
import { prisma as prismaClient } from './config'

class PrismaConnectError extends Data.TaggedError(
  'Prisma/Connect/Error'
)<EffectHelpers.ErrorMsg> {
  static new = EffectHelpers.createErrorFactory(this)
}

class PrismaDisconnectError extends Data.TaggedError(
  'Prisma/Disconnect/Error'
)<EffectHelpers.ErrorMsg> {
  static new = EffectHelpers.createErrorFactory(this)
}

export class PrismaProvider extends Effect.Service<PrismaProvider>()(
  'Libs/Prisma',
  {
    dependencies: [],
    effect: Effect.gen(function* () {
      const connect = (pc: PrismaClient) =>
        Effect.tryPromise({
          catch: PrismaConnectError.new(),
          try: () => pc.$connect(),
        })

      const disconnect = (pc: PrismaClient) =>
        Effect.tryPromise({
          catch: PrismaDisconnectError.new(),
          try: () => pc.$disconnect(),
        })

      yield* connect(prismaClient)

      return {
        connect,
        disconnect,
        prismaClient,
      }
    }),
  }
) {}
