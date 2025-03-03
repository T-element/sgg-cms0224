const contentConfig = {
  top: [{ text: '添加职位', type: 'primary', btnText: 'addRole' }],
  table: [
    { type: 'index', label: '序号', width: '60' },
    { prop: 'id', label: 'ID', width: '100' },
    { prop: 'roleName', label: '职位名称', width: '150' },
    { prop: 'createTime', label: '创建时间', fit: true, minWidth: '110' },
    { prop: 'updateTime', label: '更新时间', fit: true, minWidth: '110' },
    {
      type: 'operation',
      label: '操作',
      width: '280',
      btns: [
        {
          type: 'primary',
          name: 'assignPermission',
          size: 'small',
          icon: 'User',
          btnText: '分配权限',
        },
        { type: 'primary', name: 'edit', size: 'small', icon: 'Edit', btnText: '编辑' },
        {
          type: 'primary',
          name: 'delete',
          size: 'small',
          icon: 'Delete',
          btnText: '删除',
          deleteKey: 'roleName',
        },
      ],
    },
  ],
}

export default contentConfig
