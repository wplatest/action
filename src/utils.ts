import { getInput } from '@actions/core'
import type { ApiOptions, CreateNewVersionInput, WPLatestAction } from './types'
import { WPLATEST_API_BASE } from './constants'

export const getWorkflowInput = (): {
  GITHUB_TOKEN: string
  WPLATEST_TOKEN: string | null
  WPLATEST_ACTION: WPLatestAction
  WPLATEST_PLUGIN_ID: string
  ARTIFACT_URL: string
} => {
  const GITHUB_TOKEN = getInput('github-token')
  const WPLATEST_TOKEN =
    getInput('wplatest-token', {
      required: false
    }) ?? null
  const WPLATEST_ACTION = getInput('wplatest-action') as WPLatestAction
  const WPLATEST_PLUGIN_ID = getInput('wplatest-plugin-id')
  const ARTIFACT_URL = getInput('wplatest-artifact-zip-url')

  return {
    ARTIFACT_URL,
    GITHUB_TOKEN,
    WPLATEST_TOKEN,
    WPLATEST_ACTION,
    WPLATEST_PLUGIN_ID
  }
}

const commonHeaders = (token: string | null) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  } as Record<string, string>

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}

export async function createNewVersion(
  config: CreateNewVersionInput,
  { token }: ApiOptions
) {
  return await fetch(`${WPLATEST_API_BASE}/plugin/update`, {
    method: 'POST',
    headers: commonHeaders(token),
    body: JSON.stringify(config)
  })
}
