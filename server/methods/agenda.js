Meteor.methods({
	"agendaInsert": function (data) {
		check(data, {
		title: String,
		start: String,
		end: String,
		type: String,
		guests: Number
		});
		try {
			return Agenda.insert(data);
		} catch (exception) {
            throw new Meteor.Error('500', '' + exception);
        }
	},
	"agendaUpdate": function (data) {
		check(data, {
		_id: String,
		title: Match.Optional(String),
		start: String,
		end: String,
		type: Match.Optional(String),
		guests: Match.Optional(Number)
		});

		try {
			return Agenda.update(data._id, {
				$set: data
			});
		} catch (exception) {
			throw new Meteor.Error('500', '' + exception);
		}
	},
	"agendaRemove": function (data) {
        check(data, String);

		try {
		return Agenda.remove(data);
		} catch (exception) {
		throw new Meteor.Error('500', '' + exception);
		}
    }		
});
