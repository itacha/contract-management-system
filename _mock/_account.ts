import { MockRequest } from '@delon/mock';
import { ColumnSets, FormSets } from 'types/types';
import { deepCopy } from '@delon/util';

const account_columnSets: ColumnSets = {
    default: [
        { title: '姓名', index: 'ac_name', fixed: 'left', width: '100px' },
        {
            title: '用户组',
            index: 'ac_group',
            width: '130px',
            className: 'text-center',
        },
        {
            title: '用户角色',
            index: 'ac_roles',
            width: '130px',
            className: 'text-center',
        },
        {
            title: '用户状态',
            index: 'ac_status',
            width: '80px',
            type: 'tag',
            tag: {
                true: { text: '可用', color: 'green' },
                false: { text: '禁用', color: 'red' },
                },
            className: 'text-center',
        }
    ]
};
const account_formSets: FormSets = {
    // 默认选项
    default: {
        title: '用户组详情',
        properties: {
            name: {
                type: 'string',
                title: '用户组名',
                description: '请输入用户组名，用户组名最长支持20个字符。',
                ui: {
                    placeholder: '请输入用户组名...',
                    grid: {
                        span: 24,
                    },
                },
                maxLength: 20,
            },
            description: {
                type: 'string',
                title: '描述',
                description: '请输入用户组描述信息。',
                default: '无',
                ui: {
                    widget: 'textarea',
                    placeholder: '请输入用户组描述信息...默认无',
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
        title: '查询用户组',
        properties: {
            name: {
                type: 'string',
                title: '用户组名',
                description: '请输入用户组名，用户组名最长支持20个字符。',
                ui: {
                    placeholder: '请输入用户组名...',
                    grid: {
                        span: 24,
                    },
                },
                maxLength: 20,
            },
            description: {
                type: 'string',
                title: '描述',
                description: '请输入用户组描述信息。',
                default: '无',
                ui: {
                    widget: 'textarea',
                    placeholder: '请输入用户组描述信息...默认无',
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
        title: '新建用户组',
        properties: {
            name: {
                type: 'string',
                title: '用户组名',
                description: '请输入用户组名，用户组名最长支持20个字符。',
                ui: {
                    placeholder: '请输入用户组名...',
                    grid: {
                        span: 24,
                    },
                },
                maxLength: 20,
            },
            description: {
                type: 'string',
                title: '描述',
                description: '请输入用户组描述信息。',
                default: '无',
                ui: {
                    widget: 'textarea',
                    placeholder: '请输入用户组描述信息...默认无',
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
        title: '编辑用户组',
        properties: {
            name: {
                type: 'string',
                title: '用户组名',
                description: '请输入用户组名，用户组名最长支持20个字符。',
                ui: {
                    placeholder: '请输入用户组名...',
                    grid: {
                        span: 24,
                    },
                },
                maxLength: 20,
            },
            description: {
                type: 'string',
                title: '描述',
                description: '请输入用户组描述信息。',
                default: '无',
                ui: {
                    widget: 'textarea',
                    placeholder: '请输入用户组描述信息...默认无',
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


const accounts_list = {
    list: [{
        ac_id: '1',
        ac_name: 'name_1',
        ac_group: '1001',
        ac_roles: 'roles_01',
        ac_status: true,
    }, {
        ac_id: '2',
        ac_name: 'name_2',
        ac_group: '1002',
        ac_roles: 'roles_01',
        ac_status: true,
    }, {
        ac_id: '3',
        ac_name: 'name_3',
        ac_group: '1002',
        ac_roles: 'roles_01',
        ac_status: true,
    }, {
        ac_id: '4',
        ac_name: 'name_4',
        ac_group: '1002',
        ac_roles: 'roles_03',
        ac_status: true,
    }, {
        ac_id: '5',
        ac_name: 'name_5',
        ac_group: '1001',
        ac_roles: 'roles_01',
        ac_status: false,
    }],
    total: 5
};
export function getAccountAbout() {
    return {
        columnSets: deepCopy(account_columnSets),
        formSets: deepCopy(account_formSets)
    };
}

export const ACCOUNT = {
    '/api/account/query': accounts_list,
    '/api/account/config': getAccountAbout(),
    // '/api/menu/query/roldId/:id': (req: MockRequest) => getMenuAndPermissionsByRoleID(req.params.id),
};
