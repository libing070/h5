var share=(function () {
    let hrefUrl = window.location.href.split('#')[0];
    let wxData = [];
    wxData.link = location.protocol + '//' + location.host + location.pathname;  //链接地址，一般不需要修改。
    wxData.imgUrl = location.protocol + '//' + location.host + '/pages/imgs/wx.png'; //分享时显示的缩略图，根据图片的实际位置修改
    wxData.title = "众星计划！"; //分享标题
    wxData.desc = "一汽-大众高尔夫家族#众星计划#耀世启动！"; //分享正文

    hrefUrl = encodeURIComponent(hrefUrl);
  var init=function(){
      $.get(location.protocol + '//' +"voiceofaudi.skyengine.cn/wxapi/jssdk.php" + '?url=' + hrefUrl,{

          }, function(err, data){
              wx.config({
                  debug: 0,
                  appId: data.appid,
                  timestamp: data.timestamp,
                  nonceStr: data.noncestr,
                  signature: data.signature,
                  jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage',
                      'onMenuShareQQ','onMenuShareWeibo']
                  // 所有要调用的 API 都要加到这个列表中
              });
              shareFunc();
          }
      );
  }


//=====================下面代码不用修改=================
  function shareFunc(){
    wx.ready(function () {
      // 在这里调用 API
      updateShare();
      // setInterval(updateShare, 5 * 1000);
    });

  }

  function updateShare(){
    wx.onMenuShareTimeline({//分享到朋友圈
      title: wxData.title, // 分享标题
      link: wxData.link, // 分享链接
      imgUrl: wxData.imgUrl, // 分享图标
      success: function () {
        //用户确认分享后执行的回调函数
        window.hideShareLayer && window.hideShareLayer();
      },
      cancel: function () {
        //用户取消分享后执行的回调函数
        window.hideShareLayer && window.hideShareLayer();
      }
    });

    wx.onMenuShareAppMessage({//分享给朋友
      title: wxData.title, // 分享标题
      desc: wxData.desc, // 分享描述
      link: wxData.link, // 分享链接
      imgUrl: wxData.imgUrl, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        //用户确认分享后执行的回调函数
        window.hideShareLayer && window.hideShareLayer();
      },
      cancel: function () {
        //用户取消分享后执行的回调函数
        window.hideShareLayer && window.hideShareLayer();
      }
    });

    wx.onMenuShareQQ({//分享到QQ
      title: wxData.title, // 分享标题
      desc: wxData.desc, // 分享描述
      link: wxData.link, // 分享链接
      imgUrl: wxData.imgUrl, // 分享图标
      success: function () {
        //用户确认分享后执行的回调函数
        window.hideShareLayer && window.hideShareLayer();
      },
      cancel: function () {
        //用户取消分享后执行的回调函数
        window.hideShareLayer && window.hideShareLayer();
      }
    });

    wx.onMenuShareWeibo({//分享到腾讯微博
      title: wxData.title, // 分享标题
      desc: wxData.desc, // 分享描述
      link: wxData.link, // 分享链接
      imgUrl: wxData.imgUrl, // 分享图标
      success: function () {
        //用户确认分享后执行的回调函数
        window.hideShareLayer && window.hideShareLayer();
      },
      cancel: function () {
        //用户取消分享后执行的回调函数
        window.hideShareLayer && window.hideShareLayer();
      }
    });
  }

  return {
    init:init,
    wxData: wxData,
    updateShare: updateShare
  }

})();
//这里填写分享时的信息

