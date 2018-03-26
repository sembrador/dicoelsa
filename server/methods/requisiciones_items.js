Meteor.methods({
	"requisicionesItemsInsert": function(data) {
		if(!RequisicionesItems.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return RequisicionesItems.insert(data);
	},

	"requisicionesItemsUpdate": function(id, data) {
		var doc = RequisicionesItems.findOne({ _id: id });
		if(!RequisicionesItems.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		RequisicionesItems.update({ _id: id }, { $set: data });
	},

	"requisicionesItemsRemove": function(id) {
		var doc = RequisicionesItems.findOne({ _id: id });
		if(!RequisicionesItems.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		RequisicionesItems.remove({ _id: id });
	}
});
