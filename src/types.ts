import { WPLATEST_ACTIONS } from './constants'

export type Maybe<T> = T | undefined | null
export type WPLatestAction = (typeof WPLATEST_ACTIONS)[number]

export type ApiOptions = {
  secret: string
}

export type ApiErrorResponse = {
  message: string
  errors: Record<string, { message: string; errorCode: string }[]>
}

export type CreateNewVersionInput = {
  plugin_id: string
  slug: string
  zip_url: string
}

export type CreateNewVersionResponse = {
  id: string
  version: string
}
