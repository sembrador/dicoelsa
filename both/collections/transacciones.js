this.Transacciones = new Mongo.Collection("transacciones");

this.Transacciones.userCanInsert = function(userId, doc) {
	return true;
};

this.Transacciones.userCanUpdate = function(userId, doc) {
	return true;
};

this.Transacciones.userCanRemove = function(userId, doc) {
	return true;
};
