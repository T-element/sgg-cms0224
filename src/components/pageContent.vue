<template>
  <div class="pageContent">
    <el-card>
      <div class="container">
        <div class="top" v-if="!!config?.top">
          <template v-for="(item, index) in config.top" :key="index">
            <el-button
              :type="item.type"
              @click="onBtnClick({ btnName: item.btnText })"
              :disabled="item.text === '批量删除' ? 'disabled' : false"
            >
              {{ item.text }}
            </el-button>
          </template>
        </div>
        <el-table
          v-if="!!config?.table"
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="{ textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
          row-key="id"
        >
          <template v-for="(item, index) in config.table" :key="index">
            <el-table-column v-if="item.type === 'operation'" v-bind="item">
              <template #default="scoped">
                <template v-for="(iten, indey) in item.btns" :key="indey">
                  <el-popconfirm
                    v-if="iten.btnText === '删除'"
                    width="250"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    icon="InfoFilled"
                    icon-color="#FF9900"
                    :title="`你确定要删除${scoped.row[iten.deleteKey]}?`"
                    confirm-button-type="danger"
                    @confirm="onBtnClick({ btnName: iten.name, rowData: scoped.row })"
                  >
                    <template #reference>
                      <el-button
                        v-bind="iten"
                        :disabled="
                          isBtnDisable({
                            rowName: scoped.row.name,
                            btnName: iten.name,
                            type: scoped.row.type,
                          })
                        "
                      >
                        {{ iten.btnText }}
                      </el-button>
                    </template>
                  </el-popconfirm>
                  <el-button
                    v-else
                    v-bind="iten"
                    :disabled="
                      isBtnDisable({
                        rowName: scoped.row.name,
                        btnName: iten.name,
                        type: scoped.row.type,
                      })
                    "
                    @click="onBtnClick({ btnName: iten.name, rowData: scoped.row })"
                  >
                    {{ iten.btnText }}
                  </el-button>
                </template>
              </template>
            </el-table-column>

            <el-table-column v-else-if="item.type === 'custom'" v-bind="item">
              <template #default="data">
                <slot :name="item.slotName" v-bind="data.row"></slot>
              </template>
            </el-table-column>
            <el-table-column v-else v-bind="item" />
          </template>
        </el-table>
        <el-pagination
          v-if="!!listTotal"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="listTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
defineProps({
  config: {
    type: Object,
    required: true,
  },
  tableData: {
    type: Object,
    required: true,
  },
  listTotal: {
    type: Number,
  },
})

const isBtnDisable = (val) => {
  if (val.rowName === '全部数据') {
    if (val.btnName === 'edit' || val.btnName === 'delete') {
      return true
    }
  }

  if (val.type == 2 && val.btnName === 'addMenu') {
    return true
  }
}

const emit = defineEmits(['btnClick', 'pagingSizeChange', 'pagingPageChange'])
const onBtnClick = (prop) => {
  emit('btnClick', prop)
}

const handleSizeChange = (size) => {
  emit('pagingSizeChange', size)
}

const handleCurrentChange = (page) => {
  emit('pagingPageChange', page)
}
</script>

<style lang="less" scoped>
.pageContent {
  .top {
    margin-bottom: 20px;
  }

  .el-pagination {
    margin-top: 10px;
  }
}
</style>
