;(function (window,document) {


    /*
     * 首页-收下英雄帖点击事件
     */
    var myVideo=document.getElementById("video1");
    $id("indexLeftBtn").onclick=()=>{
        $id("index").style.display="none";
        $(".video_layer").css("display","block");
        myVideo.play();
        // $id("page1").style.display="block";
        // $id("form1").style.display="block";
        // $id("btnPrveNext").style.display="block";
        // $id("currForm").value="1";
    }


    /*
    * 视频跳过点击事件
    */
    $("#btnSkip").on("click",function () {
        myVideo.pause();
        $(".video_layer").css("display","none");
        $id("page1").style.display="block";
        $id("form1").style.display="block";
        $id("btnPrveNext").style.display="block";
        $id("currForm").value="1";
    })

    myVideo.loop = false;
    myVideo.addEventListener('ended', function () {
        $(".video_layer").css("display","none");
        $id("page1").style.display="block";
        $id("form1").style.display="block";
        $id("btnPrveNext").style.display="block";
        $id("currForm").value="1";
    }, false);
    /*
     * 首页-为TA发帖点击事件（分享）
     */
    $id("indexRightBtn").onclick=()=>{
        $('#indexShareBtn').css("display","block");
        $("#indexFuceng").css("display","block");
    }

    //点击遮罩层关闭浮层
    $("#indexFuceng").on("click",function () {
        $('#indexShareBtn').css("display","none");
        $("#indexFuceng").css("display","none");
    })


    $id("formcon4").onclick=()=>{
        $('#indexShareBtn1').css("display","block");
        $("#indexFuceng1").css("display","block");
    }

    //点击遮罩层关闭浮层
    $("#indexFuceng1").on("click",function () {
        $('#indexShareBtn1').css("display","none");
        $("#indexFuceng1").css("display","none");
    })


    $("#indexShareBtn").on("click",function () {
    })

    /*
   * 详细页面form1-多选框点击事件
  */
    $("#form1").on("click",'.check-box',function(){
        // //每次点击 判断其他同类是否被选中
        var  siblingsSeletion=$(this).siblings().hasClass("active");
        if(siblingsSeletion){//如果同类有选中的
            var index=0;
            var currName="";
            var flag="";
            $(this).siblings(".check-box[ischeck=1]").each(function(){
                currName=$(this).attr("data-value");
                var na=$(this).attr("name");
                $(".div-list-"+na+" .input").each(function(){
                    if($(this).val()==""){
                        index=1;//说明有空值
                        flag=na;
                    }
                });
            });
            if(index==1){//上一次选中的平台输入框有空值
                $(this).css("backgroundColor","#c30d1e").addClass("active").attr("ischeck","1");
                $(this).siblings(".check-box[name='"+flag+"']").css("backgroundColor","").removeClass("active").attr("ischeck","0");
            }else{//上一次选中的平台输入框无空值
                $(this).css("backgroundColor","#c30d1e").addClass("active").attr("ischeck","1");
            }
        }else{//同类没有选中的项
            $(this).css("backgroundColor","#c30d1e").addClass("active").attr("ischeck","1");

        }
        var name=$(this).attr("name");
        if($(this).attr("ischeck")=="0"){
            $(".div-list-"+name+" .input").each(function(){
                $(this).val("");
                $(this).attr("disabled","disabled");
            });
        }else{
            $(".div-list-"+name+" .input").each(function(){
                $(this).removeAttr("disabled");
            });
        }
        $(".div-list-"+name).css("display","block").siblings().css("display","none");

    })

    /*
     * 详细页面form1-上一步点击事件
    */

    $id("pagePrveBtn").onclick=()=>{
        $id("index").style.display="block";
        $id("page1").style.display="none";
        $id("form1").style.display="none";
        $id("btnPrveNext").style.display="none";
        $id("currForm").value="0";
    }

    /*
    * 详细页面form1-下一步点击事件
   */
    $id("pageNextBtn").onclick=()=>{   var arr=[];
        $("#form1 .check-box").each(function(){
            if($(this).attr("ischeck")=="1"){
                arr.push($(this).attr("data-value"));
            }
        });
        var index=0;
        var flag=0;
        $(".check-box[ischeck=1]").each(function(){
            var na=$(this).attr("name");
            $(".div-list-"+na+" .input").each(function(){
                if($(this).val()==""){
                    index=1;//说明有空值
                    flag++;
                }
            });
        });


        //
        // if(arr.length==0){
        //     swal({
        //         title: "提示",
        //         text: '请选择平台',
        //         button: "确定",
        //     });
        //     return ;
        // }

        var flags=0;
        var n="";
        $(".check-box[ischeck=0]").each(function(){
            var na=$(this).attr("name");
            $(".div-list-"+na+" .input").each(function(){
                if($(this).val()==""){
                    n=na;
                    flags++;
                }
            });
        });

        // if(flags%3!=0){
        //     swal({
        //         title: "提示",
        //         text: '请填写平台的ID,昵称及粉丝数',
        //         button: "确定",
        //     });
        //     return ;
        // }

        $id("form2").style.display="block";
        $id("form1").style.display="none";
        $id("currForm").value="2";

        // if(index==0){
        //     console.log($("#form1Checkboxdy").val());
        //
        // }else{
        //
        //     console.log(flag);
        //     if(flag==3){
        //         var i=0;
        //         $("#form1 .check-box").each(function(){
        //             if($(this).attr("ischeck")=="1"){
        //                 i++;
        //             }
        //         });
        //         if(i<=1){
        //             swal({
        //                 title: "提示",
        //                 text: '请填写该平台的ID,昵称及粉丝数',
        //                 button: "确定",
        //             });
        //             return ;
        //         }else{
        //             $id("form2").style.display="block";
        //             $id("form1").style.display="none";
        //             $id("currForm").value="2";
        //         }
        //
        //
        //     }else{
        //         swal({
        //             title: "提示",
        //             text: '请填写该平台的ID,昵称及粉丝数',
        //             button: "确定",
        //         });
        //         return ;
        //     }
        //
        // }



    }

    //数组去重
    function unique1(arr){
        var hash=[];
        for (var i = 0; i < arr.length; i++) {
            if(hash.indexOf(arr[i])==-1){
                hash.push(arr[i]);
            }
        }
        return hash;
    }


    getform1DataList=(id,index,th)=>{
        var obj={};
        switch (id)
        {
            case 'dy':
                index==0?$("#form1Checkboxdy").attr("index",$(th).val()):
                    index==1?$("#form1Checkboxdy").attr("nickname",$(th).val()):
                        $("#form1Checkboxdy").attr("sum",$(th).val());
                break;
            case 'wb':
                index==0?$("#form1Checkboxwb").attr("index",$(th).val()):
                    index==1?$("#form1Checkboxwb").attr("nickname",$(th).val()):
                        $("#form1Checkboxwb").attr("sum",$(th).val());
                break;
            case 'zh':
                index==0?$("#form1Checkboxzh").attr("index",$(th).val()):
                    index==1?$("#form1Checkboxzh").attr("nickname",$(th).val()):
                        $("#form1Checkboxzh").attr("sum",$(th).val());
                break;
            case 'wx':
                index==0?$("#form1Checkboxwx").attr("index",$(th).val()):
                    index==1?$("#form1Checkboxwx").attr("nickname",$(th).val()):
                        $("#form1Checkboxwx").attr("sum",$(th).val());
                break;
            case 'lt':
                index==0?$("#form1Checkboxlt").attr("index",$(th).val()):
                    index==1?$("#form1Checkboxlt").attr("nickname",$(th).val()):
                        $("#form1Checkboxlt").attr("sum",$(th).val());
                break;
        }
    }


    /*
   * 详细页面form2-上一步点击事件
  */

    $id("pagePrveBtn2").onclick=()=>{
        $id("form2").style.display="none";
        $id("form1").style.display="block";
        $id("currForm").value="1";
    }

    /*
    * 详细页面form2-下一步点击事件
   */
    $id("pageNextBtn2").onclick=()=>{
        var arr=[];
        $("#form2 .spanopt").each(function(){
            if($(this).attr("ischeck")=="1"){
                arr.push($(this).attr("data-value"));
            }
        });
        if($("#otherLikes").val()!=""){
            arr.push($("#otherLikes").val());
        }
        $("#likesHidden").val(arr);
        // if(arr.length==0){
        //     swal({
        //         title: "提示",
        //         text: '请选择你的“独门绝技”',
        //         button: "确定",
        //     });
        //     return ;
        // }
        $id("form2").style.display="none";
        $id("form3").style.display="block";
        $id("currForm").value="3";
    }

    /*
  * 详细页面form1 复选框事件
 */

    loadFomr1CheckBox=()=>{
        var checkBox = $class("check-box");
        for(var i in checkBox){
            checkBox[i].onclick=function () {
                if(this.getAttribute('class').indexOf('active') > -1){
                    this.style.backgroundColor="";
                    this.classList.remove("active");
                    this.setAttribute("ischeck","0");
                }else{
                    this.style.backgroundColor="#c30d1e";
                    this.classList.add("active");
                    this.setAttribute("ischeck","1");//表示当前选中的值
                }
            }
        }
    }
    //loadFomr1CheckBox();


    /*
* 详细页面form2 复选框事件
*/
    loadFomr2CheckBox=()=>{
        var options = $class("spanopt");
        for(var i in options){
            options[i].onclick=function () {
                if(this.getAttribute('class').indexOf('active') > -1){
                    this.style.backgroundColor="";
                    this.classList.remove("active");
                    this.setAttribute("ischeck","0");
                }else{
                    if(this.parentNode.parentNode.classList.contains('like-groups')){
                        this.style.backgroundColor="#92274e";
                    }else{
                        this.style.backgroundColor="#c30d1e";

                    }
                    this.classList.add("active");
                    this.setAttribute("ischeck","1");//表示当前选中的值
                }
            }
        }
    }
    loadFomr2CheckBox();

    /*
* 详细页面form3 -期待成为KOL
*/
    $id("form3Register").onclick=()=>{
        $("#form3goIndex").val("0");//表示期待成为KOL进入
        $id("form3").style.display="none";
        $id("form4").style.display="block";
        $id("currForm").value="4";
    }

    /*
   * 详细页面form3 -参与活动
       */
    $id("form3Join").onclick=()=>{
        $("#form3goIndex").val("1");//表示参与活动进入
        $id("form3").style.display="none";
        $id("form4").style.display="block";
        $id("currForm").value="4";
    }

    /*
  * 详细页面form3-上一步
      */
    $("#form3PrveBtn").on("click",function () {
        $id("form3").style.display="none";
        $id("form2").style.display="block";
        $id("currForm").value="2";
    })



    /*
  * 详细页面form4 -提交
      */
    $id("form4Btn").onclick=()=>{

        if(validateRequired()){
            checkInformation()
        }
    }

    /*
* 详细页面form4-上一步
    */
    $("#form4PrveBtn").on("click",function () {
        $id("form4").style.display="none";
        $id("form3").style.display="block";
        $id("currForm").value="3";
    })

    /*
* 详细页面form4 -校验
    */
    validateRequired=()=>{
        var flag=true;
        var name= $("#form4inputName").val();
        var sex=$("#form4inputSex option:selected").val();
        var phone= $("#form4inputPhone").val();
        var weid=$("#form4inputWeId").val();
        var qqid= $("#form4inputQQid").val();
        var from= $("#form4inputFrom option:selected").val();
        if(name == "" || name == null || name == undefined){ // "",null,undefined
            swal({
                title: "输入有误",
                text: '请输入姓名',
                button: "确定",
            });
            flag=false;
            return
        }
        if (phone == "" || phone == null || phone == undefined) {
            swal({
                title: "输入有误",
                text: '请输入手机',
                button: "确定",
            });
            flag = false;
            return
        }else if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phone)){
            swal({
                title: "输入有误",
                text: '请输入正确的手机号',
                button: "确定",
            });
            flag = false;
            return
        }
        if (!$("#js_agreement").is(":checked")) {
            swal({
                title: "提示",
                text: '请同意一汽大众.高尔夫工作人员就此次活动与我联系',
                button: "确定",
            });
            flag = false;
            return
        }

        return flag;
    }


    checkInformation=()=>{
        $("#addStylePopover").remove();
        var name= $("#form4inputName").val();
        var sex=$("#form4inputSex option:selected").val();
        var phone= $("#form4inputPhone").val();
        var weid=$("#form4inputWeId").val();
        var qqid= $("#form4inputQQid").val();
        var from= $("#form4inputFrom option:selected").val();
        var jxdmc= $("#form4inputJxdmc").val();
        var jxdmcTitle=$("#form4inputJxdmcTitle").text();
        var dy=$("#form1Checkboxdy"),
            wb=$("#form1Checkboxwb"),
            zh=$("#form1Checkboxzh"),
            wx=$("#form1Checkboxwx"),
            lt=$("#form1Checkboxlt");

        let text = "您填写的信息如下：\n\n";

        text += "姓名："+name+'\n';
        text += "性别："+sex+'\n';
        weid!=""?text += "微信号："+weid+'\n':"";
        qqid!=""?text += "QQ号："+qqid+'\n':"";
        text += "手机："+phone+'\n';
        text += "来自："+from+'\n';
        if(jxdmc!=""&&$("#form4inputFrom option:selected").attr("ids")==$("#form4inputJxdmc").attr("ids")){
            text += jxdmcTitle+"："+jxdmc+'\n';
        }
        if(dy.attr("index")!=""){
            text += dy.val()+"平台ID："+dy.attr("index")+"，昵称："+dy.attr("nickname")+"，粉丝数："+dy.attr("sum")+'\n';
        }
        if(wb.attr("index")!=""){
            text += wb.val()+"平台ID："+wb.attr("index")+"，昵称："+wb.attr("nickname")+"，粉丝数："+wb.attr("sum")+'\n';
        }
        if(zh.attr("index")!=""){
            text += zh.val()+"平台ID："+zh.attr("index")+"，昵称："+zh.attr("nickname")+"，粉丝数："+zh.attr("sum")+'\n';
        }
        if(wx.attr("index")!=""){
            text += wx.val()+"平台ID："+wx.attr("index")+"，昵称："+wx.attr("nickname")+"，粉丝数："+wx.attr("sum")+'\n';
        }
        if(lt.attr("index")!=""){
            text += lt.val()+"平台ID："+lt.attr("index")+"，昵称："+lt.attr("nickname")+"，粉丝数："+lt.attr("sum")+'\n';
        }
        text += "独门绝技：" +$("#likesHidden").val();
        swal({
            title: "请确认你的信息",
            text: text,
            dangerMode: true,
            buttons: ["返回修改", "确认提交"],
        })
        // .then((value) => {
        //     if (value) {
        //
        //
        //         var plat=[];
        //         var dy=$("#form1Checkboxdy"),
        //             wb=$("#form1Checkboxwb"),
        //             zh=$("#form1Checkboxzh"),
        //             wx=$("#form1Checkboxwx"),
        //             lt=$("#form1Checkboxlt");
        //         if($.trim(dy.attr("index"))!=""){
        //             plat.push({"name":dy.attr("value"),"id":dy.attr("index"),"nickname":dy.attr("nickname"),"funs":dy.attr("sum"),})
        //          }
        //         if($.trim(wb.attr("index"))!=""){
        //             plat.push({"name":wb.attr("value"),"id":wb.attr("index"),"nickname":wb.attr("nickname"),"funs":wb.attr("sum"),})
        //         }
        //         if($.trim(zh.attr("index"))!=""){
        //             plat.push({"name":zh.attr("value"),"id":zh.attr("index"),"nickname":zh.attr("nickname"),"funs":zh.attr("sum"),})
        //         }
        //         if($.trim(wx.attr("index"))!=""){
        //             plat.push({"name":wx.attr("value"),"id":wx.attr("index"),"nickname":wx.attr("nickname"),"funs":wx.attr("sum"),})
        //         }
        //         if($.trim(lt.attr("index"))!=""){
        //             plat.push({"name":lt.attr("value"),"id":lt.attr("index"),"nickname":lt.attr("nickname"),"funs":lt.attr("sum"),})
        //         }
        //
        //
        //         var skillArr=$("#likesHidden").val();//技能
        //
        //         var platStr='';
        //         if(plat.length>0){
        //             platStr=JSON.stringify(plat);
        //         }
        //         var data = {
        //             name: name,
        //             type: $("#form3goIndex").val(),//1-不参加；0-参加; ',
        //             sex: sex,
        //             mobile:phone,
        //             weixin:weid,
        //             qq:qqid,
        //             source:from,
        //             department:jxdmc,
        //             plat:platStr,
        //             skill:skillArr
        //         };
        //         $.ajax({
        //             type: 'post',
        //             url: "./api/index.php?action=save",
        //             headers: {
        //                 Accept: "application/json; charset=utf-8"
        //             },
        //             dataType: 'json',
        //             data: JSON.stringify(data),
        //             success: function (res) {
        //                 if (res.code == 0) {
        //                     $('<style id="addStylePopover">.swal-modal .swal-text{margin: .5rem !important;} </style>').appendTo('head');
        //                     swal("提交成功!", {
        //                         buttons: false,
        //                         timer: 3000,
        //                     });
        //                         $id("form4").style.display="none";
        //                         $id("form5").style.display="block";
        //                         $id("currForm").value="5";
        //                 }
        //             }
        //         })
        //     } else {
        //        $("#form4").css("display","none");
        //         $("#form3goIndex").val("");
        //        $("#indexLeftBtn").click();
        //     }
        // });


        $("body").on("click",'.swal-footer .swal-button--cancel',function () {
            $("#form4").css("display","none");
            $("#form3goIndex").val("");
            $("#form1").css("display","block");
            //$("#indexLeftBtn").click();
        })
        $("body").on("click",'.swal-footer .swal-button--confirm',function () {
            var plat=[];
            var dy=$("#form1Checkboxdy"),
                wb=$("#form1Checkboxwb"),
                zh=$("#form1Checkboxzh"),
                wx=$("#form1Checkboxwx"),
                lt=$("#form1Checkboxlt");
            if($.trim(dy.attr("index"))!=""){
                plat.push({"name":dy.attr("value"),"id":dy.attr("index"),"nickname":dy.attr("nickname"),"funs":dy.attr("sum"),})
            }
            if($.trim(wb.attr("index"))!=""){
                plat.push({"name":wb.attr("value"),"id":wb.attr("index"),"nickname":wb.attr("nickname"),"funs":wb.attr("sum"),})
            }
            if($.trim(zh.attr("index"))!=""){
                plat.push({"name":zh.attr("value"),"id":zh.attr("index"),"nickname":zh.attr("nickname"),"funs":zh.attr("sum"),})
            }
            if($.trim(wx.attr("index"))!=""){
                plat.push({"name":wx.attr("value"),"id":wx.attr("index"),"nickname":wx.attr("nickname"),"funs":wx.attr("sum"),})
            }
            if($.trim(lt.attr("index"))!=""){
                plat.push({"name":lt.attr("value"),"id":lt.attr("index"),"nickname":lt.attr("nickname"),"funs":lt.attr("sum"),})
            }


            var skillArr=$("#likesHidden").val();//技能

            var platStr='';
            if(plat.length>0){
                platStr=JSON.stringify(plat);
            }
            var data = {
                name: name,
                type: $("#form3goIndex").val(),//1-不参加；0-参加; ',
                sex: sex,
                mobile:phone,
                weixin:weid,
                qq:qqid,
                source:from,
                department:jxdmc,
                plat:platStr,
                skill:skillArr
            };
            $.ajax({
                type: 'post',
                url: "./api/index.php?action=save",
                headers: {
                    Accept: "application/json; charset=utf-8"
                },
                dataType: 'json',
                data: JSON.stringify(data),
                success: function (res) {
                    if (res.code == 0) {
                        $('<style id="addStylePopover">.swal-modal .swal-text{margin: .5rem !important;} </style>').appendTo('head');
                        swal("提交成功!", {
                            buttons: false,
                            timer: 3000,
                        });
                        $id("form4").style.display="none";
                        $id("form5").style.display="block";
                        $id("currForm").value="5";
                    }
                }
            })
        })
    }




    $("#form4inputFrom").change(function(){
        $("#form4inputJxdmc").val("");
        $("#form4inputJxdmc").attr("ids",$(this).find('option:selected').attr("ids"));
        $("#form4inputFromOpt1").remove();
        var ids=$(this).find('option:selected').attr("ids");
        if(ids=="1"){
            $("#form4inputJxdmcTitle").parent("#xxxxxx").css("display","block");
            $("#xxxxxx .span").css("width","30%");
            $("#form4inputJxdmc").css("width","60%");
            $("#form4inputJxdmcTitle").text("部门");
        }else if(ids=="2"){
            $("#form4inputJxdmcTitle").parent("#xxxxxx").css("display","block");
            $("#xxxxxx .span").css("width","45%");
            $("#form4inputJxdmc").css("width","30%");
            $("#form4inputJxdmcTitle").text("经销店名称");
        }else if(ids=="6"){
            $("#xxxxxx .span").css("width","30%");
            $("#xxxxxx ._span").css("width","60%");
            $("#form4inputJxdmcTitle").parent("#xxxxxx").css("display","block");
            $("#form4inputJxdmcTitle").text("备注");
        }else{
            $("#xxxxxx .span").css("width","30%");
            $("#xxxxxx ._span").css("width","60%");
            $("#form4inputJxdmcTitle").parent("#xxxxxx").css("display","none");
        }

        //添加所需要执行的操作代码
    })
})(window,document);