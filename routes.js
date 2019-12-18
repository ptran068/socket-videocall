import { Router } from 'express'
import { UserRouter, HomeRouter, RoomRouter, ChatRouter } from './app/router/index'

export default () => {
  const api = Router()

  // api.use('*', authenticator)
  api.use('/user/', UserRouter)
  api.use('/chat/', ChatRouter)
  api.use('/room/', RoomRouter)
  api.use('/', HomeRouter)

  return api
}