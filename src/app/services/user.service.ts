import { Injectable } from '@angular/core'
import { Api } from './api.service'

@Injectable()
export class UserService {
  document: string = 'user/'

  constructor(private api: Api) {}

  async getByEmail(email: string) {
    const response: any = await this.api.get(this.document + 'email/' + email)
    return response.user
  }
}
