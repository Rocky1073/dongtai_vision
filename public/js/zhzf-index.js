var baseurl = 'http://sq.hnszcg.gov.cn';
$(function() {
  /*nav-获取本地时间*/
  //同步当前设备的时间
  time();
  setInterval(function() {
    time();
  }, 1000);
  function time() {
    var date = new Date();
    var year = date.getFullYear(); //年
    var month = date.getMonth(); //月
    var day = date.getDate(); //日
    var hours = date.getHours(); //小时
    var minutes = date.getMinutes(); //分
    var seconds = date.getSeconds(); //秒

    //当以下的长度等于1的时,为前面补0
    if (month.toString().length == 1) {
      month = '0' + (month + 1);
    } else {
      month = month + 1;
    }
    if (day.toString().length == 1) {
      day = '0' + day;
    }
    if (hours.toString().length == 1) {
      hours = '0' + hours;
    }
    if (minutes.toString().length == 1) {
      minutes = '0' + minutes;
    }
    if (seconds.toString().length == 1) {
      seconds = '0' + seconds;
    }
    var wd = date.getDay();
    switch (wd) {
      case 0:
        wd = '星期日';
        break;
      case 1:
        wd = '星期一';
        break;
      case 2:
        wd = '星期二';
        break;
      case 3:
        wd = '星期三';
        break;
      case 4:
        wd = '星期四';
        break;
      case 5:
        wd = '星期五';
        break;
      case 6:
        wd = '星期六';
        break;
    }
    //年月日
    $('.year').text(year);
    $('.month').text(month);
    $('.day').text(day);

    //时分秒
    $('.hours').text(hours);
    $('.minutes').text(minutes);
    $('.seconds').text(seconds);

    //周
    $('.week').text(wd);
  }
  /*nav-获取本地时间*/

  /*轮比图*/
  $(document).ready(function() {
    var t;
    var index = -1;
    var times = 3000; //间隔时间
    t = setInterval(play, times);

    function play() {
      index++;
      if (index > 3) {
        index = 0;
      }
      $('.img')
        .eq(index)
        .fadeIn(1000)
        .siblings()
        .fadeOut(1000);
      $('.cir')
        .eq(index)
        .addClass('cr')
        .siblings()
        .removeClass('cr');
    }

    $('.cir').click(function() {
      $(this)
        .addClass('cr')
        .siblings()
        .removeClass('cr');
      var index = $(this).index();
      $('.img')
        .eq(index)
        .fadeIn(600)
        .siblings()
        .fadeOut(600);
    });

    // $('.pre').click(function(){
    //     index--
    //     if(index<0){index=3}
    //     $('.img').eq(index).fadeIn(1000).siblings().fadeOut(1000)
    //     $('.cir').eq(index).addClass('cr').siblings().removeClass('cr')
    // })
    // $('.next').click(function(){
    //     index++
    //     if(index>3){index=0}
    //     $('.img').eq(index).fadeIn(1000).siblings().fadeOut(1000)
    //     $('.cir').eq(index).addClass('cr').siblings().removeClass('cr')
    // })

    $('.banner').hover(
      function() {
        clearInterval(t);
      },
      function() {
        t = setInterval(play, times);
        function play() {
          index++;
          if (index > 3) {
            index = 0;
          }
          $('.img')
            .eq(index)
            .fadeIn(1000)
            .siblings()
            .fadeOut(1000);
          $('.cir')
            .eq(index)
            .addClass('cr')
            .siblings()
            .removeClass('cr');
        }
      },
    );
  });

  /*字体的向上轮播*/
  (function($) {
    $.fn.scrollTop = function(options) {
      var defaults = {
        speed: 30,
      };
      var opts = $.extend(defaults, options);
      this.each(function() {
        var $timer;
        var scroll_top = 0;
        var obj = $(this);
        var $height = obj.find('ul').height();
        var opacity = 1;
        obj
          .find('ul')
          .clone()
          .appendTo(obj);
        obj
          .hover(
            function() {
              clearInterval($timer);
            },
            function() {
              $timer = setInterval(function() {
                scroll_top++;
                if (scroll_top > 300) {
                }
                if (scroll_top > $height) {
                  scroll_top = 0;
                }
                obj
                  .find('ul')
                  .first()
                  .css('margin-top', -scroll_top);
              }, opts.speed);
            },
          )
          .trigger('mouseleave');
      });
    };
  })(jQuery);
  $(function() {
    $('#textScroll').scrollTop({
      speed: 60, //数值越大 速度越慢
    });
    $('.files-right-body').scrollTop({
      speed: 30, //数值越大 速度越慢
    });

    $('.roll-con').scrollTop({
      speed: 30, //数值越大 速度越慢
    });
  });
  $(function() {});

  /*展示数字跳动*/
  var options = {
    useEasing: true,
    useGrouping: false,
    separator: ',',
    decimal: '.',
  };
  var zongliang = new CountUp('zongliang', 0, 400, 0, 10, options);
  var lianshu = new CountUp('lianshu', 0, 15, 0, 10, options);
  var chuzhishu = new CountUp('chuzhishu', 0, 34, 0, 10, options);
  var anqi = new CountUp('anqi', 0, 235, 0, 10, options);
  var jieanshu = new CountUp('jieanshu', 0, 354, 0, 10, options);
  /*开始跳动*/
  zongliang.start();
  lianshu.start();
  chuzhishu.start();
  anqi.start();
  jieanshu.start();

  /* 更新数字*/
  /*展示数字跳动*/
  // setInterval(function() {
  //     var someValue =800;
  //     // var someValue =1600;
  //     zongliang.update(someValue);
  // }, 1500)

  navLiu($('.g-nav'));
  navLiu($('.center-header-nav'));
  navLiu($('.right-header-nav'));
  navLiu($('.rightcon-header-nav'));
  /*流体导览交互效果展示*/
  function navLiu(target) {
    var nav = target;
    var line = $('<div />').addClass('line');

    line.appendTo(nav);

    var active = nav.find('.active');
    var pos = 0;
    var wid = 0;

    if (active.length) {
      pos = active.position().left;
      wid = active.width();
      line.css({
        left: pos,
        width: wid,
      });
    }

    nav.find('ul li a').click(function(e) {
      if (
        !$(this)
          .parent()
          .hasClass('active')
      ) {
        e.preventDefault();

        var _this = $(this);

        nav.find('ul li').removeClass('active');

        var position = _this.parent().position();
        var width = _this.parent().width();

        if (position.left >= pos) {
          line.animate(
            {
              width: position.left - pos + width,
            },
            300,
            function() {
              line.animate(
                {
                  width: width,
                  left: position.left,
                },
                150,
              );
              _this.parent().addClass('active');
            },
          );
        } else {
          line.animate(
            {
              left: position.left,
              width: pos - position.left + wid,
            },
            300,
            function() {
              line.animate(
                {
                  width: width,
                },
                150,
              );
              _this.parent().addClass('active');
            },
          );
        }

        pos = position.left;
        wid = width;
      }
    });
  }

  /*地图信息展示*/
  $(function() {
    /*苏孟乡*/
    var sumeng = $('.sumengxiang');
    var sumengTip = $('#sumeng');
    mous(sumeng, sumengTip);

    /*汤溪*/
    var tangxizhen = $('.tangxizhen');
    var tangxiTip = $('#tangxi');
    mous(tangxizhen, tangxiTip);

    /*洋埠镇*/
    var yangmaozhen = $('.yangmaozhen');
    var yangmaozhenTip = $('#yangmaozhen');
    mous(yangmaozhen, yangmaozhenTip);

    /*罗埠镇*/
    var luomaozhen = $('.luomaozhen');
    var luomaozhenTip = $('#luomaozhen');
    mous(luomaozhen, luomaozhenTip);

    /*秋滨街道*/
    var qiubin = $('.qiubin');
    var qiubinTip = $('#qiubin');
    mous(qiubin, qiubinTip);

    /*西关街道*/
    var xiguan = $('.xiguan');
    var xiguanTip = $('#xiguan');
    mous(xiguan, xiguanTip);

    /*西关街道*/
    var sanjiang = $('.sanjiang');
    var sanjiangTip = $('#sanjiang');
    mous(sanjiang, sanjiangTip);

    /*西关街道*/
    var jiangnan = $('.jiangnan');
    var jiangnanTip = $('#jiangnan');
    mous(jiangnan, jiangnanTip);

    /*移入移出函数*/
    function mous(object, tips) {
      object.on({
        mouseover: function() {
          tips.fadeIn();
        },
        mouseout: function() {
          tips.fadeOut(100);
        },
      });
    }
  });
  /*当行蓝光圈*/
  var xmlns = 'http://www.w3.org/2000/svg',
    xlinkns = 'http://www.w3.org/1999/xlink',
    select = function(s) {
      return document.querySelector(s);
    },
    selectAll = function(s) {
      return document.querySelectorAll(s);
    };

  TweenMax.set('svg', {
    visibility: 'visible',
  });

  TweenMax.set('.blueRing', {
    rotation: 90,
    transformOrigin: '50% 50%',
  });

  TweenMax.to('.whole', 2.6, {
    rotation: 360,
    transformOrigin: '50% 50%',
    ease: Linear.easeNone,
    repeat: -1,
  });
});
