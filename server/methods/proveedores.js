Meteor.methods({
	"proveedoresInsert": function(data) {
		if(!Proveedores.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Proveedores.insert(data);
	},

	"proveedoresUpdate": function(id, data) {
		var doc = Proveedores.findOne({ _id: id });
		if(!Proveedores.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Proveedores.update({ _id: id }, { $set: data });
	},

	"proveedoresRemove": function(id) {
		var doc = Proveedores.findOne({ _id: id });
		if(!Proveedores.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Proveedores.remove({ _id: id });
	}
});
