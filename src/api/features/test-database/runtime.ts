import { Layer, ManagedRuntime } from 'effect'

import { TestDatabaseService } from './service'

const serviceDendencies = Layer.mergeAll(TestDatabaseService.Default)

export const TestDatabaseRuntime = ManagedRuntime.make(serviceDendencies)
