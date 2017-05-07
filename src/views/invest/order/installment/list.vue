<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>分期投保管理</h4>
        <breadcrumb
                v-bind:items="[{text: '投保管理'},{text:'分期投保管理'},{text:'订单列表',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar order-installment-form">
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
            <label for="status">状态</label>
            <select id="status" name="status" class="form-control">
              <option value="">--请选择--</option>
              <option value="1">进行中</option>
              <option value="2">已完成</option>
              <option value="-1">关闭</option>
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
          </div>

          <div class="form-group">
            <router-link to="/invest/order/installment/create" class="btn btn-default btn-info">线下购买</router-link>
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
              <th>分期账单</th>
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
              <td>{{item.installmentInfo.policyNumber}}</td>
              <td>{{item.installmentInfo.holderRealName}}</td>
              <td>{{item.installmentInfo.holderMobile}}</td>
              <td>{{item.installmentInfo.holderIdNumber}}</td>
              <td>{{item.installmentInfo.vehicleNumber}}</td>
              <td>{{item.installmentInfo.companyName}}</td>
              <td>{{item.installmentInfo.companyTel}}</td>
              <td>{{item.installmentInfo.startTime | formatDate }}</td>
              <td>{{item.installmentInfo.endTime | formatDate}}</td>
              <td>{{item.installmentInfo.insuranceType | enumToDescription(insuranceTypeList) }}</td>
              <td>{{item.installmentInfo.totalAmount}}</td>
              <td>{{item.storeName == null ? '---' : item.storeName}}</td>
              <td>{{item.createTime | formatDate}}</td>
              <td><a href="javascript:void(0);" v-on:click.prevent="showBillList(item.id)">查看</a></td>
              <td>{{item.installmentInfo.customerFrom}}</td>
              <td>{{item.installmentInfo.insurantRealName}}</td>
              <td>{{item.installmentInfo.insurantMobile}}</td>
              <td>{{item.installmentInfo.insurantTel}}</td>
              <td>{{item.installmentInfo.insurantIdNumber}}</td>
              <td>{{item.installmentInfo.vehicleType}}</td>
              <td>{{item.installmentInfo.vehicleEngineNumber}}</td>
              <td>{{item.installmentInfo.vehicleChassisNumber}}</td>
              <td>{{item.installmentInfo.vehicleBrandNumber}}</td>
              <td>{{item.installmentInfo.vehicleRegisterTime}}</td>
              <td>{{item.installmentInfo.vehicleNewPrice}}</td>
              <td>{{item.installmentInfo.vehicleActualPrice}}</td>
              <td>{{item.installmentInfo.vehicleDriverGender}}</td>
              <td>{{item.installmentInfo.vehiclePassengerNumber}}</td>
              <td>{{item.installmentInfo.vehicleLoadingQuality}}</td>
              <td align="center">
                <a v-on:click.prevent="showReceiptsImage(item.id)" class="btn btn-sm btn-info" href="#">保单照片</a>
                <template v-if="item.status > 0">
                  <a v-on:click.prevent="close(item.id)" class="btn btn-sm btn-info" href="#">关闭</a>
                </template>
                <template v-else>
                  <a v-on:click.prevent="open(item.id)" class="btn btn-sm btn-info" href="#">开启</a>
                </template>
                <a v-on:click.prevent="sendMessage(item.holderId)" class="btn btn-sm btn-warning" href="#">发信</a>
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

    <!--保单照片-->
    <template>
      <div id="receiptsImage" class="panel-body" style="display: none">
        <form class="form-horizontal mt-2 receipts-image-form" method="post" novalidate="novalidate">
          <input type="hidden" name="installmentId" v-model="currentInstallment.id"/>
          <div class="form-group ">
            <label class="control-label col-md-2">保单照片</label>
            <div class="col-md-8">
              <div class="list-img list-img-multiple clearfix upload">
                <input class="upload_input" name="receiptsImage" type="hidden"
                       v-model="currentInstallment.receiptsImage">
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
    <!--保单照片-->


    <!--账单列表-->
    <template>
      <div id="bill" class="panel-body" style="display: none;">
        <form class="hand-update-bill-form" method="POST">
          <table class="table table-bordered table-hover mt-1">
            <thead>
            <tr>
              <th>订单号</th>
              <th>保单号</th>
              <th>期数</th>
              <th>应还金额</th>
              <th>实还金额</th>
              <th>还款时间</th>
              <th>创建时间</th>
              <th>上次手动修改时间</th>
              <th>备注</th>
              <th class="text-center">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in billList">
              <td>{{item.orderNo}}</td>
              <td>{{item.policyNumber}}</td>
              <td>{{item.term}}</td>
              <td>{{item.dueAmount}}</td>
              <td>
                <input type="text" name="repayAmount" v-model="item.repayAmount" disabled="disabled">
              </td>
              <td>
                <input type="text" name="repayTime" v-bind:value="item.repayTime | formatDate" disabled="disabled"
                       onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
              </td>
              <td>{{item.createTime | formatDate}}</td>
              <td>{{item.handUpdateTime | formatDate}}</td>
              <td>
                <input type="hidden" name="id" v-model="item.id" disabled="disabled">
                <input type="text" name="remark" v-model="item.remark" disabled="disabled">
              </td>
              <td>
                <a class="btn btn-default start-update" href="javascript:void(0);" v-on:click.prevent="startUpdateBill">修改</a>
                <a class="btn btn-default btn-primary end-update" style="display: none;" href="javascript:void(0);"
                   v-on:click.prevent="endUpdateBill">修改</a>
              </td>
            </tr>
            </tbody>
          </table>
        </form>
      </div>
    </template>
    <!--账单列表-->

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
        // 订单列表
        pageList: {
          pageSize: 1,
          pageIndex: 1,
          totalRecord: 0,
          totalPage: 1,
          list: [],
        },
        currentIndex: 1,

        // 保险类型
        insuranceTypeList: {
          1: '交强险',
          2: '商业险',
        },

        // 当前分期订单
        currentInstallment: {},

        // 分期账单列表
        billList: [],
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
      this.submitHandUpdateBillForm();
    },
    updated: function () {
      this.upload();
    },
    methods: {
      // 订单列表
      getOrderList: function (data) {
        let self = this;
        self.ajax({
          url: api.invest.order.installment.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.orderPageList;
            self.currentIndex = res.orderPageList.pageIndex;
          }
        });
      },
      // 账单列表
      getBillList: function (orderId) {
        let self = this;
        self.ajax({
          url: api.invest.order.installment.listBill.url(orderId),
          success: function (res) {
            self.billList = res.billList;
          }
        });
      },
      // 搜索
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.order-installment-form'));
        _.assign(data, formData);
        this.getOrderList(data);
      },
      // 查看账单列表
      showBillList: function (orderId) {
        let self = this;
        self.getBillList(orderId);
        layer.open({
          type: 1,
          area: ['80%', '70%'],
          title: false,
          shade: 0,
          resize:true,
          content: $('#bill'),
          success: function (layero, index) {
            $(layero).show();
          }
        });
      },
      // 关闭
      close: function (id) {
        let self = this;
        layer.confirm("确定要关闭该分期订单吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.invest.order.installment.close.url(id),
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
      // 开启
      open: function (id) {
        let self = this;
        layer.confirm("确定要开启该分期订单吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.invest.order.installment.open.url(id),
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
      // 发送银行卡余额不足提醒
      sendMessage: function (holderId) {
        let self = this;
        layer.confirm("确定要向客户发送银行卡余额不足的信息？", function () {
          self.ajax({
            type: 'POST',
            url: api.invest.order.installment.sendMessage.url,
            data: {holderId: holderId},
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
      // 查看保单照片
      showReceiptsImage: function (id) {
        let self = this;
        self.currentInstallment = _.result(_.find(self.pageList.list, function (order) {
          return order.id == id;
        }), 'installmentInfo');

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
                url: api.invest.order.installment.saveReceiptsImage.url,
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
      // 开始修改账单
      startUpdateBill: function (event) {
        let $this = $(event.target);
        $this.hide();
        $this.siblings('a').show();
        $this.closest('tr').find('input').removeAttr('disabled');
      },
      // 结束修改账单
      endUpdateBill: function (event) {
        let $this = $(event.target);
        $this.hide();
        $this.siblings('a').show();
        $('.hand-update-bill-form').submit();
      },

      // 手工修改账单
      submitHandUpdateBillForm: function () {
        let self = this;
        $.each($('.hand-update-bill-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              id: {
                required: true
              },
              remark: {
                required: true
              },
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.invest.order.installment.handUpdateBill.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      let $inputList = $(form).find('input').attr('disabled', 'disabled');
                      self.getBillList(self.billList[0].orderId);
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
