<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>商户管理</h4>
        <breadcrumb
                v-bind:items="[{text: '消费管理'},{text:'商户管理',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar merchant-form">
          <div class="form-group">
            <label for="name">名称</label>
            <input type="text" class="form-control" id="name" name="name">
          </div>
          <div class="form-group">
            <label>所属区域</label>
            <select class="form-control" id="areaId" name="areaId">
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
          </div>
          <div class="form-group">
            <router-link to="/consumption/merchant/create" class="btn btn-default btn-info">添加</router-link>
          </div>
        </form>
        <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
          <thead>
          <tr>
            <th class="text-center" width="30">
              序号
            </th>
            <th>名称</th>
            <th>地区</th>
            <th>地址</th>
            <th>电话</th>
            <th>已消费次数</th>
            <th>创建时间</th>
            <th class="text-center" width="230">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td align="center">
              {{item.id}}
            </td>
            <td>{{item.name}}</td>
            <td>{{item.areaName }}</td>
            <td>{{item.address }}</td>
            <td>{{item.tel }}</td>
            <td>{{item.consumptionCount}}</td>
            <td>{{item.createTime | formatDate}}</td>
            <td align="center">
              <template v-if="item.recommended">
                <a v-on:click.prevent="unRecommend(item.id)" class="btn btn-sm btn-info" href="#">取消推荐</a>
              </template>
              <template v-else>
                <a v-on:click.prevent="recommend(item.id)" class="btn btn-sm btn-info" href="#">推荐</a>
              </template>
              <router-link class="btn btn-sm btn-primary" v-bind:to="'/consumption/merchant/update/' + item.id">编辑
              </router-link>
              <a v-on:click.prevent="deleteMerchant(item.id)" class="btn btn-sm btn-info" href="#">删除</a>
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
      }
    },
    components: {
      breadcrumb: breadcrumb,
      pagination: pagination,
    },
    created: function () {
      this.getMerchantList();
    },
    mounted: function () {
      this.initAreaSelect2();

    },
    methods: {
      // 商户列表
      getMerchantList: function (data) {
        let self = this;
        self.ajax({
          url: api.consumption.merchant.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.merchantPageList;
            self.currentIndex = res.merchantPageList.pageIndex;
          }
        });
      },
      // 搜索
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.merchant-form'));
        _.assign(data, formData);
        this.getMerchantList(data);
      },
      // 删除
      deleteMerchant: function (id) {
        let self = this;
        layer.confirm("确定要删除该商户吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.consumption.merchant.delete.url(id),
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
      // 推荐
      recommend: function (id) {
        let self = this;
        layer.confirm("确定要推荐吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.consumption.merchant.recommend.url(id),
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
      // 取消推荐
      unRecommend: function (id) {
        let self = this;
        layer.confirm("确定要取消推荐吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.consumption.merchant.unRecommend.url(id),
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
      // 地区查询
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
