//地图管理容器
	var baseMapManager =  new HESCGIS.Managers.MapManager({configUrl: "hescgis/configs/config.json"});

//	加载模块
	var map=baseMapManager.getMap();
	map.getView().setCenter([119.495,29.047564]);
	map.getView().setZoom(11.6);
	var mapArr=map.getLayers().getArray();
	for(var j=0;j<mapArr.length;j++){
		if(mapArr[j].getType()=="VECTOR"){
			mapArr[j].setVisible(true);
		}else{
			mapArr[j].setVisible(false);
		}
	}
    var changeStyle = function(feature){
        return new ol.style.Style({
            fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
                color: feature.get('color')
            }),
            text:new ol.style.Text({
                text:feature.get('name'),
                font: '16px bold serif',
                fill: new ol.style.Fill({
                    color: '#000'
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 3
                })
            }),
            stroke: new ol.style.Stroke({ //边界样式
                color: 'blue',
                //lineDash: [4],
                width: 1
            })
        });

    };
	//鼠标移动
	var selectPointerMove = new ol.interaction.Select({
	  condition: ol.events.condition.pointerMove,
        style:changeStyle
	});
	map.addInteraction(selectPointerMove);
	//鼠标点击
	var selectSingleClick = new ol.interaction.Select({
        condition: ol.events.condition.click,
        style:changeStyle
	});
	map.addInteraction(selectSingleClick);
	var click = false;
	selectSingleClick.on('select', function(e) {
		var feature = e.target.getFeatures().getArray()[0];
		if(feature) {
		    click = true;
            var selectDomidThis=feature.get('domId');
            if(selectDomid){//从有数据移入另一个有数据的区域
                $('#'+selectDomid).fadeOut(100);
                $('#'+selectDomidThis).fadeIn();
                getAjax(type,feature.get('code'));
                selectDomid=selectDomidThis;
            }else{//从空白处移入另一个有数据的区域
                selectDomid=selectDomidThis;
                $('#'+selectDomidThis).fadeIn();
                getAjax(type,feature.get('code'));
            }
            getQiuChartByCode(feature.get('code'));
            clearInterval(window.t1);
		}
		else{
            click = false;
            //移出区域
            $('#'+selectDomid).fadeOut(100);
            getAjax(type);
            getQiuChartByCode('-');
            window.t1 = setInterval("getQiuData()",60000);
        }
	});
	var selectDomid='';
	selectPointerMove.on('select', function(e) {
		var lengthSelect=e.target.getFeatures().getArray().length;
		if(click){
			return;
		}
		if(lengthSelect){//移入区域
			var selectDomidThis=e.target.getFeatures().getArray()[0].get('domId');
			if(selectDomid){//从有数据移入另一个有数据的区域
				$('#'+selectDomid).fadeOut(100);
				$('#'+selectDomidThis).fadeIn();
                getAjax(type,e.target.getFeatures().getArray()[0].get('code'));
				selectDomid=selectDomidThis;
			}else{//从空白处移入另一个有数据的区域
				selectDomid=selectDomidThis;
				$('#'+selectDomidThis).fadeIn();
                getAjax(type,e.target.getFeatures().getArray()[0].get('code'));
			}
            getQiuChartByCode(e.target.getFeatures().getArray()[0].get('code'));
            clearInterval(window.t1);
		}else{
			//移出区域
			$('#'+selectDomid).fadeOut(100);
            getAjax(type);
            getQiuChartByCode('-');
            window.t1 = setInterval("getQiuData()",60000);
		}
	});



	//以下加载边界线
	var styleFunction = function(feature, resolution) {
		var name=feature.get('name');
//		for(var i=0;i<dataJson.length;i++)
//		{
//			if(dataJson[i].name==feature.get('name')){
//                feature.setProperties({name:(feature.get('name')+"("+dataJson[i].data+")")});
//
//            }
//		}
		var areaLineStyle = new ol.style.Style({
			/* fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
				color: feature.get('color')
			}), */
			text:new ol.style.Text({
				text:feature.get('name'),
				font: '16px bold serif',
				fill: new ol.style.Fill({
				  color: '#000'
				}),
				stroke: new ol.style.Stroke({
				  color: '#fff',
				  width: 3
				})
			}),
			stroke: new ol.style.Stroke({ //边界样式
				color: '#55DFF4',
				//lineDash: [4],
				width: 3
			})
		});
		return areaLineStyle;
	};

	var areaLineLayer= new ol.layer.Vector({
		title: "区域线图层",
		source: new ol.source.Vector({
			url: 'hescgis/configs/jinkaiqubianjie.json',
			format: new ol.format.GeoJSON()
			//features: (new ol.format.GeoJSON()).readFeatures(boundPoints)
		}),
		style: styleFunction
	})
	map.addLayer(areaLineLayer);
