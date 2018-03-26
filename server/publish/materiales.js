Meteor.publish("material_list", function() {
	return Materiales.find({}, {});
});

Meteor.publish("materiales_null", function() {
	return Materiales.find({_id:null}, {});
});

Meteor.publish("material", function(materialId) {
	return Materiales.find({_id:materialId}, {});
});

