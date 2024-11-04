import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const appPath = path.join(dirname, '../../')

export default appPath
