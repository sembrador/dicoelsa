this.OrdenesItems = new Mongo.Collection("ordenes_items");

this.OrdenesItems.userCanInsert = function(userId, doc) {
	return true;
};

this.OrdenesItems.userCanUpdate = function(userId, doc) {
	return true;
};

this.OrdenesItems.userCanRemove = function(userId, doc) {
	return true;
};
