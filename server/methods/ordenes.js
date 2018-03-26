Meteor.methods({
	"ordenesInsert": function(data) {
		if(!Ordenes.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Ordenes.insert(data);
	},

	"ordenesUpdate": function(id, data) {
		var doc = Ordenes.findOne({ _id: id });
		if(!Ordenes.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Ordenes.update({ _id: id }, { $set: data });
	},

	"ordenesRemove": function(id) {
		var doc = Ordenes.findOne({ _id: id });
		if(!Ordenes.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Ordenes.remove({ _id: id });
	}
});
