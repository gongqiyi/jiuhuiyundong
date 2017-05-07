<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>访客管理</h4>
        <breadcrumb v-bind:items="[{text: '内容管理'},{text: '访客管理', active: true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar visitor-form">
          <div class="form-group">
            <label for="area">城市</label>
            <input type="text" class="form-control" id="area" name="city">
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
            <th>姓名</th>
            <th>电话</th>
            <th>城市</th>
            <th>IP地址</th>
            <th>登记时间</th>
            <th class="text-center" width="230">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td align="center">
              {{item.id}}
            </td>
            <td>{{item.name}}</td>
            <td>{{item.tel}}</td>
            <td>{{item.city}}</td>
            <td>{{item.ip}}</td>
            <td>{{item.createTime | formatDate}}</td>
            <td align="center">
              <a v-on:click.prevent="deleteVisitor(item.id)" class="btn btn-sm btn-warning del-con"
                 href="#">删除</a>
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
      pagination: pagination,
      breadcrumb: breadcrumb,
    },
    created: function () {
      this.getVisitorList();
    },
    mounted: function () {

    },
    methods: {
      getVisitorList: function (data) {
        let self = this;
        self.ajax({
          url: api.content.visitor.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.visitorDomainPageList;
            self.currentIndex = res.visitorDomainPageList.pageIndex;
          }
        });
      },
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.visitor-form'));
        _.assign(data, formData);
        this.getVisitorList(data);
      },
      deleteVisitor: function (id) {
        let self = this;
        layer.confirm("确定删除该访客记录吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.content.visitor.delete.url(id),
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
