import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService } from 'app/basic';
import { map } from 'rxjs/operators';


@Injectable()
export class NewService extends CommBasicService {
  constructor(public injector: Injector) {
    super(injector);
  }


 
}
