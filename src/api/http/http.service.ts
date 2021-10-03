import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HttpService {
  constructor() { }

  public async getRequest(url: string): Promise<undefined> {
    const { data } = await axios.get(url);

    return data;
  }
}
