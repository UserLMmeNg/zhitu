function getQuery(){
	var str = (location.search.length > 0 ? location.search.substring(1) : ''),
	args = {},
	items = str.length ? str.split("&") : [],
	item = null,
	name = null,
	value = null;
	for(i = 0; i < items.length; i++){
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		if (name.length) {
			args[name] = value;
		};
	}
	return args;
}
var subReg = new Vue({
	el:'#detail',
	data:{
		isShowAllSelect:false,
		condition:null,
		teacherList:[],
		grade:'年级',
		isShowGrade:false,
		searchGrade:null,
		subject:getQuery().subject ? getQuery().subject : '学科',
		isShowSubject:false,
		searchSubject:null,
		teacherType:'教师类型',
		isShowType:false,
		searchType:null,
	},
	mounted:function(){
		this.searchSubject = this.getQuery().id;
		var data = {
					'subject':this.searchSubject,
					'offset':0,
					'limit':20,
				}
		this.getData(data);
	},
	methods:{
		getQuery:function(){
			var str = (location.search.length > 0 ? location.search.substring(1) : ''),
			args = {},
			items = str.length ? str.split("&") : [],
			item = null,
			name = null,
			value = null;
			for(i = 0; i < items.length; i++){
				item = items[i].split("=");
				name = decodeURIComponent(item[0]);
				value = decodeURIComponent(item[1]);
				if (name.length) {
					args[name] = value;
				};
			}
			return args;
		},
		getData:function(dataObj){
			var that = this;
			$.ajax({
				'url':'http://api.zhituteam.com/api/teacher/lists',
				'type':'get',
				'dataType':'json',
				'data':dataObj,
				success:function(res){
					that.teacherList = res.data.teacher;
					if (that.condition == null) {
						res.data.condition.grade.forEach(function(item){
							item.isSelected = false;
						})
						res.data.condition.subject.forEach(function(item){
							item.isSelected = false;
						})
						res.data.condition.type.forEach(function(item){
							item.isSelected = false;
						})
						that.condition = res.data.condition;
						that.condition.subject.forEach(function(th){
							if (that.searchSubject == th.id) {
								that.subject = th.label;
								th.isSelected = true;
								that.isShowAllSelect = false;
								th.isShowSubject = true;
							};
						})
					}
				}
			})
		},
		clickGrade:function(){
			this.isShowAllSelect = true;
			this.isShowGrade = true;
			this.isShowSubject = false;
			this.isShowType = false;
		},
		clickSubject:function(){
			this.isShowAllSelect = true;
			this.isShowSubject = true;
			this.isShowGrade = false;
			this.isShowType = false;
		},
		clickType:function(){
			this.isShowAllSelect = true;
			this.isShowType = true;
			this.isShowSubject = false;
			this.isShowGrade = false;
		},
		clickItem:function(item){
			this.condition.grade.forEach(function(t){
				t.isSelected = false;
			})
			this.condition.subject.forEach(function(t){
				t.isSelected = false;
			})
			this.condition.type.forEach(function(t){
				t.isSelected = false;
			})
			item.isSelected = true;
			this.isShowAllSelect = false;
			if (this.isShowGrade) {
				this.grade = item.label;
				this.searchGrade = item.id;
			}
			if (this.isShowSubject) {
				this.subject = item.label;
				this.searchSubject = item.id;
			}
			if (this.isShowType) {
				this.teacherType = item.label;
				this.searchType = item.id;
			}
			var data = {
				'grade':this.searchGrade,
				'type':this.searchType,
				'subject':this.searchSubject,
				'offset':0,
				'limit':20,
			}
			this.getData(data)
			// alert(JSON.stringify(item));	
		}
	}
})