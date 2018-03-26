Meteor.methods({
	"transaccionesInsert": function(data) {
		if(!Transacciones.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Transacciones.insert(data);
	},

	"transaccionesUpdate": function(id, data) {
		var doc = Transacciones.findOne({ _id: id });
		if(!Transacciones.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Transacciones.update({ _id: id }, { $set: data });
	},

	"transaccionesRemove": function(id) {
		var doc = Transacciones.findOne({ _id: id });
		if(!Transacciones.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Transacciones.remove({ _id: id });
	}
});
