
	//地图管理容器
	var baseMapManager =  new HESCGIS.Managers.MapManager({configUrl: "hescgis/configs/config.json"});
//	加载模块
	var map=baseMapManager.getMap();
	//地图服务
	var mapServer;
	//搜索范围
	var mapBound;
	
	var features;
	
	 //查询列表时加载
	var devVectorSource = new ol.source.Vector();
	  var devVectorLayer = new ol.layer.Vector({
	    source:devVectorSource
	   // style:pointStyleFunction
	  });
	  map.addLayer(devVectorLayer);
	  function pointStyleFunction(index){
	    var imgPath= 'hescgis/assets/images/controls/marker.png';
	    return [new ol.style.Style({
	        image: new ol.style.Icon({
	            anchor: [0.5, 1],
	            // opacity: 0.9,
	            //size:[30,30],
	            scale:0.7,
	            src: imgPath
	        }),
	        text: new ol.style.Text({
                font: 'normal bold 15px arial,sans-serif',
                text: index,
                fill: new ol.style.Fill({ color: "#fff" }),
                offsetY:-22,
                offsetX:0
            })

	    })]
	  };
	  
	  
	  
	//加载配置文件
		$.ajaxSettings.async = false; 
		$.getJSON ("hescgis/configs/configMapServer.json", function (data)  
	    {  
	        mapServer=  data.MapServer;
	        mapBound=data.boundAllRegion;
	    }); 
/*-----------------------------------地图交互的相关开始----------------------------------------------*/
/*地图日期控件*/
layui.use('form', function () {
    var form = layui.form;
    /*更新渲染页面*/
    form.render();
    /*layui日期*/
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render();
        //日期范围
        laydate.render({
            elem: '#test-laydate-range-date'
            , range: true
        });
    });
});
/*-----------------------------------------分页器----------------------------------------------------*/

/*地图交互页面*/
$("#search").click(function (e) {
    $(".map-build").html("");
    //阻止事件冒泡,防止波及本按钮
    e.stopPropagation();
    initParam();
});

 $("#mapDiv").click(function (e) {
    e.stopPropagation();
             	  
}); 

$(".call-map").click(function(e){
	//阻止事件冒泡,防止波及本按钮
	e.stopPropagation();
	//显示弹窗
	$("#map-nav").show();
    $("#map-detail").slideUp('300');
	$(".call-map").hide(300);
});

$(".layui-icon").click(function () {
    $(".searchStr").val("");
});

//点击图标弹框
map.on('click', function(evt) {
	var feature = map.forEachFeatureAtPixel(evt.pixel,
		function(feature) {
		  return feature;
		});
	if (feature&&typeof(feature.getId)&&feature.getId()) {
		toDetail(feature.getId());
		
	} else {
		var popup = $('#map-nav');
		popup.slideUp('300');
		$("#map-detail").slideUp('300');
		$(".call-map").show(300);
	  return;
	}
  });
/*-----------------------------------地图交互的相关结束----------------------------------------------*/

function initParam() {
    //获取起始时间和终止时间
    var dataStar = "";
    var dataEnd = "";
    var searchStr = "";
    var curpage = 1;
    var pageSize = 6;
    var PageCount = 0;
    if ($("#test-laydate-range-date").val()) {
        var str = $("#test-laydate-range-date").val();
        var num = str.indexOf(" - ");
        dataStar = str.substr(0, num);
        dataEnd = str.substr(-num, num);
    }
    if ($(".searchStr").val()) {
        searchStr = $(".searchStr").val();
    }
    getCount({
        "dataStar": dataStar,
        "dataEnd": dataEnd,
        "areaId": areaId,
        "registerStatus": registerStatus,
        "searchStr": searchStr,
        "curpage": curpage,
        "pageSize": pageSize
    });
}

function ajaxFenYe(datas, curpage, pageSize) {
    $.ajax({
        method: "POST",
        url: url + "zhcg_wzjz/gw/bigscreen/getBuildMapList",
        dataType: "json",
        // cache:false,
        data: datas
    }).done(function (data) {
    	
    	
    	devVectorSource.clear();
		features = new Array();
		
		
        // console.log(data);
        if (data && data.obj && data.obj.buildList && data.obj.buildList.length > 0) {
            for (var i = 0; i < data.obj.buildList.length; i++) {
            	var pointX=parseFloat(data.obj.buildList[i].coordinateX?data.obj.buildList[i].coordinateX:0);
        		var pointY=parseFloat(data.obj.buildList[i].coordinateY?data.obj.buildList[i].coordinateY:0);
        		if(pointX&&pointY){
        			var feature = new ol.Feature(new ol.geom.Point([pointX,pointY]));
        			feature.setId(data.obj.buildList[i].id);
        			var arr={"coordinateX":pointX,"coordinateY":pointY};
        			feature.setProperties(arr);
        			feature.setStyle(pointStyleFunction((i + 1 + (curpage - 1) * pageSize).toString()));
        			features.push(feature);
        		}
        		
                $(".map-build").append("<li class=\"build-item\" flex=“dir:left” onclick='toDetail(\""+ data.obj.buildList[i].id+"\","+pointX+","+pointY +")'>" +
                    "<div class=\"item-left\" flex=\"dir:left\">" +
                    "<div class=\"map-icon\">" +
                    "<i class=\"iconfont icon-dingwei2\"></i>" +
                    "<span class=\"build-bum\">" + (i + 1 + (curpage - 1) * pageSize) + "</span>" +
                    "</div>" +
                    "<div class=\"map-title\">" +
                    "<div class=\"map-title-header\" flex=\"dir:left cross:center\">" +
                    "<div class=\"stor-name\">" + data.obj.buildList[i].buildName + "</div>\n" +
                    "<div class=\"stor-state\" flex=\"main:center cross:center\">" + getName(wjStateName, wjStatenum, data.obj.buildList[i].registerStatus) + "</div>" +
                    "</div>" +
                    "<div class=\"map-title-body\">" + data.obj.buildList[i].buildAddress + "</div>\n" +
                    "</div>" +
                    "</div>" +
                    "<div class=\"item-right\">" +
                    "<div class=\"img-box\">" +
                    "<img src=\"" + data.obj.buildList[i].path + "\" alt=\"\">" +
                    "</div>" +
                    "</div>" +
                    "</li>");
            }
            devVectorSource.addFeatures(features);
       	 	map.getView().fit(devVectorSource.getExtent(), { duration: 500 });
            //显示弹窗
            $('#map-nav').slideDown("400");
            //隐藏弹窗
            $("#map-detail").hide();
        } else {
            //显示弹窗
            $('#map-nav').slideUp("300");
            layer.open({
                title: '温馨提示'
                , content: '没有查询到数据！'
            });
        }
    });
}

function getCount(datas) {
    $.ajax({
        method: "POST",
        url: url + "zhcg_wzjz/gw/bigscreen/getBuildMapList",
        dataType: "json",
        cache: false,
        data: datas
    }).done(function (data) {
        pageCount = data.obj.PageCount;
        initPage(pageCount, datas.pageSize, datas.dataStar, datas.dataEnd, datas.areaId, datas.registerStatus, datas.searchStr);
    });
}

function initPage(count, pageSize, dataStar, dataEnd, areaId, registerStatus, searchStr) {
    layui.use('laypage', function () {
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'navPage'
            , limit: pageSize
            , count: count//数据总数，从服务端得到
            , groups: 2
            , jump: function (obj, first) {
                $(".map-build").html("");
                // console.log(obj);
                ajaxFenYe({
                    "dataStar": dataStar,
                    "dataEnd": dataEnd,
                    "areaId": areaId,
                    "registerStatus": registerStatus,
                    "searchStr": searchStr,
                    "curpage": obj.curr,
                    "pageSize": obj.limit
                }, obj.curr, obj.limit);

                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                //首次不执行
                if (!first) {

                }
            }
        });
    });
}

//调用搜索详情接口
function getDetail(dataId){
    $.ajax({
        method:"POST",
        url:url +"zhcg_wzjz/gw/bigscreen/getBuildMapDetail",
        dataType:"json",
        data:{id:dataId}
    }).done(function(data){
        console.log(data);
        if(data && data.obj){
            $(".buildAcreage").html(data.obj.buildAcreage);
            $(".buildAddress").html(data.obj.buildAddress);
            $(".buildName").html(data.obj.buildName);
            $(".buildType").html(data.obj.buildType);
            $(".buildUse").html(data.obj.buildUse);
            $(".coverAcreage").html(data.obj.coverAcreage);
            $(".linkmanTelphone").html(data.obj.linkmanTelphone);
            $(".registerDepartment").html(data.obj.registerDepartment);
            $(".registerName").html(data.obj.registerName);
            $(".creatime").html(data.obj.creatime);
            $(".picPath").html(data.obj.picPath);
            var strPic = data.obj.picPath;
            var arrPic = strPic.split(",");
            $(".bigPicture img").attr("src","");
            $(".smallPicture").html("");
            for(var i = 0; i < arrPic.length; i++){
                if(i == 0){
                    $(".smallPicture").append("<li onclick='changePic("+i+",\""+arrPic[i]+"\")' class='active'><img src='"+arrPic[i]+"'></li>");
                    $(".bigPicture img").attr("src",arrPic[i]);
                }else{
                    $(".smallPicture").append("<li onclick='changePic("+i+",\""+arrPic[i]+"\")'><img src='"+arrPic[i]+"'></li>");
                }

            }
        }
    });
}

//监听select时间选中获取的值
var form = layui.form;
/*加载layui插件form*/
//监听select时间选中获取的值
form.on('select(seleState)', function (data) {
    window.registerStatus = data.value;//得到被选中的值
});
form.on('select(seleStreet)', function (data) {
    window.areaId = data.value;//得到被选中的值
});

function getName(arrName, arrNum, num) {
    for (var i = 0; i < arrName.length; i++) {
        if ($.trim(arrNum[i]) == $.trim(num)) {
            return arrName[i]
        }
    }
    return "";
}

var getEvent = function(){
    return window.event || arguments.callee.caller.arguments[0];
}
//点击查看详情
function toDetail(data,pointX,pointY) {
	 var e = getEvent();
	 e.stopPropagation();
    $("#map-nav").slideUp('300');;
    $("#map-detail").show();
	$(".call-map").slideUp('300');;
    getDetail(data);
	if(pointX&&pointY){
		flyTo(pointX,pointY,4);
	}
	
}
function flyTo(x,y,level) {
	var resolution;
	switch(parseInt(level)){
		case 1:resolution=0.0054931640625;//8级
		//0.02197265625;//6级
		//0.0054931640625;//8级
		break;
		case 2:resolution=0.0006866455078125;//10级
			//0.000171661376953125;//13级
		break;
		case 3:resolution=0.0000858306884765625;//14级
			//0.0000858306884765625;//14级
		break;
		case 4:resolution=0.000021457672119140625;//16级
			//0.0000107288360595703125;//17级
		break;
		default:resolution=0.0006866455078125;//10级
		break;
	}
	map.getView().animate(
	  { duration: 500, resolution: resolution },
	  { duration: 500, center: [x,y] }
	);
}

//详情中图片切换
function changePic(num,url) {
    $(".bigPicture img").attr("src",url);
    for(var i=0;i<$(".smallPicture li").length;i++){
        $(".smallPicture li").eq(i).removeClass("active");
    }
    $(".smallPicture li").eq(num).addClass("active")
}

//点击详情的返回搜索列表
$(".linkBack").click(function (e) {
	//阻止事件冒泡,防止波及本按钮
	e.stopPropagation();
    $("#map-nav").show();
    $("#map-detail").slideUp('300');
});

