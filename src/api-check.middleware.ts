import { BadRequestException } from '@nestjs/common'
import { NextFunction } from 'express'
import users from '../private-data/keys.json'

export function apiCheck(request: any, _: Response, next: NextFunction) {
  const apiKey: string = request.query.apiKey
  if (!apiKey) {
    throw new BadRequestException('You must provide a valid API key.')
  } else {
    for (let user of users) {
      if (user.key === apiKey) {
        request['user'] = user
        return next()
      }
    }
    throw new BadRequestException('The API key you provided was invalid.')
  }
}
