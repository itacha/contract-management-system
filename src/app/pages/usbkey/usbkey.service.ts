import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';

@Injectable()
export class UsbkeyService {
  constructor(public client: _HttpClient) {}
}
