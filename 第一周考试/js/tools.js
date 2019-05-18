// 工具包

var tools ={
	/* 
	查找DOM元素
	selector <string>选择器
	[isAll] <boolean>查询是否所有，默认为false
	[parent] <DOMDObject>父级对象，默认为document
	return <DOMObject><NodeList>
	 */
	$:function (selector,isAll,parent){
		parent = parent||document;
		if (isAll) {
			return parent.querySelectorAll(selector);
		}
		return parent.querySelector(selector);
	},
	// 获取元素属性
	// obj <DOMObjct>要获取样式的元素
	// attr <string>需要的属性
	// return <string>属性值
	getstyle:function(obj,attr){
		if (obj.currentStyle) {
			// IE兼容
			return obj.currentStyle[attr];
		}
		return getComputedStyle(obj,false)[attr];
	},
	// 计算到浏览器的距离
	// obj <DOMObject>需要计算的元素
	// return {left,top}
	getBodyDis:function(obj){
		// 给left top 一个初始值
		var left = 0,top = 0;
		// 判断obj 的包含块是否是body（body的offsetParent为null）
		while (obj.offsetParent !== null){
			// obj.offsetLeft（obj到包含块的距离）
			// obj.offsetParent.clientLeft（obj的包含块的左边框的宽度）
			left += obj.offsetLeft + obj.offsetParent.clientLeft;
			top += obj.offsetTop + obj.offsetParent.clientTop;
			// 循环相加 把 obj往前走一步 （步进）
			obj = obj.offsetParent;
		}
		return {
			"left":left,
			"top":top
		}
	},
	// 得到可视窗口的大小
	// return{width,height}
	getBodySize:function(){
		return {
			width:document.documentElement.clientWidth || document.body.clientWidth,
			height:document.documentElement.clientHeight|| document.body.clientHeight
		}
	},
	// 给元素设置样式
	// obj <DOMObject> 需要设置样式的元素
	// attrJson <object> 设置的属性名和值
	setStyle: function (obj, attrJson) {
		// 遍历对象
		for(var key in attrJson) {
			obj.style[key] = attrJson[key];
		}
	},
	// 添加事件监听器
	// obj <DOMObject>需要监听器的元素
	// type <string> 事件句柄（不带on）
	// fn <functiong> 事件预处理函数
	// [isCapture] <boolean> 是否在捕获 默认为false
	addListener:function(obj,type,fn,isCapture){
		isCapture = isCapture === undefined ? false:isCapture;
		if(obj.attachEvent){
			obj.attachEvent("on"+type,fn);
		}else{
			obj.addEventListener(type,fn,isCapture);
		}
	},
	// 移出事件监听器
	removeListener:function(obj,type,fn,isCapture){
		isCapture = isCapture === undefined ? false:isCapture;
		if (obj.detachEvent) {
			obj.detachEvent("on"+type,fn);
		}else{
			obj.removeEventListener(type,fn,isCapture);
		}
	},
	// 给元素写匀速运动动画
	// obj <DOMObject> 需要运动的元素
	// attr <string> 运动的属性名称
	// end <number> 运动的终点
	// time <number> 运动的时间
	
	move:function(obj,attr,end,time,fn){
		// 连续点击会加速 清除上一次的定时器
		clearInterval(obj.timer);
		// 开始的位置
		let start = parseInt(this.getstyle(obj,attr)),
		// 需要运动的距离
		distance = end - start,
		// 定时器需要循环的次数
		steps = Math.floor(time/20),
		// 定时器每次增加的距离
		speed = distance /steps,
		// 记录
		n = 0;
		obj.timer = setInterval(function(){
			n++;
			// 移动的过程
			obj.style[attr] =start +n*speed +"px";
			// 如果达到定时器循环的次数
			if(n==steps){
				// 清除定时器 且把obj直接放到终点
				clearInterval(obj.timer);
				obj.style[attr] = end + "px";
				// 执行运动完成之后输入的函数
				fn && fn();
			}
		},20)
	}
	
}