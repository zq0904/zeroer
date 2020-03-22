import path from 'path'

const resolve = (...pathSegments: string[]) => path.resolve(...pathSegments)

export { resolve }
