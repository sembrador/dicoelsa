this.Ordenes = new Mongo.Collection("ordenes");

this.Ordenes.userCanInsert = function(userId, doc) {
	return true;
};

this.Ordenes.userCanUpdate = function(userId, doc) {
	return true;
};

this.Ordenes.userCanRemove = function(userId, doc) {
	return true;
};
