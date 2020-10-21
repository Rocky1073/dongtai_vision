/**
 * OpenLayers 3 AlertTool Control.
 * See [the examples](./examples) for usage.
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object} opt_options Control options, extends olx.control.ControlOptions adding:
 *                              **`tipLabel`** `String` - the button tooltip.
 */
(function (root, factory) {
  if(typeof define === "function" && define.amd) {
    define(["openlayers"], factory);
  } else if(typeof module === "object" && module.exports) {
    module.exports = factory(require("openlayers"));
  } else {
    root.LayerSwitcher = factory(root.ol);
  }
}(this, function(ol) {
ol.control.AlertTool = function(opt_options) {

  var options = opt_options || {};

  this.data = options.data ?options.data : {};
  data=this.data;
  if(this.data.length==0){console.log("数据不能为空");return;}
  //滚动速度，数值越大速度越慢
  this.speed = options.speed ?options.speed : 20;
  this.mapListeners = [];
  
  // 隐藏时className
  this.hiddenClassName = 'bom-roll-min';
  if (ol.control.AlertTool.isTouchDevice_()) {
      this.hiddenClassName += ' touch';
  }
  // 显示时className
  this.shownClassName = 'bom-roll-blank';

  //隐藏时显示的元素
  var elementMin = document.createElement('div');
  elementMin.className = this.hiddenClassName;
  elementMin.style.display = 'none';

  var htmlMin = '';
  htmlMin += '<p>';
  htmlMin += '<img src="../../static/hescgis/assets/images/controls/double-up-jian.png" alt="">';
  htmlMin += '</p>';
  htmlMin += '<p>轨迹分析</p>';
  elementMin.innerHTML = htmlMin;
  
  
  //显示时显示的元素
  var elementShow = document.createElement('div');
  elementShow.className = this.shownClassName;
  elementShow.style.display = 'block';

  var alertTitle = document.createElement('div');
  alertTitle.className ="roll-title";
  elementShow.appendChild(alertTitle);
  
  var titleGuiJi = document.createElement('span');
  titleGuiJi.className ="roll-title-item active-roll-item";
  titleGuiJi.id ="guiJi";
  alertTitle.appendChild(titleGuiJi);
  var htmlGuiJi = '';
  htmlGuiJi += '轨迹分析 <span class="white-blank"></span>';
  titleGuiJi.innerHTML = htmlGuiJi;
  
  var titleYueJie = document.createElement('span');
  titleYueJie.className ="roll-title-item";
  titleYueJie.id ="yueJie";
  alertTitle.appendChild(titleYueJie);
  var htmlYueJie = '';
  htmlYueJie += '越界分析 <span class="white-blank"></span>';
  titleYueJie.innerHTML = htmlYueJie;
  
  var titleKaoQin = document.createElement('span');
  titleKaoQin.className ="roll-title-item";
  titleKaoQin.id ="kaoQin";
  alertTitle.appendChild(titleKaoQin);
  var htmlKaoQin = '';
  htmlKaoQin += '考勤分析 <span class="white-blank"></span>';
  titleKaoQin.innerHTML = htmlKaoQin;
  
  var titleAnJian = document.createElement('span');
  titleAnJian.className ="roll-title-item";
  titleAnJian.id ="anJian";
  alertTitle.appendChild(titleAnJian);
  var htmlAnJian = '';
  htmlAnJian += '案件列表 <span class="white-blank"></span>';
  titleAnJian.innerHTML = htmlAnJian;
  
  var minButton = document.createElement('span');
  minButton.className ="right-roll-item";
  alertTitle.appendChild(minButton);
  var htmlButton = '';
  htmlButton += '<img  src="../../static/hescgis/assets/images/controls/double-down.png" str="1" alt="" >';
  minButton.innerHTML = htmlButton;
  
  //表格内容
  var table = document.createElement('div');
  table.className ="roll-table";
  elementShow.appendChild(table);
  
  var htmlTable = '';
  htmlTable += '<p class="fir-p"><span>姓名</span><span>工号</span><span>开始时间</span><span>结束时间</span><span>状态</span><span>告警</span></p>';
  table.innerHTML = htmlTable;

  var tableMain = document.createElement('div');
  tableMain.className ="main-box box";
  table.appendChild(tableMain);
  
  //表格数据需要动态填充
  var tableData = document.createElement('div');
  tableData.className ="roll-roll";
  tableMain.appendChild(tableData);
  
  var dataTemp=this.data['guiJi'].data;
	  var htmlTemp='';
	  for(var k=0;k<dataTemp.length;k++)
	  {
		htmlTemp+='<p><span>'+dataTemp[k].name+'</span><span>'+dataTemp[k].no+'</span><span>'+dataTemp[k].startTime+'</span><span>'+dataTemp[k].endTime+'</span><span>'+dataTemp[k].state+'</span><span>'+dataTemp[k].alertInfo+'</span></p>';
	  }
  tableData.innerHTML=htmlTemp;
  
  //动态滚动复制
  var tableDataClone = document.createElement('div');
  tableDataClone.className ="roll-roll";
  tableMain.appendChild(tableDataClone);
  
  var this_ = this;

  elementMin.onclick=function(e){
	  e = e || window.event;
	  this_.showPanel();
      e.preventDefault();
  };
  minButton.onclick=function(e){
	  e = e || window.event;
	  this_.hidePanel();
	  
  };

  for(var i=0;i<alertTitle.children.length-1;i++)
  {
	var ele=alertTitle.children[i];
	ele.onclick=function(e){
	  e = e || window.event;
	  for(var j=0;j<alertTitle.children.length-1;j++)
	  {
		  removeClass(alertTitle.children[j],'active-roll-item');
	  }
	  var dataTarget=data[e.target.id]?data[e.target.id].data:[];
	  addClass(e.target,'active-roll-item');
	  var htmlThisData='';
	  for(var k=0;k<dataTarget.length;k++)
	  {
		htmlThisData+='<p><span>'+dataTarget[k].name+'</span><span>'+dataTarget[k].no+'</span><span>'+dataTarget[k].startTime+'</span><span>'+dataTarget[k].endTime+'</span><span>'+dataTarget[k].state+'</span><span>'+dataTarget[k].alertInfo+'</span></p>';
	  }
	  tableData.innerHTML=htmlThisData;
	  tableDataClone.innerHTML=htmlThisData;
	};
  }
  
  //控件父元素
  var element = document.createElement('div');
  element.className = 'alertTool';
  element.appendChild(elementMin);
  element.appendChild(elementShow);

  ol.control.Control.call(this, {
      element: element,
  });
   
  tableDataClone.innerHTML = tableData.innerHTML;  
  var speed=this.speed;
  function Marquee() {  
    if (tableMain.offsetTop - tableMain.scrollTop <= 0) {  
        tableMain.scrollTop -= tableData.offsetHeight;  
    } else {  
        tableMain.scrollTop++;  
    }  
  }  
  var MyMar = setInterval(Marquee, speed);  
  
  tableMain.onmouseover = function() {  
    clearInterval(MyMar);  
  }  
  
  tableMain.onmouseout = function() {  
    MyMar = setInterval(Marquee,speed);  
  } 
 

};


function addClass(obj, cls){
  var obj_class = obj.className,//获取 class 内容.
  blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
  added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
  obj.className = added;//替换原来的 class.
}
  
function removeClass(obj, cls){
  var obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
  obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
  removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
  removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
  obj.className = removed;//替换原来的 class.
}

ol.inherits(ol.control.AlertTool, ol.control.Control);

  /**
  * 显示 AlertTool.
  */
  ol.control.AlertTool.prototype.showPanel = function() {
    if (this.element.children[0].style.display == 'block') {
		this.element.children[0].style.display = 'none';
		this.element.children[1].style.display = 'block';
	}
  };

	/**
	 * 隐藏 AlertTool.
	 */
  ol.control.AlertTool.prototype.hidePanel = function() {
	if (this.element.children[0].style.display == 'none') {
		this.element.children[0].style.display = 'block';
		this.element.children[1].style.display = 'none';
	}
  };

  var sketch;
  var helpTooltipElement;
    createHelpTooltip();

    var listener;
 

  function createHelpTooltip() {
    if (helpTooltipElement) {
      helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hidden';
  }

  

/**
 * Set the map instance the control is associated with.
 * @param {ol.Map} map The map instance.
 */
ol.control.AlertTool.prototype.setMap = function(map) {
    // Clean up listeners associated with the previous map
    for (var i = 0, key; i < this.mapListeners.length; i++) {
        this.getMap().unByKey(this.mapListeners[i]);
    }
    this.mapListeners.length = 0;
    // Wire up listeners etc. and store reference to new map
    ol.control.Control.prototype.setMap.call(this, map);
    if (map) {
        var this_ = this;
        this.mapListeners.push(map.on('pointerdown', function() {
            this_.hidePanel();//////////////////////////////////////////////////////////
        }));
    }
};

/**
 * Generate a UUID
 * @returns {String} UUID
 *
 * Adapted from http://stackoverflow.com/a/2117523/526860
 */
ol.control.AlertTool.uuid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

/**
* @private
* @desc Apply workaround to enable scrolling of overflowing content within an
* element. Adapted from https://gist.github.com/chrismbarr/4107472
*/
ol.control.AlertTool.enableTouchScroll_ = function(elm) {
   if(ol.control.AlertTool.isTouchDevice_()){
       var scrollStartPos = 0;
       elm.addEventListener("touchstart", function(event) {
           scrollStartPos = this.scrollTop + event.touches[0].pageY;
       }, false);
       elm.addEventListener("touchmove", function(event) {
           this.scrollTop = scrollStartPos - event.touches[0].pageY;
       }, false);
   }
};

/**
 * @private
 * @desc Determine if the current browser supports touch events. Adapted from
 * https://gist.github.com/chrismbarr/4107472
 */
ol.control.AlertTool.isTouchDevice_ = function() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch(e) {
        return false;
    }
};
}));

