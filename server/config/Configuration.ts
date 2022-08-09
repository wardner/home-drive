import dotenv from 'dotenv'
dotenv.config({
  path: '.env'
})

export const Configuration = {
  server: {
    port: parseInt(process.env.PORT as string),
    prefixRoutes: process.env.PREFIX_ROUTES,
  },
  database: {
    storage: process.env.HOME_CLOUD_STORAGE || 'notfound'
  }
}
