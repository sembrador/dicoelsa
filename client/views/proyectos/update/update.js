var pageSession = new ReactiveDict();

Template.ProyectosUpdate.onCreated(function() {
	
});

Template.ProyectosUpdate.onDestroyed(function() {
	
});

Template.ProyectosUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ProyectosUpdate.events({
	
});

Template.ProyectosUpdate.helpers({
	
});

Template.ProyectosUpdateForm.onCreated(function() {
	
});

Template.ProyectosUpdateForm.onDestroyed(function() {
	
});

Template.ProyectosUpdateForm.onRendered(function() {
	pageSession.set("contactoCrudItems", this.data.proyecto.contacto || []);


	pageSession.set("proyectosUpdateFormInfoMessage", "");
	pageSession.set("proyectosUpdateFormErrorMessage", "");

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

Template.ProyectosUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("proyectosUpdateFormInfoMessage", "");
		pageSession.set("proyectosUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var proyectosUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(proyectosUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("proyectosUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("proyectos", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("proyectosUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				values.contacto = pageSession.get("contactoCrudItems"); Meteor.call("proyectosUpdate", t.data.proyecto._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("proyectos", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}, 

	'click .field-contacto .crud-table-row .delete-icon': function(e, t) { e.preventDefault(); var self = this; bootbox.dialog({ message: 'Delete? Are you sure?', title: 'Delete', animate: false, buttons: { success: { label: 'Yes', className: 'btn-success', callback: function() { var items = pageSession.get('contactoCrudItems'); var index = -1; _.find(items, function(item, i) { if(item._id == self._id) { index = i; return true; }; }); if(index >= 0) items.splice(index, 1); pageSession.set('contactoCrudItems', items); } }, danger: { label: 'No', className: 'btn-default' } } }); return false; }
});

Template.ProyectosUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("proyectosUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("proyectosUpdateFormErrorMessage");
	}, 
		"contactoCrudItems": function() {
		return pageSession.get("contactoCrudItems");
	}
});


Template.ProyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertForm.onCreated(function() {
	
});

Template.ProyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertForm.onDestroyed(function() {
	
});

Template.ProyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertForm.onRendered(function() {
	

	pageSession.set("proyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertFormInfoMessage", "");
	pageSession.set("proyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertFormErrorMessage", "");

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

Template.ProyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("proyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertFormInfoMessage", "");
		pageSession.set("proyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var proyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(proyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("proyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("proyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				var data = pageSession.get("contactoCrudItems") || []; values._id = Random.id(); data.push(values); pageSession.set("contactoCrudItems", data); $("#field-contacto-insert-form").modal("hide"); e.currentTarget.reset();
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		$("#field-contacto-insert-form").modal("hide"); t.find("form").reset();

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

Template.ProyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("proyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("proyectosUpdateFieldContactoInsertFormContainerFieldContactoInsertFormErrorMessage");
	}
	
});
