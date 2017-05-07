<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>消费券兑换记录</h4>
        <breadcrumb
                v-bind:items="[{text: '消费管理'},{text:'消费券兑换记录',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar order-form">
          <div class="form-group">
            <label for="orderNo">消费识别码</label>
            <input type="text" class="form-control" id="orderNo" name="orderNo">
          </div>
          <div class="form-group">
            <label for="holderRealName">客户姓名</label>
            <input type="text" class="form-control" id="holderRealName" name="holderRealName">
          </div>
          <div class="form-group">
            <label for="holderMobile">客户手机号</label>
            <input type="text" class="form-control" id="holderMobile" name="holderMobile">
          </div>
          <div class="form-group">
            <label for="merchantName">商户名称</label>
            <input type="text" class="form-control" id="merchantName" name="merchantName">
          </div>
          <div class="form-group">
            <label for="productName">消费券名称</label>
            <input type="text" class="form-control" id="productName" name="productName">
          </div>
          <div class="form-group">
            <label for="status">状态</label>
            <select id="status" name="status" class="form-control">
              <option value="">--请选择--</option>
              <option value="1">未消费</option>
              <option value="2">待确认</option>
              <option value="3">已消费</option>
              <option value="-1">已过期</option>
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
          </div>
        </form>
        <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
          <thead>
          <tr>
            <th class="text-center" width="30">
              序号
            </th>
            <th>消费识别码</th>
            <th>兑换消费券名称</th>
            <th>产品积分</th>
            <th>客户姓名</th>
            <th>客户手机号</th>
            <th>商户名称</th>
            <th>兑换时间</th>
            <th>商户确认时间</th>
            <th>客户确认时间</th>
            <th>状态</th>
            <!--<th class="text-center" width="230">操作</th>-->
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td align="center">
              {{item.id}}
            </td>
            <td>{{item.orderNo}}</td>
            <td>{{item.productName }}</td>
            <td>{{item.productPoint }}</td>
            <td>{{item.holderRealName }}</td>
            <td>{{item.holderMobile }}</td>
            <td>{{item.merchantName }}</td>
            <td>{{item.createTime | formatDate}}</td>
            <td>{{item.merchantConfirmTime | formatDate}}</td>
            <td>{{item.completeTime | formatDate}}</td>
            <td>{{item.status | enumToDescription(statusList)}}</td>
            <!--<td align="center">-->
            <!--</td>-->
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
</template>

<script>
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
        currentProduct: {},
        statusList: {
          '1': '未消费',
          '2': '待确认',
          '3': '已消费',
          '-1': '已过期',
        },
      }
    },
    components: {
      breadcrumb: breadcrumb,
      pagination: pagination,
    },
    created: function () {
      this.getOrderList();
    },
    mounted: function () {

    },
    methods: {
      // 兑换记录列表
      getOrderList: function (data) {
        let self = this;
        self.ajax({
          url: api.consumption.order.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.consumptionOrderPageList;
            self.currentIndex = res.consumptionOrderPageList.pageIndex;
          }
        });
      },
      // 搜索
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.order-form'));
        _.assign(data, formData);
        this.getOrderList(data);
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
