;(function (window,document) {
    let Mdialog=function (options) {
        this._init(options);
    };
    Mdialog.prototype={
        _init({
            title='',//弹窗标题
            text='',//文本内容信息
            btnName=['取消','确定'],//按钮文字信息
            confirm = null, //确认后得回调
            cancel = null, //取消后得回调
              }){
            this.title=title;
            this.text=text;
            this.btnName=btnName;
            this.confirm=confirm;
            this.cancel=cancel;
            //执行创建元素方法
            this._creatElement();
            //显示弹窗及遮罩
            this._show(this._el);
            //绑定事件处理函数
            this._bind(this._el);
        },
        _creatElement(){
            let wrap=document.createElement("div");
            wrap.className="dialog";
            wrap.id="dialog";
            //弹窗标题
            const title=`<div class="title">${this.title}</div>`;
            //文本内容信息
            const text=`<div class="text"><p>${this.text}</p></div>`;
            //按钮文字信息
            const button=`<div class="bottom"><button class="left">${this.btnName[0]}</button><button class="right">${this.btnName[1]}</button></div>`;
            //model
            const dialogModel=`<div class="dialog-model">${title}${text}${button}</div>`;
            wrap.innerHTML=dialogModel;
            this._el=wrap;
        },
        _show(el){
            //把弹窗的dom和遮罩插入到页面中
            document.body.appendChild(el);
        },
        _close(el){
            //隐藏dom把弹窗的dom和遮罩移除
             document.body.removeChild(el);
        },
        _bind(el){
            const cancel=(e)=>{
                console.log(this);
               this.cancel&&this.cancel.call(this,e);
                //隐藏弹窗
                this._close(el);
            };
            //确认弹窗
            const confirm = (e) => {
                this.confirm && this.confirm.call(this, e);
                this._close(el);
            };
            //点击弹窗之外的关闭弹窗
            // const  cancleOutsideDialog=(e)=>{
            //     var target=e ? e.target : window.event.srcElement;
            //     var is_exist =this.hasClass(document.getElementById("dialog"), 'dialog');
            //     console.log("is_exist"+is_exist);
            //     // if(is_exist){
            //     //
            //     // }else{
            //     //     if(target.id!="dialog"){
            //     //         this.cancleOutsideDialog&&this.cancleOutsideDialog.call(this,e);
            //     //         this._close(el);
            //     //     }
            //     // }
            // };
            el.querySelector(".left").addEventListener("click", cancel);
            el.querySelector(".right").addEventListener("click", confirm);
          // document.getElementById("dialog").addEventListener("click", cancel);
            //document.body.addEventListener("click",cancleOutsideDialog);
        },
        hasClass(element, cls) {
            return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
        }
    };
    //将构造函数暴露到window，这样才能在全局作用域下直接调用
    window.Mdialog = Mdialog;
})(window,document);