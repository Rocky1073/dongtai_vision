var map;
/**
 * @desc 定义坐标系统与范围
 */
var worldExtent = [-180,-90,180,90 ];// 世界范围
var projection = ol.proj.get("EPSG:4326"); //4326坐标

/**
 * @desc 去掉第0层的天地图分辨率信息，不会出现缩放到最后是空白的现象
 */
var tdtResolutions = [ 0.703125, 0.3515625, 0.17578125, 0.087890625,
		0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625,
		0.00274658203125, 0.001373291015625, 0.0006866455078125,
		0.00034332275390625, 0.000171661376953125, 0.0000858306884765625,
		0.00004291534423828125, 0.000021457672119140625,
		0.0000107288360595703125];

/**
 *@desc 与分辨率信息需要每层严格对应起来
 */
var matrixIds = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

/**
 * @desc 天地图格网信息
 */
var tdtGrid = new ol.tilegrid.WMTS( {
	extent : worldExtent,
	origin : [ -180, 90 ],
	resolutions : tdtResolutions,
	matrixIds : matrixIds
});


var gateStyle = new ol.style.Style({
	image:new ol.style.Icon({
		size:[32,32],
		opacity: 0.9,
		src:"../screen/src/image/gate/gate32.png"
	})
});

var gatesSource = new ol.source.Vector();

// var gateLayer = new ol.layer.Vector({
// 	source:gatesSource,
// 	style:gateStyle
// });

/**
 * @desc 天地图图层
 */
var wmtsVecLayer = new ol.layer.Tile( {
	source : new ol.source.WMTS( {
		layer : 'vec',
		style : 'default',
		version : '1.0.0',
		matrixSet : 'c',
		format : 'tiles',
		url : 'http://t{0-6}.tianditu.com/vec_c/wmts',
		tileGrid : tdtGrid,
		wrapX : true,
		projection : projection
	})
});

var wmtsAnnoLayer = new ol.layer.Tile( {
	source : new ol.source.WMTS( {
		layer : 'cva',
		style : 'default',
		version : '1.0.0',
		matrixSet : 'c',
		format : 'tiles',
		url : 'http://t{0-6}.tianditu.com/cva_c/wmts',
		tileGrid : tdtGrid,
		wrapX : true,
		projection : projection
	})
});

var clusterSource = new ol.source.Cluster({
	distance:40,
	source:new ol.source.Vector()
});

var gatesClusterlayer =new ol.layer.AnimatedCluster({
	name:'Gates',
	source:clusterSource,
	style:gateStyleFun
});

var styleCache = {};

/**
 * @desc 初始化
 * @return
 */
$(function(){
	initMap();
	loadGates();
});


/**
 * @desc:初始化地图
 * @return
 */
function initMap() {     
	map = new ol.Map( {
		view : new ol.View({
			// extent:[120.320631,30.311294,120.332057,30.319126],//定义地图容器范围，不是地图的初始化范围
			center : [120.327218,30.317945],
			zoom :14,
			projection : projection
		}),
		layers : [ wmtsVecLayer,wmtsAnnoLayer],
		target : 'map',
		logo:false,
		controls:[]
	});
	map.addLayer(gatesClusterlayer);
	getRealtimePosition();
	
		// Pulse on click 
	// map.on('singleclick', function(evt) {	
		//测试

		//pulseFeature(evt.coordinate);
	// });


	// singleClickSelect = new ol.interaction.Select({
	// 	layers:[gateLayer]
	// });

	// map.addInteraction(singleClickSelect);

	// //单击选中事件
	// singleClickSelect.on("select",function(evt){
	// 	 console.log(evt.target.getFeatures().item(0));
	// });
}

function getRealtimePosition(){
	/*var x = Math.random()*(120.376902-120.330125)+120.330125;
	var y =  Math.random()*(30.312703-30.277427)+30.277427;
	console.log(x+";"+y);
	var coordinate = [x,y];
	pulseFeature(coordinate);*/
	var path = '18.50.129.33:9090';
	var uid = 1;
	if (uid == -1) {
	    location.href = "/";
    }
    var websocket;
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://" + path + "/ws?uid=" + uid);
    } else if ('MozWebSocket' in window) {
        websocket = new MozWebSocket("ws://" + path + "/ws" + uid);
    } else {
        websocket = new SockJS("http://" + path + "/ws/sockjs" + uid);
    }
    websocket.onopen = function (event) {
        console.log("WebSocket:已连接");
    };
    websocket.onmessage = function (event) {
		console.log("WebSocket:收到一条消息", event.data);
    	var obj = $.parseJSON(event.data);
    	var x = obj.longitude;
		var y = obj.latitude;
		console.log(x+";"+y);
		if(x&&y&&x!=0.0&&y!=0.0){
			var coordinate = [parseFloat(x),parseFloat(y)];
			pulseFeature(coordinate);	
		}		           
    };
    websocket.onerror = function (event) {
        console.log("WebSocket:发生错误 ");
        console.log(event);
    };
    websocket.onclose = function (event) {
        console.log("WebSocket:已关闭");
        console.log(event);
    }
}

function loadGates(){
	$.getJSON('http://18.50.129.33:9090/device/getDeviceList', function(gatejson) {
		if(gatejson.status == true){
			var features = [];
			$.each(gatejson.result,function(i,gate){
				if(gate.longitude&&gate.latitude){
					var coordinate =[parseFloat(gate.longitude),parseFloat(gate.latitude)];
					var feature = new ol.Feature();
					feature.setGeometry(new ol.geom.Point(coordinate));
					feature.set("attributes",gate);
					features.push(feature);	
				}
			});
			clusterSource.getSource().clear();
			clusterSource.getSource().addFeatures(features);
		}	
	});
}



function gateStyleFun(feature,resolutions){
	var size = feature.get('features').length;
	var style = styleCache[size];
	if (!style){	
		var color = size>25 ? "192,0,0" : size>8 ? "255,128,0" : "0,128,0";
		var radius = Math.max(8, Math.min(size*0.75, 20));
		var dash = 2*Math.PI*radius/6;
		var dash = [ 0, dash, dash, dash, dash, dash, dash ];
		style = styleCache[size] = new ol.style.Style({
			image: new ol.style.Circle({ 
				radius: radius,
				stroke: new ol.style.Stroke({	
						color: "rgba("+color+",0.5)", 
						width: 15 ,
						lineDash: dash,
						lineCap: "butt"
					}),
					fill: new ol.style.Fill({	
						color:"rgba("+color+",1)"
					})
				}),
				text: new ol.style.Text({	
					text: size.toString(),
					fill: new ol.style.Fill({	
						color: '#fff'
				})
			})
		});
	}
	return [style];
}


	// Pulse feature at coord
function pulseFeature(coord){
	var f = new ol.Feature (new ol.geom.Point(coord));
	f.setStyle (new ol.style.Style({
		image: new ol.style.Circle ({
				radius: 20, 
				stroke: new ol.style.Stroke ({ color: "#CD0000", width:2 })
		    })
		}));
		map.animateFeature (f, new ol.featureAnimation.Zoom(
			{	fade: ol.easing.easeOut, 
				duration:1000, 
				easing: ol.easing.easeOut 
		}));
}


// function pulse(coord){
// 	for (var i=0; i<3; i++){	
// 	    setTimeout (function(){
// 	    	pulseFeature (coord);
// 			}, i*500);
// 		};
// 	}












