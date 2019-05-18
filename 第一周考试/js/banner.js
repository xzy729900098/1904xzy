// 轮播图
class banner{
	constructor(elementId) {
		// 
	    this.box = tools.$(elementId);
		this.ul = tools.$("ul",false,this.box);
		this.ol = tools.$("ol",false,this.box);
		this.lis = Array.from(tools.$("li",true,this.box));
		this.prev = tools.$("#prev",false,this.box);
		this.next = tools.$("#next",false,this.box)
		this.ols =[];
		this.index = 0;
		this.lastIndex = 0;
		
		this.addLi();
		
	}
	// 添加ol里的li
	addLi (){
		for (let i = 0;i < this.lis.length-1;i++) {
			var li = document.createElement("li");
			if(i === 0) li.classList.add("ac");
			li.innerHTML = i+1;
			this.ol.appendChild(li);
			this.ols.push(li);
		}
		//  在渲染结束后绑定事件
		this.bindEvent();
		this.auto();
	}
	// 事件绑定
	bindEvent (){
		this.ols.forEach(li=>{
			li.onclick = this.olLiOnClick.bind(this,li);
		})
		this.prev.onclick = this.prevOnclick.bind(this);
		this.next.onclick = this.nextOnclick.bind(this);
		this.box.onmouseleave = this.auto.bind(this); 
		this.box.onmouseenter = this.pause.bind(this);
	}
	// ol里的li的点击事件
	olLiOnClick (li){
		this.index = this.ols.indexOf(li);
		this.imgchang();
		this.lastIndex = this.index;
	}
	// prev的点击事件函数
	prevOnclick (){
		if (this.index ===  0) {
			this.ul.style.top = -(this.lis.length-1)* this.box.offsetHeight+"px";
			this.index = this.lis.length-1
		}
		this.index--;
		this.imgchang();
		this.lastIndex = this.index;
	}
	// next点击事件函数
	nextOnclick (){
		if(++this.index < this.lis.length-1){
			this.imgchang();
			
		}else{
			this.ols[this.lastIndex].classList.remove("ac")
			let dis = -this.index*this.box.offsetHeight;
			this.index = 0;
			tools.move(this.ul,"top",dis,1000,
			function (){
				 this.ul.style.top = 0;
			}.bind(this)
			);
			console.log(this.index);
			this.ols[this.index].classList.add("ac");
		}
		this.lastIndex = this.index;
	}
	// 自动播放函数 
	auto (){
		this.time = setInterval(this.nextOnclick.bind(this),3000);
		return this.auto;
	}
	// 暂停函数
	pause (){
		clearInterval(this.time);
	}
	// 图片交换函数
	imgchang (){
		this.ols[this.lastIndex].classList.remove("ac");
		this.ols[this.index].classList.add("ac");
		let dis = -this.index*this.box.offsetHeight;
		tools.move(this.ul,"top",dis,1000);
	}
}

new banner("#banner");