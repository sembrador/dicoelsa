Meteor.publish("transaccion_list", function() {
	return Transacciones.find({}, {});
});

Meteor.publish("transacciones_null", function() {
	return Transacciones.find({_id:null}, {});
});

Meteor.publish("transaccion", function(transaccionId) {
	return Transacciones.find({_id:transaccionId}, {});
});

