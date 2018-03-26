this.RequisicionesItems = new Mongo.Collection("requisiciones_items");

this.RequisicionesItems.userCanInsert = function(userId, doc) {
	return true;
};

this.RequisicionesItems.userCanUpdate = function(userId, doc) {
	return true;
};

this.RequisicionesItems.userCanRemove = function(userId, doc) {
	return true;
};
