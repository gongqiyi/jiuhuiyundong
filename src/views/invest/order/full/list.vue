<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>全额投保管理</h4>
        <breadcrumb
                v-bind:items="[{text: '投保管理'},{text:'全额投保管理'},{text:'订单列表',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar order-full-form">
          <div class="form-group">
            <label for="orderNo">订单号</label>
            <input type="text" class="form-control" id="orderNo" name="orderNo">
          </div>
          <div class="form-group">
            <label for="holderRealName">投保人姓名</label>
            <input type="text" class="form-control" id="holderRealName" name="holderRealName">
          </div>
          <div class="form-group">
            <label for="holderMobile">投保人手机号</label>
            <input type="text" class="form-control" id="holderMobile" name="holderMobile">
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
            <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
          </div>

          <div class="form-group">
            <router-link to="/invest/order/full/import" class="btn btn-default btn-info">数据导入</router-link>
          </div>
          <div class="form-group">
            <router-link to="/invest/order/full/handCreate" class="btn btn-default btn-info">线下购买</router-link>
          </div>
        </form>
        <div class="table-overflow">
          <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
            <thead>
            <tr>
              <th class="text-center" width="30">
                序号
              </th>
              <th>订单号</th>
              <th>保单号</th>
              <th>投保人</th>
              <th>投保人手机号</th>
              <th>投保人身份证号</th>
              <th>车牌号</th>
              <th>保险公司名称</th>
              <th>保险公司出险电话</th>
              <th>投保开始时间</th>
              <th>投保结束时间</th>
              <th>所保险种</th>
              <th>投保金额</th>
              <th>线下门店</th>
              <th>投保时间</th>
              <th>渠道</th>
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
              <td>{{item.orderNo}}</td>
              <td>{{item.fullInfo.policyNumber}}</td>
              <td>{{item.fullInfo.holderRealName}}</td>
              <td>{{item.fullInfo.holderMobile}}</td>
              <td>{{item.fullInfo.holderIdNumber}}</td>
              <td>{{item.fullInfo.vehicleNumber}}</td>
              <td>{{item.fullInfo.companyName}}</td>
              <td>{{item.fullInfo.companyTel}}</td>
              <td>{{item.fullInfo.startTime | formatDate }}</td>
              <td>{{item.fullInfo.endTime | formatDate}}</td>
              <td>{{item.fullInfo.insuranceType | enumToDescription(insuranceTypeList) }}</td>
              <td>{{item.fullInfo.totalAmount}}</td>
              <td>{{item.storeName == null ? '---' : item.storeName}}</td>
              <td>{{item.createTime | formatDate}}</td>
              <td>{{item.client | enumToDescription(clientList) }}</td>
              <td>{{item.fullInfo.customerFrom}}</td>
              <td>{{item.fullInfo.insurantRealName}}</td>
              <td>{{item.fullInfo.insurantMobile}}</td>
              <td>{{item.fullInfo.insurantTel}}</td>
              <td>{{item.fullInfo.insurantIdNumber}}</td>
              <td>{{item.fullInfo.vehicleType}}</td>
              <td>{{item.fullInfo.vehicleEngineNumber}}</td>
              <td>{{item.fullInfo.vehicleChassisNumber}}</td>
              <td>{{item.fullInfo.vehicleBrandNumber}}</td>
              <td>{{item.fullInfo.vehicleRegisterTime}}</td>
              <td>{{item.fullInfo.vehicleNewPrice}}</td>
              <td>{{item.fullInfo.vehicleActualPrice}}</td>
              <td>{{item.fullInfo.vehicleDriverGender}}</td>
              <td>{{item.fullInfo.vehiclePassengerNumber}}</td>
              <td>{{item.fullInfo.vehicleLoadingQuality}}</td>
              <td align="center">
                  <a v-on:click.prevent="showReceiptsImage(item.id)" class="btn btn-sm btn-info" href="#">保单照片</a>
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
      <div id="receiptsImage" class="panel-body" style="display: none">
        <form class="form-horizontal mt-2 receipts-image-form" method="post" novalidate="novalidate">
          <input type="hidden" name="fullInfoId" v-model="currentFull.id"/>
          <div class="form-group ">
            <label class="control-label col-md-2">保单照片</label>
            <div class="col-md-8">
              <div class="list-img list-img-multiple clearfix upload">
                <input class="upload_input" name="receiptsImage" type="hidden"
                       v-model="currentFull.receiptsImage">
                <ul class="upload_list"></ul>
                <a class="upload upload_btn" href="javascript:;"><span class="ion ion-plus"></span></a>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-offset-2 col-lg-10">
              <button class="btn btn-inverse" type="submit">保存</button>
            </div>
          </div>
        </form>
      </div>
    </template>
  </div>

</template>

<script>
  import 'jquery-validation'
  import pagination from "@/components/bootstrap/pagination"
  import breadcrumb from "@/components/bootstrap/breadcrumb"
  import '../../../../../static/js/plugins/uploadUeditor'

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
        currentFull:{},
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
      this.upload();
      this.submitReceiptsImageForm();
    },
    updated: function () {
      this.upload();
    },
    methods: {
      // 订单列表
      getOrderList: function (data) {
        let self = this;
        self.ajax({
          url: api.invest.order.full.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.orderPageList;
            self.currentIndex = res.orderPageList.pageIndex;
            console.log(self.pageList);
          }
        });
      },
      // 搜索
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.order-full-form'));
        _.assign(data, formData);
        this.getOrderList(data);
      },
      // 查看保单照片
      showReceiptsImage: function (id) {
        let self = this;
        self.currentFull = _.result(_.find(self.pageList.list, function (order) {
          return order.id == id;
        }), 'fullInfo');

        layer.open({
          type: 1,
          area: ['600px', '400px'],
          title: false,
          shade: 0,
          content: $('#receiptsImage'),
          success: function (layero, index) {
            $(layero).show();
          }
        });
      },
      // 保存保单照片
      submitReceiptsImageForm: function () {
        let self = this;
        $.each($('.receipts-image-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              id: {
                required: true
              },
              receiptsImage: {
                required: true
              },
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.invest.order.full.saveReceiptsImage.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.search();
                      layer.closeAll();
                    }
                  });
                }
              });
            }
          });
        })
      },
      // 上传图片初始化
      upload: function () {
        uploadUeditor.singleImage($('.upload'));
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
