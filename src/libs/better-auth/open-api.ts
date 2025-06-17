import { auth } from './server'

const getSchema = async () => auth.api.generateOpenAPISchema()

const authOpenAPI = {
  components: getSchema().then(({ components }) => components) as Promise<Record<string, unknown>>,
  getPaths: (prefix = '/api/auth') =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null)

      for (const path of Object.keys(paths)) {
        const key = prefix + path
        const pathValue = paths[path]
        if (pathValue) {
          reference[key] = pathValue

          for (const method of Object.keys(pathValue)) {
            const operation = (reference[key] as Record<string, unknown>)[method]
            ;(operation as { tags?: string[] }).tags = ['Authentication']
          }
        }
      }

      return reference
    }) as Promise<Record<string, Record<string, unknown>>>,
} as const

export { authOpenAPI }
