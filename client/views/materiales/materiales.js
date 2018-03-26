var pageSession = new ReactiveDict();

Template.Materiales.onCreated(function() {
	
});

Template.Materiales.onDestroyed(function() {
	
});

Template.Materiales.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Materiales.events({
	
});

Template.Materiales.helpers({
	
});

var MaterialesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("MaterialesViewSearchString");
	var sortBy = pageSession.get("MaterialesViewSortBy");
	var sortAscending = pageSession.get("MaterialesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["referencia", "descripcion", "ultima_salida", "ultima_entrada"];
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

var MaterialesViewExport = function(cursor, fileType) {
	var data = MaterialesViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.MaterialesView.onCreated(function() {
	
});

Template.MaterialesView.onDestroyed(function() {
	
});

Template.MaterialesView.onRendered(function() {
	pageSession.set("MaterialesViewStyle", "table");
	
});

Template.MaterialesView.events({
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
				pageSession.set("MaterialesViewSearchString", searchString);
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
					pageSession.set("MaterialesViewSearchString", searchString);
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
					pageSession.set("MaterialesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("materiales.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		MaterialesViewExport(this.material_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		MaterialesViewExport(this.material_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		MaterialesViewExport(this.material_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		MaterialesViewExport(this.material_list, "json");
	}

	
});

Template.MaterialesView.helpers({

	"insertButtonClass": function() {
		return Materiales.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.material_list || this.material_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.material_list && this.material_list.count() > 0;
	},
	"isNotFound": function() {
		return this.material_list && pageSession.get("MaterialesViewSearchString") && MaterialesViewItems(this.material_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("MaterialesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("MaterialesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("MaterialesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("MaterialesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("MaterialesViewStyle") == "gallery";
	}

	
});


Template.MaterialesViewTable.onCreated(function() {
	
});

Template.MaterialesViewTable.onDestroyed(function() {
	
});

Template.MaterialesViewTable.onRendered(function() {
	
});

Template.MaterialesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("MaterialesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("MaterialesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("MaterialesViewSortAscending") || false;
			pageSession.set("MaterialesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("MaterialesViewSortAscending", true);
		}
	}
});

Template.MaterialesViewTable.helpers({
	"tableItems": function() {
		return MaterialesViewItems(this.material_list);
	}
});


Template.MaterialesViewTableItems.onCreated(function() {
	
});

Template.MaterialesViewTableItems.onDestroyed(function() {
	
});

Template.MaterialesViewTableItems.onRendered(function() {
	
});

Template.MaterialesViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("materiales.details", mergeObjects(Router.currentRouteParams(), {materialId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("materialesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("materialesRemove", me._id, function(err, res) {
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
		Router.go("materiales.update", mergeObjects(Router.currentRouteParams(), {materialId: this._id}));
		return false;
	}
});

Template.MaterialesViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Materiales.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Materiales.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
