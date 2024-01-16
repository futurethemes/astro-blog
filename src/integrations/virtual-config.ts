import config from  'virtual:astro-blog/user-config'
import { type AstroBlogConfig as IAstroBlogConfig } from '../schema/UserConfigSchema'

export const AstroBlogConfig = config satisfies IAstroBlogConfig
