Meteor.methods({
	"requisicionesInsert": function(data) {
		if(!Requisiciones.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Requisiciones.insert(data);
	},

	"requisicionesUpdate": function(id, data) {
		var doc = Requisiciones.findOne({ _id: id });
		if(!Requisiciones.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Requisiciones.update({ _id: id }, { $set: data });
	},

	"requisicionesRemove": function(id) {
		var doc = Requisiciones.findOne({ _id: id });
		if(!Requisiciones.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Requisiciones.remove({ _id: id });
	}
});
