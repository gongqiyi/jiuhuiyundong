<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>会员管理</h4>
        <breadcrumb
                v-bind:items="[{text: '客户经理管理'},{text:'客户经理管理',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <div role="tabpanel" class="tab-pane active" id="tab-base-style-1">
          <form class="form-inline dk-search-list-bar sales-form">
            <div class="form-group mt-1-5">
              <label for="realName">姓名</label>
              <input type="text" class="form-control" id="realName" name="realName">
            </div>
            <div class="form-group mt-1-5">
              <label for="idNumber">身份证号</label>
              <input type="text" class="form-control" id="idNumber" name="idNumber">
            </div>
            <div class="form-group mt-1-5">
              <label for="salesNo">工号</label>
              <input type="text" class="form-control" id="salesNo" name="salesNo">
            </div>
            <div class="form-group mt-1-5">
              <label>所属区域</label>
              <select class="form-control" id="areaId" name="areaId">
              </select>
            </div>
            <div class="form-group mt-1-5">
              <label>注册时间</label>
              <input type="text" class="form-control" id="createTimeStart" name="createTimeStart"
                     onclick="laydate({istime: false, format: 'YYYY-MM-DD'})">
              -
              <input type="text" class="form-control" id="createTimeEnd" name="createTimeEnd"
                     onclick="laydate({istime: false, format: 'YYYY-MM-DD'})">
            </div>
            <div class="form-group mt-1-5">
              <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
            </div>
            <div class="form-group mt-1-5">
              <router-link to="/holder/sales/create" class="btn btn-default btn-info ueser-more">添加客户经理</router-link>
            </div>
            <div class="form-group mt-1-5">
              <a class="btn btn-default btn-info">数据导出</a>
            </div>
          </form>
          <div class="table-overflow">
            <table class="table table-bordered table-middle table-hover mt-2-5 mb-1">
              <thead>
              <tr>
                <th class="text-center" width="30">
                  序号
                </th>
                <th>客户经理名</th>
                <th>姓名</th>
                <th>身份证号</th>
                <th>工号</th>
                <th>所在区域</th>
                <th>注册时间</th>
                <th>邀请码</th>
                <th>状态</th>
                <th width="180">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in pageList.list">
                <td align="center">
                  {{ item.id }}
                </td>
                <td>{{ item.userName }}</td>
                <td>{{ item.realName }}</td>
                <td>{{ item.idNumber }}</td>
                <td>{{ item.salesNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.createTime | formatDate }}</td>
                <td>{{ item.inviteCode }}</td>
                <td>{{ item.locked ? '已锁定' : '正常'}}</td>
                <td>
                  <router-link class="btn btn-sm btn-primary" v-bind:to="'/holder/sales/update/' + item.id">修改</router-link>
                  <template v-if="item.locked">
                    <a class="btn btn-sm btn-primary del-con" href="#"
                       v-on:click.prevent="unLockHolder(item.id)">解锁</a>
                  </template>
                  <template v-else>
                    <a class="btn btn-sm btn-primary del-con" href="#" v-on:click.prevent="lockHolder(item.id)">锁定</a>
                  </template>
                  <!--<a class="btn btn-sm btn-primary" href="#">站内信</a>-->
                  <!--<a class="btn btn-sm btn-primary" href="#">短信</a>-->
                  <!--<a class="btn btn-sm btn-warning" href="#">重置密码</a>-->
                </td>
              </tr>
              </tbody>
            </table>
            <pagination size="md"
                        :total-rows="pageList.totalRecord"
                        :per-page="pageList.pageSize"
                        v-model="currentIndex"
            >
            </pagination>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>


<script>
  import '../../../../static/js/plugins/select2/js/select2.min'
  import '../../../../static/js/plugins/select2/js/i18n/zh-CN'
  import '../../../../static/js/plugins/select2/css/select2.min.css'
  import '../../../../static/js/plugins/laydate/laydate'
  import pagination from "@/components/bootstrap/pagination"
  import breadcrumb from "@/components/bootstrap/breadcrumb"

  export default{
    data: function () {
      return {
        pageList: {
          pageSize: 1,
          pageIndex: 1,
          totalRecord: 0,
          totalPage: 1,
          list: [],
        },
        currentIndex: 1,
      }
    },
    components: {
      pagination: pagination,
      breadcrumb: breadcrumb,
    },
    created: function () {
      this.getSalesList();
    },
    mounted: function () {
      this.initAreaSelect2();
    },
    updated: function () {
    },
    methods: {
      // 获取客户经理列表
      getSalesList: function (data) {
        let self = this;
        self.ajax({
          url: api.holder.sales.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.holderPageList;
            self.currentIndex = res.holderPageList.pageIndex;
          }
        });
      },
      // 锁定客户经理
      lockHolder: function (id) {
        let self = this;
        layer.confirm("确定锁定该客户经理吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.holder.lock.url(id),
            success: function (res) {
              layer.msg(res.message, {time: 1000}, function () {
                if (res.code === 200) {
                  self.search();
                }
              });
            }
          });
        });
      },
      // 解锁客户经理
      unLockHolder: function (id) {
        let self = this;
        layer.confirm("确定解锁该客户经理吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.holder.unLock.url(id),
            success: function (res) {
              layer.msg(res.message, {time: 1000}, function () {
                if (res.code === 200) {
                  self.search();
                }
              });
            }
          });
        });
      },
      // 筛选
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.sales-form'));
        _.assign(data, formData);
        this.getSalesList(data);
      },

      // 初始化地区选择
      initAreaSelect2: function () {
        $('#areaId').select2({
          language: 'zh-CN',
          width: '100px',
          placeholder: {
            id: '',
            text: '--请选择--'
          },
          allowClear: true,
          ajax: {
            data: function (params) {
              return {
                city: params.term,
                pageIndex: params.page,
              };
            },
            url: api.content.area.list.url,
            dataType: 'json',
            delay: 250,
            processResults: function (data, params) {
              let areaList = data.areaList;
              let results = _.map(areaList.list, function (area) {
                return {id: area.id, text: area.city};
              });
              return {
                results: results,
                pagination: {
                  more: data.areaList.hasNextPage,
                }
              };
            },
            cache: true
          },
        });
      },
    },
    watch: {
      currentIndex: function (newIndex) {
        let self = this;
        let query = {
          pageIndex: newIndex
        };
        self.search(query);
      }
    }
  }
</script>


