this.Materiales = new Mongo.Collection("materiales");

this.Materiales.userCanInsert = function(userId, doc) {
	return true;
};

this.Materiales.userCanUpdate = function(userId, doc) {
	return true;
};

this.Materiales.userCanRemove = function(userId, doc) {
	return true;
};
