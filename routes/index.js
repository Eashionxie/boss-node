import userRoutes from './user'
import jobRoutes from './job'
import companyRoutes from './company'
import commonRoutes from './common'

export default app => {
  app.use('/mini-api/user', userRoutes)
  app.use('/mini-api/job', jobRoutes)
  app.use('/mini-api/company', companyRoutes)
  app.use('/mini-api/file', commonRoutes)
}