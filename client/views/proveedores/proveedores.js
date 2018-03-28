var pageSession = new ReactiveDict();

Template.Proveedores.onCreated(function() {
	
});

Template.Proveedores.onDestroyed(function() {
	
});

Template.Proveedores.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Proveedores.events({
	
});

Template.Proveedores.helpers({
	
});

var ProveedoresViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ProveedoresViewSearchString");
	var sortBy = pageSession.get("ProveedoresViewSortBy");
	var sortAscending = pageSession.get("ProveedoresViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["descripcion", "direccion.calle", "direccion.provincia", "direccion.distrito", "direccion.corregimiento", "telefonos.fijo", "telefonos.fax", "telefonos.otro", "contacto.nombre", "contacto.celular", "contacto.telefono", "contacto.correo"];
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

var ProveedoresViewExport = function(cursor, fileType) {
	var data = ProveedoresViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.ProveedoresView.onCreated(function() {
	
});

Template.ProveedoresView.onDestroyed(function() {
	
});

Template.ProveedoresView.onRendered(function() {
	pageSession.set("ProveedoresViewStyle", "table");
	
});

Template.ProveedoresView.events({
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
				pageSession.set("ProveedoresViewSearchString", searchString);
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
					pageSession.set("ProveedoresViewSearchString", searchString);
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
					pageSession.set("ProveedoresViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("proveedores.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ProveedoresViewExport(this.proveedor_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ProveedoresViewExport(this.proveedor_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ProveedoresViewExport(this.proveedor_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ProveedoresViewExport(this.proveedor_list, "json");
	}

	
});

Template.ProveedoresView.helpers({

	"insertButtonClass": function() {
		return Proveedores.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.proveedor_list || this.proveedor_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.proveedor_list && this.proveedor_list.count() > 0;
	},
	"isNotFound": function() {
		return this.proveedor_list && pageSession.get("ProveedoresViewSearchString") && ProveedoresViewItems(this.proveedor_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ProveedoresViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ProveedoresViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("ProveedoresViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("ProveedoresViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ProveedoresViewStyle") == "gallery";
	}

	
});


Template.ProveedoresViewTable.onCreated(function() {
	
});

Template.ProveedoresViewTable.onDestroyed(function() {
	
});

Template.ProveedoresViewTable.onRendered(function() {
	
});

Template.ProveedoresViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ProveedoresViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ProveedoresViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ProveedoresViewSortAscending") || false;
			pageSession.set("ProveedoresViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ProveedoresViewSortAscending", true);
		}
	}
});

Template.ProveedoresViewTable.helpers({
	"tableItems": function() {
		return ProveedoresViewItems(this.proveedor_list);
	}
});


Template.ProveedoresViewTableItems.onCreated(function() {
	
});

Template.ProveedoresViewTableItems.onDestroyed(function() {
	
});

Template.ProveedoresViewTableItems.onRendered(function() {
	
});

Template.ProveedoresViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("proveedores.details", mergeObjects(Router.currentRouteParams(), {proveedorId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("proveedoresUpdate", this._id, values, function(err, res) {
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
						Meteor.call("proveedoresRemove", me._id, function(err, res) {
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
		Router.go("proveedores.update", mergeObjects(Router.currentRouteParams(), {proveedorId: this._id}));
		return false;
	}
});

Template.ProveedoresViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Proveedores.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Proveedores.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
