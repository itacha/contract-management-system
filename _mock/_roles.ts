import * as Mock from 'mockjs';
import { FormSets } from 'types/types';
import { NzTreeNode } from 'ng-zorro-antd';
import { MockRequest } from '@delon/mock';
import { deepCopy } from '@delon/util';
import { ColumnSets } from 'generated';

const role_columnSets: ColumnSets = {

};
const role_formSets: FormSets = {
    // 默认选项
    default: {
        title: '角色详情',
        properties: {
            name: {
                type: 'string',
                title: '角色名',
                description: '请输入角色名，角色名最长支持20个字符。',
                ui: {
                    placeholder: '请输入角色名...',
                    grid: {
                        span: 24,
                    },
                },
                maxLength: 20,
            },
            description: {
                type: 'string',
                title: '描述',
                description: '请输入角色描述信息。',
                default: '无',
                ui: {
                    widget: 'textarea',
                    placeholder: '请输入角色描述信息...默认无',
                    autosize: { minRows: 2, maxRows: 6 },
                    grid: {
                        span: 24,
                    },
                },
            }
        },
        required: [
            'name',
            'description',
        ],
        ui: {
            spanLabelFixed: 100,
            grid: {
                span: 24,
            },
        }
    },
    // 查询选项
    query: {
        title: '查询角色',
        properties: {
            name: {
                type: 'string',
                title: '角色名',
                description: '请输入角色名，角色名最长支持20个字符。',
                ui: {
                    placeholder: '请输入角色名...',
                    grid: {
                        span: 24,
                    },
                },
                maxLength: 20,
            },
            description: {
                type: 'string',
                title: '描述',
                description: '请输入角色描述信息。',
                default: '无',
                ui: {
                    widget: 'textarea',
                    placeholder: '请输入角色描述信息...默认无',
                    autosize: { minRows: 2, maxRows: 6 },
                    grid: {
                        span: 24,
                    },
                },
            }
        },
        required: [
            'name',
            'description',
        ],
        ui: {
            spanLabelFixed: 100,
            grid: {
                span: 24,
            },
        }
    },
    // 新增选项
    add: {
        title: '新建角色',
        properties: {
            name: {
                type: 'string',
                title: '角色名',
                description: '请输入角色名，角色名最长支持20个字符。',
                ui: {
                    placeholder: '请输入角色名...',
                    grid: {
                        span: 24,
                    },
                },
                maxLength: 20,
            },
            description: {
                type: 'string',
                title: '描述',
                description: '请输入角色描述信息。',
                default: '无',
                ui: {
                    widget: 'textarea',
                    placeholder: '请输入角色描述信息...默认无',
                    autosize: { minRows: 2, maxRows: 6 },
                    grid: {
                        span: 24,
                    },
                },
            }
        },
        required: [
            'name',
            'description',
        ],
        ui: {
            spanLabelFixed: 100,
            grid: {
                span: 24,
            },
        }
    },
    // 编辑选项
    edit: {
        title: '编辑角色',
        properties: {
            name: {
                type: 'string',
                title: '角色名',
                description: '请输入角色名，角色名最长支持20个字符。',
                ui: {
                    placeholder: '请输入角色名...',
                    grid: {
                        span: 24,
                    },
                },
                maxLength: 20,
            },
            description: {
                type: 'string',
                title: '描述',
                description: '请输入角色描述信息。',
                default: '无',
                ui: {
                    widget: 'textarea',
                    placeholder: '请输入角色描述信息...默认无',
                    autosize: { minRows: 2, maxRows: 6 },
                    grid: {
                        span: 24,
                    },
                },
            }
        },
        required: [
            'name',
            'description',
        ],
        ui: {
            spanLabelFixed: 100,
            grid: {
                span: 24,
            },
        }
    },
};


const roles_list = {
    list: [
        {
            id: '1',
            name: 'role_1',
            description: 'role_description_1',
            permissions: [
                '100012'
            ]
        },
        {
            id: '2',
            name: 'role_2',
            description: 'role_description_2',
            permissions: [
                '1000121'
            ]
        },
        {
            id: '3',
            name: 'role_3',
            description: 'role_description_3',
            permissions: [
                '1000121', '100012'
            ]
        },
        {
            id: '4',
            name: 'role_4',
            description: 'role_description_4',
            permissions: [
                '100011', '100012', '1000122', '1000121'
            ]
        }
    ],
};

// 根据菜单编号找到上级菜单
export function getParentsByPermisIDs(PermisIDs: string | number): any {
    // let IDList = [];

}
// 根据角色ID，返回对应的权限
export function getInfomationByRoleID(roleID: string | number): any {
    const ID = roleID.toString();
    const deepCopy_menu_list = deepCopy(roles_list.list);
    let RoleInfomation = {};
    deepCopy_menu_list.forEach(element => {
        if (element.id === ID) {
            RoleInfomation = element;
        }
    });
    return RoleInfomation;
}



export const ROLES = {
    '/api/role/query': roles_list,
    '/api/role/config': {
        columnSets: role_columnSets,
        formSets: role_formSets
    },
    '/api/role/edit/:id': (req: MockRequest) => getInfomationByRoleID(req.params.id),
};
