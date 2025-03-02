const contentConfig = {
  top: [
    { text: '添加用户', type: 'primary', btnText: 'addUser' },
    { text: '批量删除', type: 'warning', btnText: 'deleteSelects' },
  ],
  table: [
    { type: 'selection', width: '60' },
    { type: 'index', label: '序号', width: '60' },
    { prop: 'id', label: 'ID', width: '100' },
    { prop: 'username', label: '用户名字', width: '150' },
    { prop: 'name', label: '用户名称', width: '150' },
    { prop: 'roleName', label: '用户角色', width: '150', showOverflowTooltip: true },
    { prop: 'createTime', label: '创建时间', fit: true, minWidth: '110' },
    { prop: 'updateTime', label: '更新时间', fit: true, minWidth: '110' },
    {
      type: 'operation',
      label: '操作',
      width: '280',
      btns: [
        { type: 'primary', name: 'assignRole', size: 'small', icon: 'User', btnText: '分配角色' },
        { type: 'primary', name: 'edit', size: 'small', icon: 'Edit', btnText: '编辑' },
        { type: 'primary', name: 'delete', size: 'small', icon: 'Delete', btnText: '删除' },
      ],
    },
  ],
}

export default contentConfig
