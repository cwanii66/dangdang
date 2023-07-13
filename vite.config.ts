/* eslint-disable no-console */
import fs from 'node:fs'
import { resolve } from 'node:path'
import type { CommonServerOptions } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { DotenvParseOutput } from 'dotenv'
import dotenv from 'dotenv'
// import Inspect from 'vite-plugin-inspect'

const publicSrc = resolve(__dirname, 'src')

/** @type {import('vite').UserConfig} */
export default defineConfig((envConfig) => {
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
  }
  else if (curEnv === 'production') {
    server = {
      port: envMap.VITE_PORT,
      host: envMap.VITE_HOST,
    }
  }
  return {
    resolve: {
      alias: {
        '@': `${publicSrc}/`,
      },
    },
    plugins: [
      vue(),
    ],
    server,
  }
})
