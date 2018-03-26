this.ContratistasDetailsController = RouteController.extend({
	template: "ContratistasDetails",
	

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
			Meteor.subscribe("contratista", this.params.contratistaId)
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
			contratista: Contratistas.findOne({_id:this.params.contratistaId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});