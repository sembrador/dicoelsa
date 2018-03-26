Meteor.methods({
	"ordenesItemsInsert": function(data) {
		if(!OrdenesItems.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return OrdenesItems.insert(data);
	},

	"ordenesItemsUpdate": function(id, data) {
		var doc = OrdenesItems.findOne({ _id: id });
		if(!OrdenesItems.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		OrdenesItems.update({ _id: id }, { $set: data });
	},

	"ordenesItemsRemove": function(id) {
		var doc = OrdenesItems.findOne({ _id: id });
		if(!OrdenesItems.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		OrdenesItems.remove({ _id: id });
	}
});
