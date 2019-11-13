import { Component, OnInit, Input } from '@angular/core';
import { STColumn, STChange } from '@delon/abc';
import { BaseOfSimpleTable } from '../../comm';
import { ApiResToComponent, ShowModalService } from 'app/basic';
import { SFSchema } from '@delon/form';
import { Observable } from 'rxjs';
import { SEARCH_PRODUCT_SCHEMA } from './search-product';
import { ProductEditComponent } from './edit.component';
import { ProductDetial } from './interface';
import { ProductService } from './product.service';
import { ProductUploadComponent } from './upload.component';
import { ProductViewComponent } from './view.component';

@Component({
  selector: 'app-log-page',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductPageComponent extends BaseOfSimpleTable implements OnInit {
  defaultDataRules: any;

  params: ProductDetial;
  searchSchema: SFSchema = SEARCH_PRODUCT_SCHEMA;

  scroll = { x: '900px' };

  @Input()
  domain = 'product';
  title = '产品管理';
  head_content = '所有产品信息。';
  selectedItem: any = {};
  slaveQueryParams: any = {};
  count: number;
  ps = 10;
  // 日志列表
  productDataList = [];

  columns: STColumn[] = [
    {
      title: '产品名称',
      index: 'name',
      className: 'text-center',
      width:'10%'
    },
    {
      title: '版本号',
      index: 'versoin',
      // width: '130px',
      className: 'text-center',
      width:'10%'
    },
    {
      title: '产品功能',
      index: 'json',
      // width: '80px',
      className: 'text-center',
      width:'30%',
    },
    {
      title: '备注信息',
      index: 'remark',
      className: '',
      width:'40%',
      format: (e: any) => {
        if(e.remark){
          if(e.remark.length>90){
            
            return  e.remark.substr(0,90)+'...';
          }else{
            return e.remark;
          }
        }
        return '';

      }
    },
    {
      title: '操作',
      width:'10%',
      className: 'text-center',
      buttons: [
        {
          text: '编辑',
          icon: 'edit',
          click: (record: any) => this.editProduct(record),
        },
        // {
        //   text: '导入',
        //   pop:true ,
        //   popTitle: '导入新数据将会覆盖就数据，确定要导入吗？',
        //   click: item => {
        //     this.modal.creatStaticModal(ProductUploadComponent, item, "md", { nzTitle: item.name + " 功能维护" }).subscribe(res => { this.ngOnInit() });
        //   },
        // },
        {
          text: '<span class="text-error">删除</span>',
          type: 'del',
          popTitle: '确定删除此产品吗？',
          click: item => {
            this.delProduct(item);
          },
        },
      ],
    },
  ];

  constructor(
    public modal: ShowModalService,
    public ProductSer: ProductService,
  ) {
    super();
  }

  // 路由复用时，进入当前页会执行的方法，可以在此调用此页的初始化方法
  _onReuseInit() {
    this.ngOnInit();
  }

  // 当路由复用时，离开当前页会执行的方法，根据需要自行设置
  _onReuseDestroy() { }

  operations: STColumn[] = [];

  ngOnInit() {
    // 获取角色列表
    this.getProductList();
    // 执行继承对象的ngOnInit方法
    // super.ngOnInit();


  }

  getProductList() {
    this.ProductSer.getAllProductList().subscribe((res: ApiResToComponent) => {
      if (res) {
        this.productDataList = res.items;
      }
    });
  }

  getListDataOfRules(): Observable<ApiResToComponent> {
    throw new Error('Method not implemented.');
  }
  getAllListData(): Observable<ApiResToComponent> {
    throw new Error('Method not implemented.');
  }
  // 新增产品信息
  addProduct() {
    this.modal
      .creatStaticModal(ProductEditComponent, '', 'lg', {
        nzTitle: '新增产品信息',
      })
      .subscribe(res => {
        this.ngOnInit();
      });
  }
  // 编辑产品信息
  editProduct(e: ProductDetial) {
    this.modal
      .creatStaticModal(ProductEditComponent, { item: e }, 'lg', {
        nzTitle: '修改 ' + e.name + ' 信息',
      })
      .subscribe(res => {
        this.ngOnInit();
      });
  }

  // 删除产品信息
  delProduct(e: ProductDetial) {
    this.ProductSer.delProduct(e).subscribe((res: ApiResToComponent) => {
      if (res) {
        this.ngOnInit();
      }
    });
  }
  // 重置
  reSetDataGet() {
    this.ngOnInit();
  }
  // 搜索
  searchDataGet(e: ProductDetial) {
    this.ProductSer.getProductList(e).subscribe((res: ApiResToComponent) => {
      if (res) {
        this.productDataList = res.items;
      }
    });
  }

  views(e:STChange){
    this.modal.creatModal(ProductViewComponent,  { item: e.click.item}, 'lg', {
      nzTitle: e.click.item.name+'信息',
    })
    .subscribe(res => {
    })
  }
}
