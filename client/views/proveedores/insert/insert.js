var pageSession = new ReactiveDict();

Template.ProveedoresInsert.onCreated(function() {
	
});

Template.ProveedoresInsert.onDestroyed(function() {
	
});

Template.ProveedoresInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ProveedoresInsert.events({
	
});

Template.ProveedoresInsert.helpers({
	
});

Template.ProveedoresInsertForm.onCreated(function() {
	
});

Template.ProveedoresInsertForm.onDestroyed(function() {
	
});

Template.ProveedoresInsertForm.onRendered(function() {
	pageSession.set("telefonoCrudItems", []);
pageSession.set("direccionCrudItems", []);


	pageSession.set("proveedoresInsertFormInfoMessage", "");
	pageSession.set("proveedoresInsertFormErrorMessage", "");

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

Template.ProveedoresInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("proveedoresInsertFormInfoMessage", "");
		pageSession.set("proveedoresInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var proveedoresInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(proveedoresInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("proveedoresInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("proveedores", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("proveedoresInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				values.direccion = pageSession.get("direccionCrudItems");
values.telefono = pageSession.get("telefonoCrudItems"); Meteor.call("proveedoresInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.ProveedoresInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("proveedoresInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("proveedoresInsertFormErrorMessage");
	}, 
		"direccionCrudItems": function() {
		return pageSession.get("direccionCrudItems");
	},
	"telefonoCrudItems": function() {
		return pageSession.get("telefonoCrudItems");
	}
});


Template.ProveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertForm.onCreated(function() {
	
});

Template.ProveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertForm.onDestroyed(function() {
	
});

Template.ProveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertForm.onRendered(function() {
	

	pageSession.set("proveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertFormInfoMessage", "");
	pageSession.set("proveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertFormErrorMessage", "");

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

Template.ProveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("proveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertFormInfoMessage", "");
		pageSession.set("proveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var proveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(proveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("proveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("proveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertFormErrorMessage", message);
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

Template.ProveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("proveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("proveedoresInsertFieldDireccionInsertFormContainerFieldDireccionInsertFormErrorMessage");
	}
	
});


Template.ProveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertForm.onCreated(function() {
	
});

Template.ProveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertForm.onDestroyed(function() {
	
});

Template.ProveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertForm.onRendered(function() {
	

	pageSession.set("proveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertFormInfoMessage", "");
	pageSession.set("proveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertFormErrorMessage", "");

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

Template.ProveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("proveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertFormInfoMessage", "");
		pageSession.set("proveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var proveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(proveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("proveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("proveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertFormErrorMessage", message);
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

Template.ProveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("proveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("proveedoresInsertFieldTelefonoInsertFormContainerFieldTelefonoInsertFormErrorMessage");
	}
	
});
