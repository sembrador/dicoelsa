var pageSession = new ReactiveDict();

Template.Proyectos.onCreated(function() {
	
});

Template.Proyectos.onDestroyed(function() {
	
});

Template.Proyectos.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Proyectos.events({
	
});

Template.Proyectos.helpers({
	
});

var ProyectosViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ProyectosViewSearchString");
	var sortBy = pageSession.get("ProyectosViewSortBy");
	var sortAscending = pageSession.get("ProyectosViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["descripcion", "contacto.nombre", "contacto.celular", "contacto.telefono", "contacto.correo", "ubicacion.longitud", "ubicacion.latitud", "notas"];
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

var ProyectosViewExport = function(cursor, fileType) {
	var data = ProyectosViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.ProyectosView.onCreated(function() {
	
});

Template.ProyectosView.onDestroyed(function() {
	
});

Template.ProyectosView.onRendered(function() {
	pageSession.set("ProyectosViewStyle", "table");
	
});

Template.ProyectosView.events({
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
				pageSession.set("ProyectosViewSearchString", searchString);
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
					pageSession.set("ProyectosViewSearchString", searchString);
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
					pageSession.set("ProyectosViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("proyectos.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ProyectosViewExport(this.proyecto_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ProyectosViewExport(this.proyecto_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ProyectosViewExport(this.proyecto_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ProyectosViewExport(this.proyecto_list, "json");
	}

	
});

Template.ProyectosView.helpers({

	"insertButtonClass": function() {
		return Proyectos.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.proyecto_list || this.proyecto_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.proyecto_list && this.proyecto_list.count() > 0;
	},
	"isNotFound": function() {
		return this.proyecto_list && pageSession.get("ProyectosViewSearchString") && ProyectosViewItems(this.proyecto_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ProyectosViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ProyectosViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("ProyectosViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("ProyectosViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ProyectosViewStyle") == "gallery";
	}

	
});


Template.ProyectosViewTable.onCreated(function() {
	
});

Template.ProyectosViewTable.onDestroyed(function() {
	
});

Template.ProyectosViewTable.onRendered(function() {
	
});

Template.ProyectosViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ProyectosViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ProyectosViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ProyectosViewSortAscending") || false;
			pageSession.set("ProyectosViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ProyectosViewSortAscending", true);
		}
	}
});

Template.ProyectosViewTable.helpers({
	"tableItems": function() {
		return ProyectosViewItems(this.proyecto_list);
	}
});


Template.ProyectosViewTableItems.onCreated(function() {
	
});

Template.ProyectosViewTableItems.onDestroyed(function() {
	
});

Template.ProyectosViewTableItems.onRendered(function() {
	
});

Template.ProyectosViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("proyectos.details", mergeObjects(Router.currentRouteParams(), {proyectoId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("proyectosUpdate", this._id, values, function(err, res) {
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
						Meteor.call("proyectosRemove", me._id, function(err, res) {
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
		Router.go("proyectos.update", mergeObjects(Router.currentRouteParams(), {proyectoId: this._id}));
		return false;
	}
});

Template.ProyectosViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Proyectos.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Proyectos.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
