Meteor.methods({
	"proyectosInsert": function(data) {
		if(!Proyectos.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Proyectos.insert(data);
	},

	"proyectosUpdate": function(id, data) {
		var doc = Proyectos.findOne({ _id: id });
		if(!Proyectos.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Proyectos.update({ _id: id }, { $set: data });
	},

	"proyectosRemove": function(id) {
		var doc = Proyectos.findOne({ _id: id });
		if(!Proyectos.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Proyectos.remove({ _id: id });
	}
});
