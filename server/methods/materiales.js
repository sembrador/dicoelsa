Meteor.methods({
	"materialesInsert": function(data) {
		if(!Materiales.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Materiales.insert(data);
	},

	"materialesUpdate": function(id, data) {
		var doc = Materiales.findOne({ _id: id });
		if(!Materiales.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Materiales.update({ _id: id }, { $set: data });
	},

	"materialesRemove": function(id) {
		var doc = Materiales.findOne({ _id: id });
		if(!Materiales.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Materiales.remove({ _id: id });
	}
});
