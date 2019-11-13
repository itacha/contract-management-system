import * as Mock from 'mockjs';
import { MockRequest } from '@delon/mock';
import { deepCopy } from '@delon/util';


const menu_list = {
    list: [
        {
            id: '1',
            name: 'name1',
            permissions: ['123', '123'],
            checked: false,
            expanded: false,
        }, {
            id: '2',
            name: 'name2',
            parent_id: '1',
            permissions: ['123', '123'],
            checked: false,
            expanded: false,
        }, {
            id: '3',
            name: 'name3',
            parent_id: '1',
            permissions: ['123', '123'],
            checked: false,
            expanded: false,
        }, {
            id: '4',
            name: 'name4',
            parent_id: '1',
            permissions: ['123', '123'],
            checked: false,
            expanded: false,
        }, {
            id: '5',
            name: 'name5',
            parent_id: '1',
            permissions: ['123', '123'],
            checked: false,
            expanded: false,
        }, {
            id: '6',
            name: 'name6',
            parent_id: '1',
            permissions: ['123', '123'],
            checked: false,
            expanded: false,
        }, {
            id: '7',
            name: 'name7',
            parent_id: '2',
            permissions: ['123', '123'],
            checked: false,
            expanded: false,
        }, {
            id: '8',
            name: 'name8',
            parent_id: '2',
            permissions: ['123', '123'],
            checked: false,
            expanded: false,
        }, {
            id: '9',
            name: 'name9',
            parent_id: '3',
            permissions: ['123', '123'],
            checked: false,
            expanded: false,
        }
    ]
};

// 获取父级菜单ID
export function getParentIDs(parentId: string | number, parentIDs: any) {
    const deepCopy_menu_list = deepCopy(menu_list);
    for (const item of deepCopy_menu_list) {
        if (parentId === item.id) {
            parentIDs.push(item.id);
            console.log(parentIDs);
            getParentIDs(item.parent_id, parentIDs);
        }
    }
    return parentIDs;
}

export function getMenuAndPermissionsByRoleID(roleID: string | number) {
    const roleIDstring = roleID.toString();
    const menucheck = {
        '1': ['3'],
        '2': ['6', '9'],
        '3': ['2'],
        '4': ['1']
    };

    const tree = {
        list: []
    };
    const deepCopy_menu_list = deepCopy(menu_list);
    const parentIDs = [];
    deepCopy_menu_list.list.forEach(element => {
        for (const i of menucheck[roleID]) {
            // 标记选择 And 标记展开
            if (i === element.id) {
                element.checked = true;
                element.expanded = true;
            }
        }
        tree.list.push(element);
    });

    return tree;
}

export const MENU = {
    '/api/menu/query/roleId/:id': (req: MockRequest) => getMenuAndPermissionsByRoleID(req.params.id),
};
