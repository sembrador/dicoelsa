this.TransaccionesDetailsController = RouteController.extend({
	template: "TransaccionesDetails",
	

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
			Meteor.subscribe("transaccion", this.params.transaccionId)
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
			transaccion: Transacciones.findOne({_id:this.params.transaccionId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});