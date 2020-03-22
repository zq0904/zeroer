import { NODE_ENV } from '../types'
const isPrd = process.env.NODE_ENV === NODE_ENV.PRODUCTION

export { isPrd }
