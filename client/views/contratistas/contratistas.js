var pageSession = new ReactiveDict();

Template.Contratistas.onCreated(function() {
	
});

Template.Contratistas.onDestroyed(function() {
	
});

Template.Contratistas.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Contratistas.events({
	
});

Template.Contratistas.helpers({
	
});

var ContratistasViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ContratistasViewSearchString");
	var sortBy = pageSession.get("ContratistasViewSortBy");
	var sortAscending = pageSession.get("ContratistasViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["descripcion", "ruc", "telefonos", "correo"];
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

var ContratistasViewExport = function(cursor, fileType) {
	var data = ContratistasViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.ContratistasView.onCreated(function() {
	
});

Template.ContratistasView.onDestroyed(function() {
	
});

Template.ContratistasView.onRendered(function() {
	pageSession.set("ContratistasViewStyle", "table");
	
});

Template.ContratistasView.events({
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
				pageSession.set("ContratistasViewSearchString", searchString);
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
					pageSession.set("ContratistasViewSearchString", searchString);
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
					pageSession.set("ContratistasViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("contratistas.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ContratistasViewExport(this.contratista_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ContratistasViewExport(this.contratista_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ContratistasViewExport(this.contratista_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ContratistasViewExport(this.contratista_list, "json");
	}

	
});

Template.ContratistasView.helpers({

	"insertButtonClass": function() {
		return Contratistas.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.contratista_list || this.contratista_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.contratista_list && this.contratista_list.count() > 0;
	},
	"isNotFound": function() {
		return this.contratista_list && pageSession.get("ContratistasViewSearchString") && ContratistasViewItems(this.contratista_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ContratistasViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ContratistasViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("ContratistasViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("ContratistasViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ContratistasViewStyle") == "gallery";
	}

	
});


Template.ContratistasViewTable.onCreated(function() {
	
});

Template.ContratistasViewTable.onDestroyed(function() {
	
});

Template.ContratistasViewTable.onRendered(function() {
	
});

Template.ContratistasViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ContratistasViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ContratistasViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ContratistasViewSortAscending") || false;
			pageSession.set("ContratistasViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ContratistasViewSortAscending", true);
		}
	}
});

Template.ContratistasViewTable.helpers({
	"tableItems": function() {
		return ContratistasViewItems(this.contratista_list);
	}
});


Template.ContratistasViewTableItems.onCreated(function() {
	
});

Template.ContratistasViewTableItems.onDestroyed(function() {
	
});

Template.ContratistasViewTableItems.onRendered(function() {
	
});

Template.ContratistasViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("contratistas.details", mergeObjects(Router.currentRouteParams(), {contratistaId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("contratistasUpdate", this._id, values, function(err, res) {
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
						Meteor.call("contratistasRemove", me._id, function(err, res) {
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
		Router.go("contratistas.update", mergeObjects(Router.currentRouteParams(), {contratistaId: this._id}));
		return false;
	}
});

Template.ContratistasViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Contratistas.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Contratistas.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
