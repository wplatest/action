import { WPLATEST_ACTIONS } from './constants'

export type Maybe<T> = T | undefined | null
export type WPLatestAction = (typeof WPLATEST_ACTIONS)[number]

export type ApiOptions = {
  // Tokens are optional as not all API endpoints require authentication
  token: string | null
}

export type ApiErrorResponse = {
  message: string
  errors: Record<string, { message: string; errorCode: string }[]>
}

export type CreateNewVersionInput = {
  plugin_id: string
  zip_url: string
}

export type CreateNewVersionResponse = {
  id: string
  version: string
}
