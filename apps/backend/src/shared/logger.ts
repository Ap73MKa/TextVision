import fs from 'fs'
import path from 'path'

import appPath from '@/shared/app-path.ts'

const logDir = './logs'
const logPath = path.join(appPath, './static', logDir)
if (!fs.existsSync(logPath)) fs.mkdirSync(logPath, { recursive: true })

const logger = import.meta.env.DEV
  ? {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss.l',
          ignore: 'pid,hostname',
        },
      },
    }
  : {
      level: 'warn',
      file: logDir + '/warn-logs.log',
    }

export default logger
