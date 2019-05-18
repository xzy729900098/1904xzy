// var sendBtn = tools.$("#btn");
// 	var wbSend = tools.$(".WB-send");
// 	var h3 = wbSend.querySelector("h3");
// 	var div = document.createElement("div");
// 	var ul = tools.$("ul",false,tools.$(".WB-receive"));
// 	var text = tools.$("textarea",false,wbSend);
// 	// 给发送微博按钮绑定点击事件
// 	sendBtn.onclick = function(){
// 		// 文本框情况
// 		text.value = "";
// 		// 覆盖遮罩层
// 		div.classList.add("cover");
// 		document.body.appendChild(div);
// 		// 显示发送微博Div
// 		wbSend.style.display = "block";
// 		// 发送微博Div居中
// 		window.onresize = function center(){
// 			let left = (tools.getBodySize().width - wbSend.offsetWidth) / 2 + "px",
// 				top = (tools.getBodySize().height - wbSend.offsetHeight) / 2 + "px";
// 			tools.setStyle(wbSend, {left, top});
// 			console.log(left, top)
// 			return center;
// 		}();
// 	}
// 	// 拖拽
// 	h3.onmousedown = function(e){
// 		let x = e.offsetX,
// 		y = e.offsetY;
// 		document.onmousemove = function(e){
// 			let left = e.clientX - x + "px",
// 			top = e.clientY - y + "px";
// 			tools.setStyle(wbSend, {left, top});
// 		}
// 		document.onmouseup = function(){
// 			
// 			document.onmousemove = null;
// 		}
// 		return false;
// 	}
// 	// 事件委托
// 	wbSend.onclick = function (e){
// 		switch (e.target.id){
// 			// X按键
// 			case "close":close()
// 				break;
// 				// 确定按钮
// 			case "sure":
// 			
// 			var li = document.createElement("li");
// 			li.innerHTML = text.value;
// 			if (li.innerHTML==="") {
// 				alert("请输入");
// 			}else{
// 				ul.appendChild(li);
// 				close();
// 			}
// 			
// 				break;
// 				// 取消按钮
// 			case "cancel":
// 			text.value =""
// 				break;
// 		}
// 	}
// 	// 关闭发送微博Div和移出遮罩层的函数
// 	function close(){
// 		div.remove();
// 		wbSend.style.display = "none";
// 	}


// 面向对象
class Wb{
	constructor() {
		// 找到需要的元素
		this.sendBtn = tools.$("#btn");
		this.wbSend = tools.$(".WB-send");
		this.h3 = this.wbSend.querySelector("h3");
		this.div = document.createElement("div");
		this.ul = tools.$("ul",false,tools.$(".WB-receive"));
		this.text = tools.$("textarea",false,this.wbSend);
		this.bindEvent();
	}
	// 事件绑定
	bindEvent (){
		this.sendBtn.onclick = this.sendBtnonclick.bind(this);
		window.onresize = this.center.bind(this);
		this.h3.onmousedown = this.h3onmousedown.bind(this);
		this.wbSend.onclick = this.wbSendonclick.bind(this);
	}
	sendBtnonclick (){
		this.text.value = "";
		// 覆盖遮罩层
		this.div.classList.add("cover");
		document.body.appendChild(this.div);
		// 显示发送微博Div
		this.wbSend.style.display = "block";
		this.center()
	}
	// 发送微博Div居中
	center (){
			let left = (tools.getBodySize().width - this.wbSend.offsetWidth) / 2 + "px",
				top = (tools.getBodySize().height - this.wbSend.offsetHeight) / 2 + "px";
			tools.setStyle(this.wbSend, {left, top});
			console.log(left, top)
			return this.center;
		};
	h3onmousedown (e){
		let x = e.offsetX,
			y = e.offsetY;
			document.onmousemove = function(e){
					let left = e.clientX - x + "px",
					top = e.clientY - y + "px";
					tools.setStyle(this.wbSend, {left, top});
				}.bind(this)
				document.onmouseup = function(){
					document.onmousemove = null;
				}
				return false;
			}
	wbSendonclick(e){
		switch (e.target.id){
					// X按键
					case "close":this.close()
						break;
						// 确定按钮
					case "sure":
					
					var li = document.createElement("li");
					li.innerHTML = this.text.value;
					if (li.innerHTML==="") {
						alert("请输入");
					}else{
						this.ul.appendChild(li);
						this.close();
					}
						break;
						// 取消按钮
					case "cancel":
					this.text.value =""
						break;
				}
	}

	// 关闭发送微博Div和移出遮罩层的函数
	close(){
			this.div.remove();
			this.wbSend.style.display = "none";
		}

}

new Wb();