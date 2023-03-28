import fs from 'node:fs'
import type { CommonServerOptions } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { DotenvParseOutput } from 'dotenv'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig((envConfig) => {
  console.log({ envConfig })

  // concat current filename
  const envFileName = '.env'
  const curEnvFileName = `${envFileName}.${envConfig.mode}`

  // config for env of development mode
  const curEnv: string = envConfig.mode
  let server: CommonServerOptions = {}

  const envData = fs.readFileSync(curEnvFileName)
  const envMap: DotenvParseOutput = dotenv.parse(envData)

  if (curEnv === 'development') {
    server = {
      port: envMap.VITE_PORT,
      host: envMap.VITE_HOST,
      proxy: {
        [envMap.VITE_BASE_URL]: {
          target: envMap.VITE_PROXY_DOMAIN,
        },
      },
    }

    console.log('env -> development', server)
  }
  else if (curEnv === 'production') {
    console.log('env -> production', server)

    server = {
      port: envMap.VITE_PORT,
      host: envMap.VITE_HOST,
    }
  }
  return {
    plugins: [
      vue(),
    ],
    // server,
  }
})
