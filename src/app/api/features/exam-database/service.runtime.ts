import { Duration, Layer, ManagedRuntime, Option } from 'effect'

import { CacheProvider } from '../../providers/cache'
import { ExamDatabaseService } from './service'

const serviceDendencies = Layer.mergeAll(
  CacheProvider.Default(Option.some(Duration.minutes(5))),
  ExamDatabaseService.Default
)

export const ExamDatabaseServiceRuntime = ManagedRuntime.make(serviceDendencies)
