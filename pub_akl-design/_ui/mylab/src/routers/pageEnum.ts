export const PageEnum = {
  ROOT_PATH: '/',
  LOGIN: '/login',
  PARTNER_LOGIN: '/members/my-info/login',
  PARTNER_ROOT: '/members/my-info',
  PARTNER_WELCOME: '/mylabmember',

  MEMBER_TERMS: '/members/terms',

  NOT_FOUND: '/:all(.*)*',
  NOT_PERMISSION: '/not-permission',
  SYSTEM_ERROR: '/error',
} as const
export type PageEnum = typeof PageEnum[keyof typeof PageEnum]
