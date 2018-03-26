var pageSession = new ReactiveDict();

Template.Transacciones.onCreated(function() {
	
});

Template.Transacciones.onDestroyed(function() {
	
});

Template.Transacciones.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Transacciones.events({
	
});

Template.Transacciones.helpers({
	
});

var TransaccionesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TransaccionesViewSearchString");
	var sortBy = pageSession.get("TransaccionesViewSortBy");
	var sortAscending = pageSession.get("TransaccionesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["referencia", "fecha", "numero", "bodega", "tipo", "cantidad", "costo", "saldo", "proveedor", "transaccion"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var TransaccionesViewExport = function(cursor, fileType) {
	var data = TransaccionesViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.TransaccionesView.onCreated(function() {
	
});

Template.TransaccionesView.onDestroyed(function() {
	
});

Template.TransaccionesView.onRendered(function() {
	pageSession.set("TransaccionesViewStyle", "table");
	
});

Template.TransaccionesView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("TransaccionesViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("TransaccionesViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("TransaccionesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("transacciones.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		TransaccionesViewExport(this.transaccion_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TransaccionesViewExport(this.transaccion_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TransaccionesViewExport(this.transaccion_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TransaccionesViewExport(this.transaccion_list, "json");
	}

	
});

Template.TransaccionesView.helpers({

	"insertButtonClass": function() {
		return Transacciones.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.transaccion_list || this.transaccion_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.transaccion_list && this.transaccion_list.count() > 0;
	},
	"isNotFound": function() {
		return this.transaccion_list && pageSession.get("TransaccionesViewSearchString") && TransaccionesViewItems(this.transaccion_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TransaccionesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TransaccionesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("TransaccionesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("TransaccionesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TransaccionesViewStyle") == "gallery";
	}

	
});


Template.TransaccionesViewTable.onCreated(function() {
	
});

Template.TransaccionesViewTable.onDestroyed(function() {
	
});

Template.TransaccionesViewTable.onRendered(function() {
	
});

Template.TransaccionesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TransaccionesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TransaccionesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TransaccionesViewSortAscending") || false;
			pageSession.set("TransaccionesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TransaccionesViewSortAscending", true);
		}
	}
});

Template.TransaccionesViewTable.helpers({
	"tableItems": function() {
		return TransaccionesViewItems(this.transaccion_list);
	}
});


Template.TransaccionesViewTableItems.onCreated(function() {
	
});

Template.TransaccionesViewTableItems.onDestroyed(function() {
	
});

Template.TransaccionesViewTableItems.onRendered(function() {
	
});

Template.TransaccionesViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("transacciones.details", mergeObjects(Router.currentRouteParams(), {transaccionId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("transaccionesUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("transaccionesRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("transacciones.update", mergeObjects(Router.currentRouteParams(), {transaccionId: this._id}));
		return false;
	}
});

Template.TransaccionesViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Transacciones.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Transacciones.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
