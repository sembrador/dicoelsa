this.Inventario = new Mongo.Collection("inventario");

this.Inventario.userCanInsert = function(userId, doc) {
	return true;
};

this.Inventario.userCanUpdate = function(userId, doc) {
	return true;
};

this.Inventario.userCanRemove = function(userId, doc) {
	return true;
};
