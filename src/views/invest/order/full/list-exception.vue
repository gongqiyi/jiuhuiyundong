<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>全额投保管理</h4>
        <breadcrumb
                v-bind:items="[{text: '投保管理'},{text:'全额投保管理'},{text:'匹配异常订单',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar order-exception-form">
          <div class="form-group">
            <label for="holderRealName">投保人姓名</label>
            <input type="text" class="form-control" id="holderRealName" name="holderRealName">
          </div>
          <div class="form-group">
            <label for="holderMobile">投保人手机号</label>
            <input type="text" class="form-control" id="holderMobile" name="holderMobile">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
          </div>
        </form>
        <div class="table-overflow">
          <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
            <thead>
            <tr>
              <th class="text-center" width="30">
                序号
              </th>
              <th>保单号</th>
              <th>投保人</th>
              <th>投保人手机号</th>
              <th>投保人身份证号</th>
              <th>车牌号</th>
              <th>投保开始时间</th>
              <th>投保结束时间</th>
              <th>所保险种</th>
              <th>投保金额</th>
              <th>客户来源</th>
              <th>被保人</th>
              <th>被保人手机号</th>
              <th>被保人固定电话</th>
              <th>被保人证件号</th>
              <th>车辆种类</th>
              <th>发动机号</th>
              <th>车架号</th>
              <th>车辆品牌型号</th>
              <th>初次登记日期</th>
              <th>新车购置价</th>
              <th>车辆实际价值</th>
              <th>主驾驶人性别</th>
              <th>核定载客人数</th>
              <th>核定载质量</th>
              <th class="text-center" width="230">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in pageList.list">
              <td align="center">
                {{item.id}}
              </td>
              <td>{{item.policyNumber}}</td>
              <td>{{item.holderRealName}}</td>
              <td>{{item.holderMobile}}</td>
              <td>{{item.holderIdNumber}}</td>
              <td>{{item.vehicleNumber}}</td>
              <td>{{item.startTime | formatDate }}</td>
              <td>{{item.endTime | formatDate}}</td>
              <td>{{item.insuranceType | enumToDescription(insuranceTypeList) }}</td>
              <td>{{item.totalAmount}}</td>
              <td>{{item.customerFrom}}</td>
              <td>{{item.insurantRealName}}</td>
              <td>{{item.insurantMobile}}</td>
              <td>{{item.insurantTel}}</td>
              <td>{{item.insurantIdNumber}}</td>
              <td>{{item.vehicleType}}</td>
              <td>{{item.vehicleEngineNumber}}</td>
              <td>{{item.vehicleChassisNumber}}</td>
              <td>{{item.vehicleBrandNumber}}</td>
              <td>{{item.vehicleRegisterTime}}</td>
              <td>{{item.vehicleNewPrice}}</td>
              <td>{{item.vehicleActualPrice}}</td>
              <td>{{item.vehicleDriverGender}}</td>
              <td>{{item.vehiclePassengerNumber}}</td>
              <td>{{item.vehicleLoadingQuality}}</td>
              <td align="center">
                <a v-on:click.prevent="selectOrder(item.id)" class="btn btn-sm btn-info" href="#">匹配</a>
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
    <template>
      <div class="panel panel-white" id="unMatched" style="display: none;">
        <div class="panel-body">
          <form class="form-inline dk-search-list-bar order-unMatched-form">
            <div class="form-group">
              <label for="orderNoU">订单号</label>
              <input type="text" class="form-control" id="orderNoU" name="orderNo">
            </div>
            <div class="form-group">
              <label for="holderRealNameU">投保人姓名</label>
              <input type="text" class="form-control" id="holderRealNameU" name="holderRealName">
            </div>
            <div class="form-group">
              <label for="holderMobileU">投保人手机号</label>
              <input type="text" class="form-control" id="holderMobileU" name="holderMobile">
            </div>
            <div class="form-group">
              <label for="client">渠道</label>
              <select id="client" name="client" class="form-control">
                <option value="">--请选择--</option>
                <option value="1">PC</option>
                <option value="2">微信</option>
                <option value="3">APP</option>
                <option value="4">线下</option>
              </select>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-default" v-on:click.prevent="searchUnMatched()">搜索</button>
            </div>
          </form>
          <div class="table-overflow">
            <table id="js-datatable_example_u" class="table table-bordered table-middle table-hover mt-1-5">
              <thead>
              <tr>
                <th class="text-center" width="30">
                  序号
                </th>
                <th>订单号</th>
                <th>投保人</th>
                <th>投保人手机号</th>
                <th>投保时间</th>
                <th>渠道</th>
                <th class="text-center" width="230">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in unMatchedPageList.list">
                <td align="center">
                  {{item.id}}
                </td>
                <td>{{item.orderNo}}</td>
                <td>{{item.holderRealName}}</td>
                <td>{{item.holderMobile}}</td>
                <td>{{item.createTime | formatDate}}</td>
                <td>{{item.client | enumToDescription(clientList) }}</td>
                <td align="center">
                  <a v-on:click.prevent="match(item.id)" class="btn btn-sm btn-info" href="#">确定匹配</a>
                </td>
              </tr>
              </tbody>
            </table>
            <pagination size="md"
                        :total-rows="unMatchedPageList.totalRecord"
                        :per-page="unMatchedPageList.pageSize"
                        v-model="unMatchedCurrentIndex"
            >
            </pagination>
          </div>
        </div>
      </div>
    </template>
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
        insuranceTypeList: {
          1: '交强险',
          2: '商业险',
        },
        clientList: {
          1: 'PC',
          2: '微信',
          3: 'APP',
          4: '线下'
        },
        unMatchedPageList: {
          pageSize: 1,
          pageIndex: 1,
          totalRecord: 0,
          totalPage: 1,
          list: [],
        },
        unMatchedCurrentIndex: 1,
        currentExceptionId: 0,
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
    updated: function () {
    },
    methods: {
      // 匹配异常订单列表
      getOrderList: function (data) {
        let self = this;
        self.ajax({
          url: api.invest.order.full.listException.url,
          data: data,
          success: function (res) {
            self.pageList = res.exceptionPageList;
            self.currentIndex = res.exceptionPageList.pageIndex;
          }
        });
      },
      // 未匹配订单列表
      getUnMatched: function (data) {
        let self = this;
        self.ajax({
          url: api.invest.order.full.listUnMatched.url,
          data: data,
          success: function (res) {
            self.unMatchedPageList = res.orderPageList;
            self.unMatchedCurrentIndex = res.orderPageList.pageIndex;
          }
        });
      },
      // 搜索
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.order-exception-form'));
        _.assign(data, formData);
        this.getOrderList(data);
      },
      searchUnMatched: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.order-unMatched-form'));
        _.assign(data, formData);
        this.getUnMatched(data);
      },
      // 开始匹配
      selectOrder: function (id) {
        let self = this;
        self.currentExecptionId = id;
        layer.open({
          type: 1,
          area: ['1280px', '780px'],
          title: false,
          shade: 0,
          content: $('#unMatched'),
          success: function (layero, index) {
            this.getUnMatched();
            $(layero).show();
          }
        });
      },
      match: function (orderId) {
        let self = this;
        layer.confirm("确定将这两个全额购买记录匹配吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.invest.order.full.match.url,
            data:{
              orderId: orderId,
              exceptionId: self.currentExecptionId,
            },
            success: function (res) {
              layer.msg(res.message, {time: 1000}, function () {
                if (res.code === 200) {
                  self.search();
                  layer.closeAll();
                }
              });
            }
          });
        });
      }
    },
    watch: {
      currentIndex: function (newIndex) {
        let self = this;
        let query = {
          pageIndex: newIndex
        };
        self.search(query);
      },
      unMatchedCurrentIndex: function (newIndex) {
        let self = this;
        let query = {
          pageIndex: newIndex
        };
        self.searchUnMatched(query);
      }
    }
  }
</script>
