export const isDev = process.env.NODE_ENV === 'development'

export const isTest = process.env.NODE_ENV === 'test'

export const isProduction = process.env.NODE_ENV === 'production'

export const apiDomain = isDev ? '' : ''
