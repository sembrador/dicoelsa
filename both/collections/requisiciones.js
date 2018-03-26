this.Requisiciones = new Mongo.Collection("requisiciones");

this.Requisiciones.userCanInsert = function(userId, doc) {
	return true;
};

this.Requisiciones.userCanUpdate = function(userId, doc) {
	return true;
};

this.Requisiciones.userCanRemove = function(userId, doc) {
	return true;
};
