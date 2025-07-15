import { Layer, ManagedRuntime } from 'effect'

import { ExamDatabaseService } from './service'

const serviceDendencies = Layer.mergeAll(ExamDatabaseService.Default)

export const TestDatabaseRuntime = ManagedRuntime.make(serviceDendencies)
