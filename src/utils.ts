import { getInput } from '@actions/core'
import type { ApiOptions, CreateNewVersionInput, WPLatestAction } from './types'
import { WPLATEST_API_BASE } from './constants'

export const getWorkflowInput = (): {
  GITHUB_TOKEN: string
  WPLATEST_SECRET: string
  WPLATEST_ACTION: WPLatestAction
  WPLATEST_PLUGIN_ID: string
  WPLATEST_SLUG: string
  ARTIFACT_URL: string
} => {
  const GITHUB_TOKEN = getInput('github-token')
  const WPLATEST_SECRET = getInput('wplatest-secret', { required: true })
  const WPLATEST_ACTION = getInput('wplatest-action') as WPLatestAction
  const WPLATEST_PLUGIN_ID = getInput('wplatest-plugin-id')
  const WPLATEST_SLUG = getInput('wplatest-slug', { required: true })
  const ARTIFACT_URL = getInput('wplatest-artifact-zip-url')

  return {
    ARTIFACT_URL,
    GITHUB_TOKEN,
    WPLATEST_SECRET,
    WPLATEST_ACTION,
    WPLATEST_PLUGIN_ID,
    WPLATEST_SLUG
  }
}

const commonHeaders = (secret: string) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${secret}`
  } as Record<string, string>

  return headers
}

export async function createNewVersion(
  config: CreateNewVersionInput,
  { secret }: ApiOptions
) {
  return await fetch(`${WPLATEST_API_BASE}/plugin/update`, {
    method: 'POST',
    headers: commonHeaders(secret),
    body: JSON.stringify(config)
  })
}
