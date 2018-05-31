var teacher = new Vue({
	el:'#familyTeacher',
	data:{
		list:[],
		banner:[],
		subjects:[],
	},
	mounted: function(){
		this.getData();
	}, 
	methods: {
		getData:function(){
			var that = this; 
			$.ajax({
				url:'http://api.zhituteam.com/api/index',
				type:'get',
				dataType:'json',
				success:function(res){
					console.log(res);
					console.log(res.data.teacher);
					that.list = res.data.teacher;
					that.subjects = res.data.subjects;
					var newBannerList =[];
					for(var i=0;i<5;i++){
						newBannerList.push(res.data.banner[0])
					}
					that.banner = newBannerList;
					that.swiperBanner();
				}
			});
			console.log(this.list);
			console.log(that.list);
		},
		swiperBanner:function(){
			var mySwiper = new Swiper('.swiper-container',{
				loop : true,
				autoplay: {
		        delay: 2500,
		        disableOnInteraction: false,
		        },
				pagination: {
		            el: '.swiper-pagination',
		            clickable: true,
		        },
		        observer:true,
		    	observeParents:true,
			});
		}
	},
})
