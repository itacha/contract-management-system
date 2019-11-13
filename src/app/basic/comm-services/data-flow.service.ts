import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataFlowObj } from './interface';

@Injectable()
export class DataFlowService {

    constructor() { }

    // 父子组件相互传值
    private DataFlow = new Subject<any>();
    DataFlow$ = this.DataFlow.asObservable();

    DataFlowToSomeOne(message: DataFlowObj) {
        this.DataFlow.next(message);
    }
    
    /**
     * 发布数据信息
     * @param key 
     * @param res 
     */
    sendDataFlow(key: string, res: any): void {
        const parmas: DataFlowObj = {
        uniqueKey: key,
        data: res,
        };
        this.DataFlowToSomeOne(parmas);
    }
}
