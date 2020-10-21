
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
    $(".sname").val("");
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
    var sname = "";
    var curpage = 1;
    var pageSize = 6;
    var PageCount = 0;
    if ($("#test-laydate-range-date").val()) {
        var str = $("#test-laydate-range-date").val();
        var num = str.indexOf(" - ");
        dataStar = str.substr(0, num);
        dataEnd = str.substr(-num, num);
    }
    if ($(".sname").val()) {
        sname = $(".sname").val();
    }
    getCount({
        "dataStar": dataStar,
        "dataEnd": dataEnd,
        "roadId": roadId,
        "pid": pid,
        "sname": sname,
        "curpage": curpage,
        "pageSize": pageSize
    });
}

function ajaxFenYe(datas, curpage, pageSize) {
    $.ajax({
        method: "POST",
        url: url + "zhcg_mqsb/gw/bigscreen/getMqsbBigScreenStoreList",
        dataType: "json",
        // cache:false,
        data: datas
    }).done(function (data) {
        devVectorSource.clear();
		features = new Array();
        // console.log(data);
        if (data && data.obj && data.obj.mqsbStoreList && data.obj.mqsbStoreList.length > 0) {
            for (var i = 0; i < data.obj.mqsbStoreList.length; i++) {
            	var pointX=parseFloat(data.obj.mqsbStoreList[i].coordinateX?data.obj.mqsbStoreList[i].coordinateX:0);
        		var pointY=parseFloat(data.obj.mqsbStoreList[i].coordinateY?data.obj.mqsbStoreList[i].coordinateY:0);
        		if(pointX&&pointY){
        			var feature = new ol.Feature(new ol.geom.Point([pointX,pointY]));
        			feature.setId(data.obj.mqsbStoreList[i].id);
        			var arr={"coordinateX":pointX,"coordinateY":pointY};
        			feature.setProperties(arr);
        			feature.setStyle(pointStyleFunction((i + 1 + (curpage - 1) * pageSize).toString()));
        			features.push(feature);
        		}

                $(".map-build").append("<li class=\"build-item\" flex=“dir:left” onclick='toDetail(\""+ data.obj.mqsbStoreList[i].id+"\","+pointX+","+pointY +")'>" +
                    "<div class=\"item-left\" flex=\"dir:left\">" +
                    "<div class=\"map-icon\">" +
                    "<i class=\"iconfont icon-dingwei2\"></i>" +
                    "<span class=\"build-bum\">" + (i + 1 + (curpage - 1) * pageSize) + "</span>" +
                    "</div>" +
                    "<div class=\"map-title\">" +
                    "<div class=\"map-title-header\" flex=\"dir:left cross:center\">" +
                    "<div class=\"stor-name\">" + data.obj.mqsbStoreList[i].storeName + "</div>\n" +
                    "</div>" +
                    "<div class=\"map-title-body\">" +
                    "<p><em>"+data.obj.mqsbStoreList[i].storeScore+"分" +
                    "<span class='"+ ((data.obj.mqsbStoreList[i].starName > 0 && data.obj.mqsbStoreList[i].starName < 4) ? "xinxin" : "" ) +" r1'></span>" +
                    "<span class='"+ ((data.obj.mqsbStoreList[i].starName > 1 && data.obj.mqsbStoreList[i].starName < 4) ? "xinxin" : "" ) +" r2'></span>" +
                    "<span class='"+ ((data.obj.mqsbStoreList[i].starName > 2 && data.obj.mqsbStoreList[i].starName < 4) ? "xinxin" : "" ) +" r3'></span>" +
                    "<span class='"+((data.obj.mqsbStoreList[i].starName == 5) ? "huangpai" : "" )+" r4'></span>"+
                    "<span class='"+((data.obj.mqsbStoreList[i].starName == 4) ? "hongpai"  : "" )+" r4'></span>"+
                    "</em></p>" +
                    "<p>"+data.obj.mqsbStoreList[i].organizationName+data.obj.mqsbStoreList[i].roadName+data.obj.mqsbStoreList[i].storeAddress+"</p>"+
                    "</div>\n" +
                    "</div>" +
                    "</div>" +
                    "<div class=\"item-right\">" +
                    "<div class=\"img-box\">" +
                    "<img src=\"" + data.obj.mqsbStoreList[i].path + "\" alt=\"\">" +
                    "</div>" +
                    "</div>" +
                    "</li>");
            }
            devVectorSource.addFeatures(features);
       	 	// map.getView().fit(devVectorSource.getExtent(), { duration: 500 });
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
        url: url + "zhcg_mqsb/gw/bigscreen/getMqsbBigScreenStoreList",
        dataType: "json",
        cache: false,
        data: datas
    }).done(function (data) {
        pageCount = data.obj.PageCount;
        initPage(pageCount, datas.pageSize, datas.dataStar, datas.dataEnd, datas.roadId, datas.pid, datas.sname);
    });
}

function initPage(count, pageSize, dataStar, dataEnd, roadId, pid, sname) {
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
                    "roadId": roadId,
                    "pid": pid,
                    "sname": sname,
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
        url:url +"zhcg_mqsb/gw/bigscreen/getMqsbBigScreenStoreDetail",
        dataType:"json",
        data:{id:dataId}
    }).done(function(data){
        console.log(data);
        $(".mqsb-gradeRecord").html("");
        if(data && data.obj){
            //身份证照片
            var iDcardImgs=[];
            iDcardImgs[0] = data.obj.fileContent1;
            iDcardImgs[1] = data.obj.fileContent2;
            //获取店铺照片
            var shopImgs= data.obj.fileContent3.split(",");
            //营业执照照片
            var businessLicenseImgs = data.obj.fileContent4.split(",");
            //电子签约照片
            var slectronicsImgs = data.obj.fileContent5.split(",");

            //初始化
            $(".bigPicture ul").html("");
            $(".shwoImgsUl").css("left",0);
            $(".bigPicture .left").hide();
            $(".bigPicture .right").hide();
            $(".mqsb-detail-button a").removeClass("active");
            $(".mqsb-detail-button a").eq(0).addClass("active");
            $(".bigPicture ul").css("width",$(".bigPicture").innerWidth()*(iDcardImgs.length)+"px");
            loadImgs(iDcardImgs);
            showImgBut(iDcardImgs);

            //数据绑定
            $(".shopImg").attr("src",shopImgs[0]);
            $(".mqsb-detail-title .p1").html(data.obj.storeName);
            $(".mqsb-detail-title .p2").html(data.obj.credit);
            $(".mqsb-detail-title .storeScore").html(data.obj.storeScore+'分');
            $(".storeAddress").html(data.obj.storeAddress);
            $(".areaName").html(data.obj.areaName);
            $(".roadName").html(data.obj.roadName);
            $(".userName").html(data.obj.userName);
            $(".mobileNo").html(data.obj.mobileNo);
            $(".cardId").html(data.obj.cardId);
            $(".openStoreTime").html(data.obj.openStoreTime);
            $(".updateTime").html(data.obj.updateTime);
            $(".createname").html(data.obj.createname);
            $(".createtime").html(data.obj.createtime);
            //星级图片显示
            if(data.obj.star >0 && data.obj.star < 4 ){
                $(".showIcon span").eq(0).addClass("xinxin");
            }
            if(data.obj.star >1 && data.obj.star < 4 ){
                $(".showIcon span").eq(1).addClass("xinxin");
            }
            if(data.obj.star >2 && data.obj.star < 4 ){
                $(".showIcon span").eq(2).addClass("xinxin");
            }
            if(data.obj.star == 4){
                $(".showIcon span").eq(3).addClass("hongpai");
            }
            if(data.obj.star == 5){
                $(".showIcon span").eq(4).addClass("huangpai");
            }
            //打分模块
            for( var i = 0 ; i< data.obj.mapStoreScoreList.length;i++) {
                $(".mqsb-gradeRecord").append(
                    "<li>" +
                    "<p class='p1'>"+ data.obj.mapStoreScoreList[i].score_reason+"</p>" +
                    "<p class='p2'>"+data.obj.mapStoreScoreList[i].score_time+"</p>" +
                    "<span class='"+(data.obj.mapStoreScoreList[i].score_number<0 ? "s1":"")+"'>"+data.obj.mapStoreScoreList[i].score_number+"分</span>" +
                    "</li>");
            }

            //点击按钮切换效果
            $(".mqsb-detail-button a").click(function(){
                $(".mqsb-detail-button a").removeClass("active");
                $(this).addClass("active");
                $(".bigPicture ul").html("");
                if($(this).html() == "身份证"){
                    loadImgs(iDcardImgs);
                    showImgBut(iDcardImgs);
                }else if($(this).html() == "店铺照片"){
                    loadImgs(shopImgs);
                    showImgBut(shopImgs);
                }else if($(this).html() == "营业执照"){
                    loadImgs(businessLicenseImgs);
                    showImgBut(businessLicenseImgs);
                }else if($(this).html() == "电子签约"){
                    loadImgs(slectronicsImgs);
                    showImgBut(slectronicsImgs);
                }

            });
        }
    });
}
var countChange = 0;
var flag = true;
var flag2 = true;
//点击按钮图片轮播
    $(".bigPicture .left").click(function () {
        if(!flag){return};
        flag = false;
        if(parseInt($(".shwoImgsUl").css("right")) == -338){
            $(".bigPicture .left").hide();
        }else{
            $(".bigPicture .left").show();
        }
        countChange++;
        $(".shwoImgsUl").animate({left:-338*countChange},1000,function () {
            if(parseInt($(".shwoImgsUl").css("left")) != 0){
                $(".bigPicture .right").show();
            }
            flag = true;
        });
    });
    $(".bigPicture .right").click(function () {
        if(!flag2){return};
        flag2 = false
        if(parseInt($(".shwoImgsUl").css("left")) == -338){
            $(".bigPicture .right").hide();
        }else{
            $(".bigPicture .right").show();
        }
        countChange--;
        $(".shwoImgsUl").animate({left:-338*countChange},1000,function () {
            if(parseInt($(".shwoImgsUl").css("right")) != 0){
                $(".bigPicture .left").show();
            }
            flag2 = true;
        });
    });

//是否显示图片切换按钮
    function showImgBut(arrImg){
        if(arrImg.length < 2){
            $(".bigPicture .left").hide();
            $(".bigPicture .right").hide();
        }else{
            $(".bigPicture .left").show();
        }
        $(".bigPicture .right").hide();
        $(".bigPicture ul").css("width",$(".bigPicture").innerWidth()*(arrImg.length)+"px");
        countChange = 0;
        $(".shwoImgsUl").css("left",0);
    }

//加载图片方法
    function loadImgs(arrImg){
        for(var i= 0 ; i < arrImg.length; i++){
            $(".bigPicture ul").append("<li><img src='"+arrImg[i]+"'></li>");
        }

    }

//初始化星级图片
    function initImgs(){
        $(".showIcon span").eq(0).removeClass("xinxin");
        $(".showIcon span").eq(1).removeClass("xinxin");
        $(".showIcon span").eq(2).removeClass("xinxin");
        $(".showIcon span").eq(3).removeClass("hongpai");
        $(".showIcon span").eq(4).removeClass("huangpai");
    }

//监听select时间选中获取的值
var form = layui.form;
/*加载layui插件form*/
//监听select时间选中获取的值
form.on('select(seleAreas)', function (data) {
    window.pid = data.value;//得到被选中的值
});
form.on('select(seleRoads)', function (data) {
    window.roadId = data.value;//得到被选中的值
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
    $("#map-detail").slideUp('100');
    initImgs();
});

