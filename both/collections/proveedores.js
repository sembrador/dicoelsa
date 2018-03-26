this.Proveedores = new Mongo.Collection("proveedores");

this.Proveedores.userCanInsert = function(userId, doc) {
	return true;
};

this.Proveedores.userCanUpdate = function(userId, doc) {
	return true;
};

this.Proveedores.userCanRemove = function(userId, doc) {
	return true;
};
