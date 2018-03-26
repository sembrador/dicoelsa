Meteor.methods({
	"contratistasInsert": function(data) {
		if(!Contratistas.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Contratistas.insert(data);
	},

	"contratistasUpdate": function(id, data) {
		var doc = Contratistas.findOne({ _id: id });
		if(!Contratistas.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Contratistas.update({ _id: id }, { $set: data });
	},

	"contratistasRemove": function(id) {
		var doc = Contratistas.findOne({ _id: id });
		if(!Contratistas.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Contratistas.remove({ _id: id });
	}
});
