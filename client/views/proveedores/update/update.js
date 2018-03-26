var pageSession = new ReactiveDict();

Template.ProveedoresUpdate.onCreated(function() {
	
});

Template.ProveedoresUpdate.onDestroyed(function() {
	
});

Template.ProveedoresUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ProveedoresUpdate.events({
	
});

Template.ProveedoresUpdate.helpers({
	
});

Template.ProveedoresUpdateForm.onCreated(function() {
	
});

Template.ProveedoresUpdateForm.onDestroyed(function() {
	
});

Template.ProveedoresUpdateForm.onRendered(function() {
	pageSession.set("telefonoCrudItems", this.data.proveedor.telefono || []);
pageSession.set("direccionCrudItems", this.data.proveedor.direccion || []);


	pageSession.set("proveedoresUpdateFormInfoMessage", "");
	pageSession.set("proveedoresUpdateFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.ProveedoresUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("proveedoresUpdateFormInfoMessage", "");
		pageSession.set("proveedoresUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var proveedoresUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(proveedoresUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("proveedoresUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("proveedores", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("proveedoresUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				values.direccion = pageSession.get("direccionCrudItems");
values.telefono = pageSession.get("telefonoCrudItems"); Meteor.call("proveedoresUpdate", t.data.proveedor._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("proveedores", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}, 

	'click .field-direccion .crud-table-row .delete-icon': function(e, t) { e.preventDefault(); var self = this; bootbox.dialog({ message: 'Delete? Are you sure?', title: 'Delete', animate: false, buttons: { success: { label: 'Yes', className: 'btn-success', callback: function() { var items = pageSession.get('direccionCrudItems'); var index = -1; _.find(items, function(item, i) { if(item._id == self._id) { index = i; return true; }; }); if(index >= 0) items.splice(index, 1); pageSession.set('direccionCrudItems', items); } }, danger: { label: 'No', className: 'btn-default' } } }); return false; },
'click .field-telefono .crud-table-row .delete-icon': function(e, t) { e.preventDefault(); var self = this; bootbox.dialog({ message: 'Delete? Are you sure?', title: 'Delete', animate: false, buttons: { success: { label: 'Yes', className: 'btn-success', callback: function() { var items = pageSession.get('telefonoCrudItems'); var index = -1; _.find(items, function(item, i) { if(item._id == self._id) { index = i; return true; }; }); if(index >= 0) items.splice(index, 1); pageSession.set('telefonoCrudItems', items); } }, danger: { label: 'No', className: 'btn-default' } } }); return false; }
});

Template.ProveedoresUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("proveedoresUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("proveedoresUpdateFormErrorMessage");
	}, 
		"direccionCrudItems": function() {
		return pageSession.get("direccionCrudItems");
	},
	"telefonoCrudItems": function() {
		return pageSession.get("telefonoCrudItems");
	}
});


Template.ProveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertForm.onCreated(function() {
	
});

Template.ProveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertForm.onDestroyed(function() {
	
});

Template.ProveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertForm.onRendered(function() {
	

	pageSession.set("proveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertFormInfoMessage", "");
	pageSession.set("proveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.ProveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("proveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertFormInfoMessage", "");
		pageSession.set("proveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var proveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(proveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("proveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("proveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				var data = pageSession.get("direccionCrudItems") || []; values._id = Random.id(); data.push(values); pageSession.set("direccionCrudItems", data); $("#field-direccion-insert-form").modal("hide"); e.currentTarget.reset();
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		$("#field-direccion-insert-form").modal("hide"); t.find("form").reset();

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.ProveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("proveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("proveedoresUpdateFieldDireccionInsertFormContainerFieldDireccionInsertFormErrorMessage");
	}
	
});


Template.ProveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertForm.onCreated(function() {
	
});

Template.ProveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertForm.onDestroyed(function() {
	
});

Template.ProveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertForm.onRendered(function() {
	

	pageSession.set("proveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertFormInfoMessage", "");
	pageSession.set("proveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.ProveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("proveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertFormInfoMessage", "");
		pageSession.set("proveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var proveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(proveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("proveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("proveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				var data = pageSession.get("telefonoCrudItems") || []; values._id = Random.id(); data.push(values); pageSession.set("telefonoCrudItems", data); $("#field-telefono-insert-form").modal("hide"); e.currentTarget.reset();
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		$("#field-telefono-insert-form").modal("hide"); t.find("form").reset();

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.ProveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("proveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("proveedoresUpdateFieldTelefonoInsertFormContainerFieldTelefonoInsertFormErrorMessage");
	}
	
});
