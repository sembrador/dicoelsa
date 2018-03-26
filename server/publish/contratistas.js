Meteor.publish("contratista_list", function() {
	return Contratistas.find({}, {});
});

Meteor.publish("contratistas_null", function() {
	return Contratistas.find({_id:null}, {});
});

Meteor.publish("contratista", function(contratistaId) {
	return Contratistas.find({_id:contratistaId}, {});
});

