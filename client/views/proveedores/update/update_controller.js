this.ProveedoresUpdateController = RouteController.extend({
	template: "ProveedoresUpdate",
	

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
			Meteor.subscribe("proveedor", this.params.proveedorId)
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
			proveedor: Proveedores.findOne({_id:this.params.proveedorId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});