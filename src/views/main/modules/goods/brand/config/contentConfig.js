const contentConfig = {
  top: [{ text: '添加品牌', type: 'primary', btnText: 'addBrand' }],
  table: [
    { type: 'index', label: '序号', width: '100' },
    { prop: 'tmName', label: '品牌名称', fit: 'true' },
    { type: 'custom', prop: 'logoUrl', label: '品牌LOGO', fit: 'true', slotName: 'logo' },
    {
      type: 'operation',
      label: '品牌操作',
      width: '280',
      fit: 'true',
      btns: [
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
