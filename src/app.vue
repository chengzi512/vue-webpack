<template lang="pug">
  #Login
    .el-container
      el-main
        .content
          #logo.cursor(@click="home")
          .container
            el-tabs(v-model="activeName", @tab-click="handelTab", :class="activeName", v-show="!isFindPwd")
              el-tab-pane(label="登录", name="login")
                el-form(ref="formLogin", :model="login", :rules="rulesLogin", label-width="0")
                  el-form-item(prop="loginname")
                    el-input(v-model="login.loginname", placeholder="请输入手机号/邮箱")
                  el-form-item(prop="password")
                    el-input(type="password", v-model="login.password", placeholder="请输入密码")
                  el-form-item
                    slid-ver(ref="slidel")
                  el-form-item.forget-pwd.text-center
                    span(@click="forgetPwd") 忘记密码？
                  el-form-item
                    el-button.login(@click="handleLogin", :disabled="logining") 立即登录
                .other-line
                  .line-left
                    hr
                  .line-text 第三方微信登录
                  .line-right
                    hr
                .other-login-container
                  .wechat.cursor
              el-tab-pane(label="注册", name="register")
                el-form(ref="formRegister", :model="register", :rules="rulesRegister", label-width="0")
                  el-form-item(prop="loginAccount")
                    el-input(v-model="register.loginAccount", placeholder="请输入手机号/邮箱作为登录账户")
                  el-form-item(prop="password")
                    el-input(type="password", v-model="register.password", placeholder="请输入密码")
                  el-form-item.verify(prop="verifycode")
                    el-input(v-model="register.verifycode", placeholder="请输入验证码")
                    el-button(@click="getCode(1)", :disabled="disabled") {{codeText}}
                  el-form-item.pb15
                    slid-ver(ref="slider")
                  el-form-item
                    el-button.regiter(@click="handleRegister") 立即注册
                  .agree-tip.text-center
                    span 点击立即注册，即表示已阅读并同意
                    span.protocol.cursor(@click="protocol") 橙魔方用户协议
            .findPanel.el-tab-pane(v-show="isFindPwd")
              .title.text-center 找回密码
              .close.cursor(title="关闭", @click="close")
                i.iconfont.icon-close
              el-form(ref="formFindPwd", :model="findPwd", :rules="rulesFindPwd", label-width="0")
                el-form-item(prop="loginAccount")
                  el-input(v-model="findPwd.loginAccount", placeholder="请输入手机号/邮箱")
                el-form-item.verify(prop="verifycode")
                  el-input(v-model="findPwd.verifycode", placeholder="请输入验证码")
                  el-button(@click="getCode(2)", :disabled="disabled") {{codeText}}
                el-form-item(prop="newPassword")
                  el-input(type="password", v-model="findPwd.newPassword", placeholder="请输入新密码")
                el-form-item(prop="reNewPassword")
                  el-input(type="password", v-model="findPwd.reNewPassword", placeholder="请再次输入新密码")
                el-form-item
                  el-button.regiter(@click="handleFind") 确认提交
      el-footer.text-center
        span Copyright © 2017 新橙北斗版权所有
</template>
<script>
  import './index.less';
  import slidVer from './components/slidVer'

  export default {
    components: {slidVer},
    data() {
      return {
        activeName: 'login',
        isFindPwd: false,
        login: {
          loginname: null,
          password: null
//          loginname: '18502887839',
//          password: '123456a'
        },
        register: {
          loginAccount: null,
          password: null,
          verifycode: null
        },
        findPwd: {
          loginAccount: null,
          newPassword: null,
          reNewPassword: null,
          verifycode: null
        },
        codeText: '获取',
        disabled: true,
        rulesLogin: {
          loginname: [
            {required: true, message: '请输入手机号/邮箱', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: this.$validator.pwd}
          ]
        },
        rulesRegister: {
          loginAccount: [
            {required: true, message: '请输入手机号/邮箱', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (value) {
                  this.$respont.get(`/apiPath/usercenter/checkLoginName?loginAccount=${value}`).then(res => {
                    if (res.code == 0 && res.state) {
                      if (res.data === 1) {
                          this.disabled = true;
                        callback(new Error('当前用户已存在'));
                      } else {
                        if(this.register.verifycode){
                          this.$respont.get(`/apiPath/usercenter/destroyValidateCode`);
                          this.register.verifycode = null;
                        }
                        this.disabled = false;
                        callback();
                      }
                    } else {
                        this.disabled = true;
                      callback(new Error('账号验证失败'));
                    }
                  })
                }
              }, trigger: 'blur'
            }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: this.$validator.pwd}
          ],
          verifycode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {validator: this.$validator.code},
            {
              validator: (rule, value, callback) => {
                if (value && value.length === 6) {
                  this.$respont.get(`/apiPath/usercenter/checkValidateCode?loginAccount=${this.register.loginAccount}&&code=${value}`).then(res => {
                    if (res.code == 0 && res.state) {
                      callback();
                    } else {
                      callback(new Error(res.result));
                    }
                  })
                }
              }, trigger: 'blur'
            }
          ]
        },
        rulesFindPwd: {
          loginAccount: [
            {required: true, message: '请输入手机号/邮箱', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (value) {
                  this.$respont.get(`/apiPath/usercenter/checkLoginName?loginAccount=${value}`).then(res => {
                    if (res.code == 0 && res.state) {
                      if (res.data === 0) {
                        this.disabled = true;
                        callback(new Error('当前用户不存在'));
                      } else {
                        if(this.findPwd.verifycode){
                          this.$respont.get(`/apiPath/usercenter/destroyValidateCode`);
                          this.findPwd.verifycode = null;
                        }
                        this.disabled = false;
                        callback();
                      }
                    } else {
                      this.disabled = true;
                      callback(new Error('账号验证失败'));
                    }
                  })
                }
              }, trigger: 'blur'
            }
          ],
          newPassword: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: this.$validator.pwd},
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('请输入新密码'));
                } else if (value === this.findPwd.oldPassword) {
                  callback(new Error('新密码不能与旧密码一样!'));
                } else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ],
          reNewPassword: [
            {required: true, message: '请输入确认密码', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('请再次输入密码'));
                } else if (value !== this.findPwd.newPassword) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ],
          verifycode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {validator: this.$validator.code},
            {
              validator: (rule, value, callback) => {
                if (value && value.length === 6) {
                  this.$respont.get(`/apiPath/usercenter/checkValidateCode?loginAccount=${this.findPwd.loginAccount}&&code=${value}`).then(res => {
                    if (res.code == 0 && res.state) {
                      callback();
                    } else {
                      callback(new Error(res.result));
                    }
                  })
                }
              }, trigger: 'blur'
            }
          ]
        },
        logining:false
      }
    },
    watch: {},
    props: [],
    computed: {},
    created() {
      this.$util.removeStore('$cloudConfig')
    },
    mounted() {
    },
    methods: {
      handelTab(tab, e) {
        this.$refs['formLogin'].resetFields();
        this.$refs['formRegister'].resetFields();
//        debugger
//        e.currentTarget.previousSibling.previousSibling.style.transform = 'translateX(223px)'
//        console.log(tab,e.currentTarget.previousSibling.previousSibling)
//        debugger

      },
      home() {
        // console.log('点击了logo')
      },
      forgetPwd() {
        this.findPwd = {
          loginAccount: null,
            newPassword: null,
            reNewPassword: null,
            oldPassword: null,
            verifycode: null
        };
        this.isFindPwd = true;
        this.$refs['formFindPwd'].resetFields();
      },
      handleLogin() {
        const _this = this;
        this.$refs['formLogin'].validate((valid) => {
          if (valid) {
            // 登录滑块验证成功
            if (this.$refs.slidel.$el.firstChild.lastChild.dataset.done === 'true') {
              _this.logining = true;
              this.$respont.post('/apiPath/usercenter/cmfun/login', {
                data: {loginname:this.login.loginname,
                  password:_this.login.password + _.now()
                }}).then(res => {
                if (res.code == 0 && res.state) {
                  this.$message({
                    message: '登录成功',
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                      let urlQuery = {};
                      if(window.location.search){
                        _.each(window.location.href.split('?')[1].split('&'), r=>{
                          let temp = r.split('=');
                          urlQuery[temp[0]] = temp[1];
                        });
                        if(urlQuery.callback)
                          window.location.replace(urlQuery.callback)
                        else
                          window.location.replace('http://portal.cmfun.cn/')
                      }else
                        window.location.replace('http://portal.cmfun.cn/')
                    }
                  });
                } else {
                  _this.logining = false;
                  _this.$message({
                    message: res.result,
                    type: 'error'
                  });
                  _this.login.password = null;
                  _this.$refs.slidel.$el.firstChild.lastChild.style.left = 0;
                  _this.$refs.slidel.$el.firstChild.firstChild.style.width = 0;
                  _this.$refs.slidel.$el.firstChild.childNodes[1].innerText = '请拖动滑块完成验证';
                }
              })
            }
          } else {
            return false;
          }
        })
      },
      handleRegister() {
        // 注册滑块验证成功
        if (this.$refs.slider.$el.firstChild.lastChild.dataset.done === 'true') {
          this.register.password = this.register.password + Date.parse(new Date());
          this.$respont.post('/apiPath/usercenter/register', {data: this.register}).then(res => {
            if (res.code == 0 && res.state) {
              this.$message({
                message: '注册成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                    {
                        let urlQuery = {};
                        if(window.location.search){
                            _.each(window.location.href.split('?')[1].split('&'), r=>{
                                let temp = r.split('=');
                                urlQuery[temp[0]] = temp[1];
                            });
                            if(urlQuery.callback)
                                window.location.replace(urlQuery.callback)
                            else
                                window.location.replace('http://portal.cmfun.cn/')
                        }else
                            window.location.replace('http://portal.cmfun.cn/')
                    }
                }
              });
            } else {
              this.$message({
                message: res.result,
                type: 'error'
              });
              this.$refs.slidel.$el.firstChild.lastChild.style.left = 0;
              this.$refs.slidel.$el.firstChild.firstChild.style.width = 0;
              this.$refs.slidel.$el.firstChild.childNodes[1] = '请拖动滑块完成验证';
            }
          })
        }
      },
      handleFind() {
        const _this = this;
        this.$refs['formFindPwd'].validate((valid) => {
          if (valid) {
            this.findPwd.newPassword = this.findPwd.newPassword + Date.parse(new Date());
            this.$respont.post('/apiPath/usercenter/modifyPasssword', {data: this.findPwd}).then(res => {
              if (res.code == 0 && res.state) {
                this.$message({
                  message: '密码修改成功',
                  type: 'success',
                  onClose: () => {
                    _this.isFindPwd = false;
                  }
                });
              } else {
                this.$message({
                  message: res.result,
                  type: 'error'
                });
              }
            })
          } else {
            return false;
          }
        })
      },
      getCode(flag) {
        let time = 60,
          apiPath = '';
        const reg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const mobile = /^(13[0-9]|14[5|7]|15[0-35-9]|17[06-8]|18[0-9])\d{8}$/;
        let loginAccount = null;
        if(flag === 1) {
          loginAccount = this.register.loginAccount;
        }else if(flag === 2){
          loginAccount = this.findPwd.loginAccount;
        }else{
          return false;
        }
        if(!loginAccount){
          return false;
        }
        if (reg.test(loginAccount)) {
          apiPath = `/apiPath/usercenter/sendEmailValidateCode?email=${loginAccount}`
        } else if(mobile.test(loginAccount)){
          apiPath = `/apiPath/usercenter/sendPhoneValidateCode?phone=${loginAccount}`
        }else{
          return false;
        }
        this.$respont.get(apiPath).then(res => {
          if (res.code == 0 && res.state) {
            window.setTimeout(() => {
              this.codeText = `倒计时${time}s`;
              this.disabled = true;
              time--;
              let timer = window.setInterval(() => {
                this.codeText = `倒计时${time}s`;
                time--;
                if (time == 0) {
                  this.codeText = `获取`;
                  this.disabled = false;
                  clearInterval(timer);
                }
              }, 1000);
            }, 0)
          }
        })
      },
      protocol() {
        this.openwin('/static/橙魔方协议.html');
        document.body.removeChild(document.querySelector('#new_blank'));
      },
      openwin(url) {
        var a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");
        a.setAttribute("id", "new_blank");
        document.body.appendChild(a);
        a.click();
      },
      close() {
        this.isFindPwd = false;
        this.$refs['formFindPwd'].clearValidate();
      }
    }
  }
</script>
