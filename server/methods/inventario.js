Meteor.methods({
	"inventarioInsert": function(data) {
		if(!Inventario.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Inventario.insert(data);
	},

	"inventarioUpdate": function(id, data) {
		var doc = Inventario.findOne({ _id: id });
		if(!Inventario.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Inventario.update({ _id: id }, { $set: data });
	},

	"inventarioRemove": function(id) {
		var doc = Inventario.findOne({ _id: id });
		if(!Inventario.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Inventario.remove({ _id: id });
	}
});
