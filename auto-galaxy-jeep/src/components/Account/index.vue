<template>
  <div class="account-wrap">
    <el-row class="headerBtn">
      <el-col :span="24">
        <el-button type="primary" size="small" class="addBtn" @click="addUser">{{$t('m.account.titles[0]')}}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <!-- 列表['账户名', '密码', '姓名', '部门', '邮箱', '操作', '修改', '删除'] -->
      <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="username" :label="$t('m.account.tables[0]')"></el-table-column>
        <el-table-column prop="password" :label="$t('m.account.tables[1]')"></el-table-column>
        <el-table-column prop="name" :label="$t('m.account.tables[2]')"></el-table-column>
        <el-table-column prop="department" :label="$t('m.account.tables[3]')"></el-table-column>
        <el-table-column prop="email" :label="$t('m.account.tables[4]')"></el-table-column>
        <el-table-column :label="$t('m.account.tables[5]')">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">{{$t('m.account.tables[6]')}}</el-button>
            <el-button type="text" @click="del(scope.row)">{{$t('m.account.tables[7]')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!-- 编辑弹框['账户名', '密码', '姓名', '部门', '邮箱'] -->
    <el-dialog :title="popTitle" :visible.sync="dialogFormVisible" width="50%">
      <el-alert :title="$t('m.global.tips[3]')" type="warning" show-icon></el-alert>
      <el-form :model="form" class="popForm" :rules="rules" ref="ruleForm" label-width="70px">
        <el-form-item :label="$t('m.account.tables[0]')" prop="username">
          <el-input v-model="form.username" clearable :disabled="Boolean(status)"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.account.tables[1]')" prop="password">
          <el-input v-model="form.password" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.account.tables[2]')">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.account.tables[3]')">
          <el-input v-model="form.department" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.account.tables[4]')">
          <el-input v-model="form.email" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')" class="del-cancel">{{$t('m.account.btns[0]')}}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" class="del-sure">{{$t('m.account.btns[1]')}}</el-button>
      </div>
    </el-dialog>

    <!-- 删除弹框 -->
    <el-dialog :title="$t('m.account.titles[2]')" :visible.sync="dialogVisible" width="30%" append-to-body>
      <span>
        {{$t('m.account.tip')}}
        <strong>{{delObj.username}}</strong> ?
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="del-cancel">{{$t('m.account.btns[0]')}}</el-button>
        <el-button type="primary" @click="delUser" class="del-sure">{{$t('m.account.btns[1]')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "account",
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$i18n.t("m.login.name_tip[0]")));
      }
      setTimeout(() => {
        if (!/^[A-Za-z0-9]+$/.test(value)) {
          callback(new Error(this.$i18n.t("m.global.tips[1]")));
        } else if (value.length > 20) {
          callback(new Error(this.$i18n.t("m.global.tips[2]")));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      tableData: [],
      loading: false,
      delObj: {},
      itemObj: {},
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        username: "",
        password: "",
        name: "",
        department: "",
        email: ""
      },
      rules: {
        username: [
          {
            required: true,
            validator: checkUsername,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$i18n.t("m.login.password_tip"),
            trigger: "blur"
          }
        ]
      },
      popTitle: "",
      status: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios.get("v2/getAccounts").then(res => {
        this.loading = false;
        this.tableData = res.data.data;
      });
    },
    addUser() {
      this.popTitle = this.$i18n.t("m.account.titles[0]");
      this.status = 0;
      this.form = {
        username: "",
        password: "",
        name: "",
        department: "",
        email: ""
      };
      this.dialogFormVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url = this.status === 0 ? "v2/addUser" : "v2/editUser";
          this.$axios.post(url, this.form).then(res => {
            this.dialogFormVisible = false;
            this.getList();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    edit(obj) {
      this.popTitle = this.$i18n.t("m.account.titles[1]");
      this.status = 1;
      this.form = JSON.parse(JSON.stringify(obj));
      this.dialogFormVisible = true;
    },
    del(obj) {
      this.delObj = JSON.parse(JSON.stringify(obj));
      this.dialogVisible = true;
    },
    delUser() {
      this.$axios
        .post("v2/delUser", {
          username: this.delObj.username
        })
        .then(res => {
          this.dialogVisible = false;
          this.getList();
        });
    }
  }
};
</script>
<style scoped lang="less">
.account-wrap {
  padding: 0 50px 50px;
}
.headerBtn {
  text-align: right;
  button {
    margin: 1em 0px 1em 20px;
  }
  .addBtn {
    background: #fabe00;
    width: 170px;
    height: 45px;
    font-size: 16px;
    color: #000;
    text-align: center;
    font-family: "Microsoft Yahei";
    border: none;
    line-height: 27px;
    border-radius: 0;
  }
}
.pagination {
  margin: 20px 10px 0 0;
  float: right;
}
.opened {
  color: #67c23a;
}
.closed {
  color: #f56c6c;
}
.del-sure {
  background: #fabe00;
  height: 40px;
  line-height: 15px;
  color: #000;
  text-align: center;
  border: none;
  border-radius: 0;
}
.del-cancel {
  border-radius: 0;
}
.popForm {
  margin: 15px 44px 0 20px;
}
</style>
