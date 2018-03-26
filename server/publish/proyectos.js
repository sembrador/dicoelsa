Meteor.publish("proyecto_list", function() {
	return Proyectos.find({}, {});
});

Meteor.publish("proyectos_null", function() {
	return Proyectos.find({_id:null}, {});
});

Meteor.publish("proyecto", function(proyectoId) {
	return Proyectos.find({_id:proyectoId}, {});
});

