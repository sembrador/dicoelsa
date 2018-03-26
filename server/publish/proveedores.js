Meteor.publish("proveedor_list", function() {
	return Proveedores.find({}, {});
});

Meteor.publish("proveedores_null", function() {
	return Proveedores.find({_id:null}, {});
});

Meteor.publish("proveedor", function(proveedorId) {
	return Proveedores.find({_id:proveedorId}, {});
});

