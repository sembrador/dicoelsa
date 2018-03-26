this.Contratistas = new Mongo.Collection("contratistas");

this.Contratistas.userCanInsert = function(userId, doc) {
	return true;
};

this.Contratistas.userCanUpdate = function(userId, doc) {
	return true;
};

this.Contratistas.userCanRemove = function(userId, doc) {
	return true;
};
