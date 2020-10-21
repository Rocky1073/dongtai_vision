goog.provide("HESCGIS.control.MapSwitcher");

goog.require('ol.control.Control');

HESCGIS.control.MapSwitcher = function(opt_options){
	var options = opt_options ? opt_options : {};
	
	this.element = document.getElementById(options.element);
	
	/**
	 * @private 
	 * 原始样式
	 */
	this.orginClassName_ = options.orginClassName_ ? options.orginClassName_ :"";
	
	/**
	 * @private 
	 * 切换样式
	 */
	this.changeClassName_ = options.changeClassName_ ? options.changeClassName_ : "";
	
	this.orginTitle_ = options.orginTitle ? options.orginTitle : "";
	
	this.orginLabel_ = document.createElement("label");
	
	var cssClassName = options.className ? options.className : "";
	
	this.isMapChanged_ = false;
	
	this.orginLabel_ = "";
	
	if(!this.element){ //创建容器
		this.element = document.createElement("div");
	
	}
	
	this.element.className += (cssClassName + ' ' + ol.css.CLASS_UNSELECTABLE + ' ' + ol.css.CLASS_CONTROL);
	
	ol.control.Control.call(this, {
		element: this.element,
		target:options.target
	});
};
ol.inherits(HESCGIS.control.MapSwitcher, ol.control.Control);

/**
 * @inherited
 */
HESCGIS.control.MapSwitcher.prototype.setMap = function(map){
	ol.control.Control.prototype.setMap.call(this, map);
	if (map) {
		this.init_();
	} else {
		this.destroy_();
	}
};

/**
 * 初始化
 */
HESCGIS.control.MapSwitcher.prototype.init_ = function(){
	
	//监听切换器单击事件
	ol.events.listen(this.element, ol.events.EventType.CLICK,
			this.handleClick_, this);
};


HESCGIS.control.MapSwitcher.prototype.destory_ = function(){
	
};


/**
 * 单击事件处理
 * @private
 * @param {Event} event The event to handle
 */
HESCGIS.control.MapSwitcher.prototype.handleClick_ = function(event) {
	event.preventDefault();
	this.isMapChanged_ = ! this.isMapChanged_; 
	//控件信息做改变
	if(this.isMapChanged_){ //已做切换
		this.element.classList.remove("image");
		this.element.classList.add("vector");
		this.element.firstChild.setAttribute("title","矢量"); 
		this.element.firstChild.textContent = "矢		量"; 
	}else{//切换原始
		this.element.classList.remove("vector");
		this.element.classList.add("image");
		this.element.firstChild.setAttribute("title","影像"); 
		this.element.firstChild.textContent = "影		像"; 
	}
	
	//底图切换
	if(this.map_){
		this.map_.getLayers().forEach(function(layer,i){
			if(layer instanceof  ol.layer.Group){ //需要定制化更改
				if(layer.get("name") === "vector"){
					layer.setVisible(!this.isMapChanged_);
				}else if(layer.get("name")==="image"){
					layer.setVisible(this.isMapChanged_);
				}
			}
		},this);
		
	}

};

