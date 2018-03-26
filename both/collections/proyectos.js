this.Proyectos = new Mongo.Collection("proyectos");

this.Proyectos.userCanInsert = function(userId, doc) {
	return true;
};

this.Proyectos.userCanUpdate = function(userId, doc) {
	return true;
};

this.Proyectos.userCanRemove = function(userId, doc) {
	return true;
};
