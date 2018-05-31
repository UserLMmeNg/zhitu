var reg = new Vue({
	el:'#detail',
	data:{
		list:[]
	},
	mounted:function(){
		this.getData();
	},
	methods:{
		getData:function(){
			var getId = window.location.search.split("=")[1];
			var that = this;
			$.ajax({
				url:'http://api.zhituteam.com/api/teacher/info/',
				type:'get',
				data:{
                    id: getId,
				},
				dataType:'json',
				success:function(res){
					console.log(res);
					console.log(res.data.teacher);
					that.list = res.data.teacher;
					that.list.id = getId;

				}
			});
			console.log(this.list);
			console.log(that.list);
		}
	}
})