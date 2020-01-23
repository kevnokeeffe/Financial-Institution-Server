import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

export function setEnvironment(app) {
  if (process.env.NODE_ENV !== 'production') {
    setDevEnv(app)
  } else {
    setProdEnv(app)
  }
}

function setDevEnv(app) {
  console.log('setting development environment')
  app.use(morgan('dev'))
  app.use(cors())
}

function setProdEnv(app) {
  console.log('setting production environment')
}
