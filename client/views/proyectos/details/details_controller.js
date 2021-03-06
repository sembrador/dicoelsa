this.ProyectosDetailsController = RouteController.extend({
	template: "ProyectosDetails",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("proyecto", this.params.proyectoId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			proyecto: Proyectos.findOne({_id:this.params.proyectoId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});