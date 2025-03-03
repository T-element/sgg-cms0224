const contentConfig = {
  table: [
    { prop: 'name', label: '名称', width: '300' },
    { prop: 'code', label: '权限值', width: '300' },
    { prop: 'updateTime', label: '更新时间', fit: true, minWidth: '110' },
    {
      type: 'operation',
      label: '操作',
      width: '280',
      btns: [
        {
          type: 'primary',
          name: 'addMenu',
          size: 'small',
          icon: 'User',
          btnText: '添加菜单',
        },
        { type: 'primary', name: 'edit', size: 'small', icon: 'Edit', btnText: '编辑' },
        {
          type: 'primary',
          name: 'delete',
          size: 'small',
          icon: 'Delete',
          btnText: '删除',
          deleteKey: 'name',
        },
      ],
    },
  ],
}

export default contentConfig
