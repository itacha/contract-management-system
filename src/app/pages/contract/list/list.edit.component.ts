import { Component, Input, ViewChild, ElementRef,OnChanges  } from '@angular/core';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import {
  SFSchema,
  FormProperty,
  PropertyGroup,
  SFSchemaEnumType,
  SFComponent,
  SFSchemaEnum,
} from '@delon/form';
import { _HttpClient } from '@delon/theme';
import {
  NzModalRef,
  NzMessageService,
  UploadFile,
  UploadFilter,
} from 'ng-zorro-antd';
import { BaseOfSimpleForm } from '../../comm';
import { Observable, of } from 'rxjs';
import { ListService } from './list.service';
import { ContractDetial } from './interface';
import { ApiUrlDataService, ApiResToComponent } from 'app/basic';
@Component({
  selector: 'app-contract-list-edit',
  templateUrl: './list.edit.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListEditComponent extends BaseOfSimpleForm {
  @Input()
  item: any;
  // 产品列表
  optionList: any[] = [];
  originFunction: any[] = [];
  // 已选择的产品列表
  listOfSelectedValue = [];
  periodType = null;
  finalObj = [];
  id111: '';
  apiHost = this.apiUrl.apiHost;

  formItem: any = [];
  @Input()
  asyncData: () => Observable<SFSchemaEnumType[]>;
  uploading = false;

  profileList: UploadFile[] = [];
  profileList1: UploadFile[] = [];
  profileList1s: { [key: string]: UploadFile[] } = {};
  today = new Date();
  // 附件列表
  fileList: UploadFile[] = [];
  // fileList2: UploadFile[] = [];

  // 删除附件
  deleteFilesUid: string[] = [];
  //json
  json1: any;

  constructor(
    public NzModal: NzModalRef,
    private message: NzMessageService,
    public listService: ListService,
    private apiUrl: ApiUrlDataService,
    private el: ElementRef,
  ) {
    super(NzModal);
  }
  ngOnInit() {
    this.loadMore();
    this.getContractProduct();
    // 获取文件
    this.listService
      .getContractAttachmentList({ contractId: this.item.contractId })
      .subscribe(res => {
        this.fileList = res;
        this.profileList = res;
        this.profileList = this.profileList.filter(e => {
          return e.productId !== '0';
        });
        this.fileList = this.fileList.filter(e => {
          return e.productId == '0';
        });
        // res.forEach(element => {
        //   console.log(element.productId=='0')
        //   if(element.productId=='0'){
        //     this.fileList.push(element);
        //   }else{
        //     this.profileList.push(element)
        //   }
        // });
        // console.log(this.fileList,'color:blue')
        // console.log(this.profileList,'color:blue')
      });

    Object.assign(this.formItem, this.item);

    //如果存在产品id则查询产品数据
    if (this.item.productId) {
      this.schema.properties.functions.ui = {
        widget: 'checkbox',
        grid: {
          span: 24,
        },
        hidden: false,
        asyncData: () =>
          this.listService.findProductFunctionsList({
            id: this.item.productId,
          }),
        change: (res: SFSchemaEnum[]) => {
          if (res.length > 0) {
            this.json1 = {};
            res.forEach(element => {
              this.json1[element.value] = element.label;
            });
          }
        },
      };
      // this.listService.findProductFunctionsList2({id: this.item.productId}).subscribe((res: ApiResToComponent) => {
      //   if (res) {
      //     this.sf.refreshSchema();
      //     this.schema.properties.functions.enum = res.items;
      //   }
      // });
    }
  }
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    // console.log(this.item);
    this.fileList.forEach((file: any) => {
      file.filename = 'contract';
    });
    if (this.item.contractId) {
      this.el.nativeElement.querySelector('#MySubmit').disabled = false;
    }
    return false;
  };
  test2(id) {
    this.id111 = id;
    this.profileList.forEach((file: any) => {
      file.filename = id;
    });
    // if(this.listOfSelectedValue){
    //   this.listOfSelectedValue.forEach(element => {
    //     if(element.profileList){
    //       element.profileList.forEach((file: any) => {
    //         console.log(oid)
    //         file.filename = oid
    //       });
    //     }

    //   });
    // }
  }
  beforeUpload2 = (file: UploadFile): boolean => {
    file.filename = this.id111;

    this.profileList1s[this.id111].push(file);
    // this.profileList1.push(file);
    if (this.item.contractId) {
      this.el.nativeElement.querySelector('#MySubmit').disabled = false;
    }
    return false;
  };
  removeFiles = (file: UploadFile): boolean => {
    // 从文件列表删除文件
    this.fileList.splice(
      this.fileList.findIndex(element => element.uid === file.uid),
      1,
    );
    this.deleteFilesUid.push(file.uid);
    if (this.item.contractId) {
      this.el.nativeElement.querySelector('#MySubmit').disabled = false;
    }
    return true;
  };
  removeFiles2 = (file: UploadFile, i): boolean => {
    // 从文件列表删除文件
    this.profileList1s[this.id111].splice(
      this.profileList1s[this.id111].findIndex(element => element.uid === file.uid),
      1,
    );
    this.deleteFilesUid.push(file.uid);
    if (this.item.contractId) {
      this.el.nativeElement.querySelector('#MySubmit').disabled = false;
    }
    return true;
  };

  filters: UploadFilter[] = [
    {
      name: 'type',
      fn: (fileList: UploadFile[]) => {
        const filterFiles = fileList.filter(
          w =>
            ~[
              'image/jpeg',
              'image/png',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'application/vnd.ms-excel',
              'application/pdf',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ].indexOf(w.type),
        );
        if (filterFiles.length !== fileList.length) {
          this.message.error(
            `包含文件格式不正确，只支持doc，docx，xls，xlsx，pdf，jpg，png格式。`,
          );
          return filterFiles;
        }
        return fileList;
      },
    },
  ];
  filters2: UploadFilter[] = [
    {
      name: 'type',
      fn: (fileList: UploadFile[]) => {
        const filterFiles = fileList.filter(
          w =>
            ~[
              'image/jpeg',
              'image/png',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'application/vnd.ms-excel',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              'application/pdf',
            ].indexOf(w.type),
        );
        if (filterFiles.length !== fileList.length) {
          this.message.error(
            `包含文件格式不正确，只支持doc，docx，xls，xlsx，pdf，jpg，png格式。`,
          );
          return filterFiles;
        }
        return fileList;
      },
    },
  ];
  // 表单编辑数据结构
  @ViewChild('sfUser') sf: SFComponent;
  schema: SFSchema = {
    properties: {
      contractName: {
        type: 'string',
        title: '合同名称',
        ui: {
          placeholder: '请输入合同名称',
          grid: {
            span: 24,
          },
        },
        maxLength: 200,
      },
      contractNum: {
        type: 'string',
        title: '合同编号',
        ui: {
          placeholder: '请输入合同编号',
          grid: {
            span: 12,
          },
        },
        maxLength: 40,
      },

      contractAmount: {
        type: 'string',
        title: '合同金额(元)',
        ui: {
          // addOnAfter: 'RMB',
          placeholder: '请输入合同金额',
          // precision: 2,
          grid: {
            span: 12,
          },
        },
        // maximum: 999999999.99,
      },
      customerId: {
        type: 'string',
        title: '合同甲方',
        ui: {
          widget: 'select',
          grid: {
            span: 12,
          },
          asyncData: () => this.listService.findCustomerSelectList({}),
        },
      },
      userIdArray: {
        type: 'string',
        title: '乙方联系人',
        ui: {
          grid: {
            span: 12,
          },
          widget: 'cascader',
          asyncData: () => this.asyncData(),
        },
      },
      // productId: {
      //   type: 'string',
      //   title: '产品名称',
      //   ui: {
      //     widget: 'select',
      //     mode: 'tags',
      //     grid: {
      //       span: 12,
      //     },
      //     asyncData: () => this.listService.findProductList({}),
      //     notFoundContent: '未获取到产品信息',
      //     change: (ngModel: any) => {
      //       //选择选项时的回调函数
      //       this.listService.findProductFunctionsList2({ id: ngModel }).subscribe((res: ApiResToComponent) => {
      //         if (res) {
      //           Object.assign(this.sf.formData, this.sf.value);
      //           this.schema.properties.functions.enum = res.items;
      //           this.schema.properties.functions.ui = {
      //             widget: 'checkbox',
      //             grid: {
      //               span: 24,
      //             },
      //             hidden: false,
      //             change: (res: SFSchemaEnum[]) => {
      //               if (res.length > 0) {
      //                 this.json1 = {};
      //                 res.forEach(element => {
      //                   this.json1[element.value] = element.label;
      //                 });
      //               }
      //             }
      //           };
      //           this.sf.refreshSchema();
      //         }
      //       });

      //     }
      //   }
      // },
      // periodType: {
      //   type: 'string',
      //   title: '期限类型',
      //   enum: [
      //     { label: '永久', value: '0' },
      //     { label: '时间段', value: '1' },
      //   ],
      //   ui: {
      //     widget: 'select',
      //     grid: {
      //       span: 12,
      //     },
      //     change: (ngModel: any) => {

      //     }
      //   }
      // },
      // functions: {
      //   type: 'string',
      //   title: '产品功能',
      //   ui: {
      //     widget: 'checkbox',
      //     grid: {
      //       span: 24,

      //     },
      //     hidden: true,
      //     change: (res: SFSchemaEnum[]) => {
      //       if (res.length > 0) {
      //         this.json1 = {};
      //         res.forEach(element => {
      //           this.json1[element.value] = element.label;
      //         });
      //       }
      //     }
      //   },

      // },

      // startTime: {
      //   type: 'string',
      //   title: '授权期限',
      //   ui: {
      //     widget: 'date',
      //     end: 'endTime',
      //     grid: {
      //       span: 24,
      //     },
      //   },

      // },
      // endTime: {
      //   type: 'string',
      //   ui: {
      //     widget: 'date'
      //   },
      // },
      remark: {
        type: 'string',
        title: '备注',
        ui: {
          placeholder: '请输入备注',
          grid: {
            span: 24,
          },
          widget: 'textarea',
          autosize: { minRows: 2, maxRows: 6 },
        },
        maxLength: 400,
        default: null,
      },
    },
    required: [
      'contractName',
      'contractNum',
      'contractAmount',
      'customerId',
      'userIdArray',
    ],
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 24,
      },
    },
    // if: {
    //   properties: { periodType: { enum: ['1'] } }
    // },
    // then: {
    //   required: ['startTime']
    // },
  };
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };
  //删除产品
  deletePro(id){
    this.listOfSelectedValue=this.listOfSelectedValue.filter(ele=>{
      return ele.productId!==id
    })
    this.loadMore()
  }
  // 编辑时获取合同中已选择的产品
  getContractProduct() {
    if (this.item.contractId) {
      this.listService
        .getContractProduct({ contractId: this.item.contractId })
        .subscribe(res => {
          this.listOfSelectedValue = res.items;
          this.listOfSelectedValue.forEach((e, i) => {
            e.startTime = new Date(e.startTime);
            e.endTime = new Date(e.endTime);
            e.period = [e.startTime, e.endTime];
            e.corId = e.id;
            let newArr = [];
            let finalArr = [];
            let newObj = JSON.parse(this.listOfSelectedValue[i].json);
            for (const key in newObj) {
              newArr.push({ label: newObj[key], value: key, checked: true });
            }
            this.listOfSelectedValue[i].json = newArr;
            this.listService
              .findProductFunctionsList({ id: e.productId })
              .subscribe(res => {
                res.forEach((element, index) => {
                  this.listOfSelectedValue[i].json.forEach((ele, ind) => {
                    if (ele.value == element['value']) {
                      element['checked'] = true;
                    }
                  });
                  finalArr.push(element);
                });
                this.listOfSelectedValue[i].json = finalArr;
              });
          });
         
        });
    }
  }
  // 获取产品功能
  loadMore(): void {
    this.listService.findProductList2({}).subscribe(data => {
      this.optionList = data;
      this.initFiles(data);
      this.optionList.forEach(element => {
        let temp = JSON.parse(element.json.replace(/'/g, '"'));
        let newArr = [];
        for (const key in temp) {
          if (temp.hasOwnProperty(key)) {
            const element = temp[key];
            newArr.push({ label: element, value: key, checked: false });
          }
        }
        element.json = newArr;
      });
       //过滤已选产品
       let newArr1=[]
       this.optionList.forEach(ele=>{
         if (this.listOfSelectedValue&&this.listOfSelectedValue.length>0) {
          this.listOfSelectedValue.forEach(e => {
            if(ele.id!==e.productId){
              newArr1.push(ele)
            }
          });
         }
       })
       this.optionList=newArr1.length>0?newArr1:this.optionList
    });
  }
  // 处理产品功能
  functionSelect(value: object[], i: number): void {
    let newArr = this.listOfSelectedValue[i].json.filter(e => {
      return e.checked == true;
    });
    if (newArr.length > 0) {
      this.json1 = {};
      newArr.forEach(element => {
        this.json1[element.value] = element.label;
      });
    }
    this.listOfSelectedValue[i].functions = this.json1;
  }
  // 附件基础初始化
  initFiles(data: any) {
    data.forEach((element: any) => {
      this.profileList1s[element.id] = [];
    });
    // 获取文件
    this.listService
      .getContractAttachmentList({ contractId: this.item.contractId })
      .subscribe(res => {
        console.log(res, 'color:red');
        res.forEach((file: any) => {
          if (file.productId == '0') {
            this.fileList.push(file);
          } else {
            this.profileList1s[file.productId].push(file);
          }
        });
      });
  }
  // 日期格式化
  handleDate(date, fmt) {
    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length),
      );
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length),
        );
    return fmt;
  }
  //处理产品授权期限
  periodChange(result: Date, i: number): void {
    this.listOfSelectedValue[i].startTime = this.handleDate(
      new Date(+result[0]),
      'yyyy-MM-dd',
    );
    this.listOfSelectedValue[i].endTime = this.handleDate(
      new Date(+result[1]),
      'yyyy-MM-dd',
    );
  }

  // 处理提交的参数
  makeParmas(value: ContractDetial) {
    const userIdArray: string[] = value.userIdArray;
    value.userId = userIdArray[userIdArray.length - 1];
    return Object.assign(this.item, value);
  }

  // 删除附件
  async deleteContractAttachment(id: string) {
    const deleteParam = { attachmentId: id };
    await this.listService.deleteContractAttachment(deleteParam).subscribe();
  }

  // 发送数据到服务器
  sendToServer(value): Observable<any> {
    if (value.get('contractId') == null || value.get('contractId') === '') {
      return this.listService.addContract(value);
    } else {
      return this.listService.updateContract(value);
    }
  }
  newReset() {
    if (this.formItem.productId) {
      this.listService
        .findProductFunctionsList2({ id: this.formItem.productId })
        .subscribe((res: ApiResToComponent) => {
          if (res) {
            Object.assign(this.sf.formData, this.formItem);
            // this.schema.properties.functions.enum = res.items;
            // this.schema.properties.functions.ui = {
            //   widget: 'checkbox',
            //   grid: {
            //     span: 24,
            //   },
            //   hidden: false,
            //   change: (res: SFSchemaEnum[]) => {
            //     if (res && res.length > 0) {
            //       this.json1 = {};
            //       res.forEach(element => {
            //         this.json1[element.value] = element.label;
            //       });
            //     }
            //   },
            // };
            this.sf.refreshSchema();
          }
        });
    } else {
      this.sf.formData = [];
      this.listOfSelectedValue=[]
      this.fileList=[]
      // this.schema.properties.functions.ui = {
      //   widget: 'checkbox',
      //   grid: {
      //     span: 24,
      //   },
      //   hidden: true,
      //   change: (res: SFSchemaEnum[]) => {
      //     if (res.length > 0) {
      //       this.json1 = {};
      //       res.forEach(element => {
      //         this.json1[element.value] = element.label;
      //       });
      //     }
      //   }
      // };

      this.sf.refreshSchema();
    }
  }

  checkPeriodType(){
    let flag=true
     this.listOfSelectedValue.forEach(item=>{
      if(!item.hasOwnProperty('periodType')) flag=false
    })
    return flag
  }
  checkPeriod(){
    let flag=true
     this.listOfSelectedValue.forEach(item=>{
      if(item.hasOwnProperty('periodType')&&item.periodType==1){
        if(!item.hasOwnProperty('period')) flag=false
      }
    })
    return flag
  }
  checkJson(){
    let flag=true
     this.listOfSelectedValue.forEach(item=>{
     flag=!item.json.every(e=>{
        return e.checked==false
      })
    })
    return flag
  }
  checkProfileList1s(){
    let flag=true
     this.listOfSelectedValue.forEach(element => {
       this.profileList1s[element.productId].length==0?flag=false:''
    })
    return flag
  }
  // 数据提交
  submit(value: any) {
    // 文件上传 组装formData
    const formData = new FormData();
    this.profileList.forEach((file: any) => {
      // this.fileList.push(file);
      formData.append(file.filename, file);
    });
    for (const key in this.profileList1s) {
      this.profileList1s[key].forEach((file: any) => {
        formData.append(file.filename, file);
      });
    }
    // this.listOfSelectedValue.forEach(element => {
    //     formData.append(element.id, element.profileList);
    //   // element.profileList.forEach((file: any) => {
    //   //   // file.filename=element.id
    //   //   formData.append(element.id, file);
    //   // });
    // });
    this.fileList.forEach((file: any) => {
      formData.append('contract', file);
    });
    this.uploading = true;
    this.listOfSelectedValue.forEach((element, index) => {
      let newObj = {
        productId: '',
        name: '',
        json: '',
        periodType: '',
        startTime: null,
        endTime: null,
        id: '',
      };
      if (element.corId) {
        newObj.productId = element.productId;
        newObj.id = element.corId;
      } else {
        newObj.productId = element.id;
      }
      newObj.name = element.name;
      newObj.json = element.functions;
      newObj.periodType = element.periodType;
      newObj.startTime = element.startTime;
      newObj.endTime = element.endTime;
      // this.finalObj[index]=newObj
      this.finalObj.push(newObj);
    });
    // listObj["lists"]=this.finalObj
    if (this.listOfSelectedValue) {
      // console.log(JSON.stringify(this.finalObj));
      formData.append('jsons', JSON.stringify(this.finalObj));
    }
    const param = this.makeParmas(value);
    if (param.contractAmount) {
      formData.append('contractAmount', param.contractAmount);
    }
    if (param.contractName) {
      formData.append('contractName', param.contractName);
    }
    if (param.contractNum) {
      formData.append('contractNum', param.contractNum);
    }
    if (param.customerId) {
      formData.append('customerId', param.customerId);
    }
    if (param.remark) {
      formData.append('remark', param.remark);
    } else {
      formData.append('remark', '');
    }
    if (param.userId) {
      formData.append('userId', param.userId);
    }
    if (param.userIdArray) {
      formData.append('userIdArray', param.userIdArray);
    }
    this.deleteFilesUid.forEach((del: string) => {
      formData.append('deleteAttachmentIds', del);
    });
    if (value.contractId) {
      formData.append('contractId', param.contractId);
    }
    // if (value.productId) {
    //   formData.append('productId', param.productId);
    // }
    // if (value.periodType) {
    //   formData.append('periodType', param.periodType);
    // }
    // if (value.startTime) {
    //   formData.append('startTime', param.startTime);
    // } else {
    //   formData.append('startTime', '');
    // }
    // if (value.endTime) {
    //   formData.append('endTime', param.endTime);
    // } else {
    //   formData.append('endTime', '');
    // }
    //产品功能
    // if (this.json1) {
    //   formData.append('json', JSON.stringify(this.json1));
    // }

    // 发送请求
    this.sendParmas(formData);
  }
}
