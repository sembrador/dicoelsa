var pageSession = new ReactiveDict();

Template.ProyectosInsert.onCreated(function() {
	
});

Template.ProyectosInsert.onDestroyed(function() {
	
});

Template.ProyectosInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ProyectosInsert.events({
	
});

Template.ProyectosInsert.helpers({
	
});

Template.ProyectosInsertForm.onCreated(function() {
	
});

Template.ProyectosInsertForm.onDestroyed(function() {
	
});

Template.ProyectosInsertForm.onRendered(function() {
	pageSession.set("contactoCrudItems", []);


	pageSession.set("proyectosInsertFormInfoMessage", "");
	pageSession.set("proyectosInsertFormErrorMessage", "");

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

Template.ProyectosInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("proyectosInsertFormInfoMessage", "");
		pageSession.set("proyectosInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var proyectosInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(proyectosInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("proyectosInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("proyectos", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("proyectosInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				values.contacto = pageSession.get("contactoCrudItems"); Meteor.call("proyectosInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.ProyectosInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("proyectosInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("proyectosInsertFormErrorMessage");
	}, 
		"contactoCrudItems": function() {
		return pageSession.get("contactoCrudItems");
	}
});


Template.ProyectosInsertFieldContactoInsertFormContainerFieldContactoInsertForm.onCreated(function() {
	
});

Template.ProyectosInsertFieldContactoInsertFormContainerFieldContactoInsertForm.onDestroyed(function() {
	
});

Template.ProyectosInsertFieldContactoInsertFormContainerFieldContactoInsertForm.onRendered(function() {
	

	pageSession.set("proyectosInsertFieldContactoInsertFormContainerFieldContactoInsertFormInfoMessage", "");
	pageSession.set("proyectosInsertFieldContactoInsertFormContainerFieldContactoInsertFormErrorMessage", "");

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

Template.ProyectosInsertFieldContactoInsertFormContainerFieldContactoInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("proyectosInsertFieldContactoInsertFormContainerFieldContactoInsertFormInfoMessage", "");
		pageSession.set("proyectosInsertFieldContactoInsertFormContainerFieldContactoInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var proyectosInsertFieldContactoInsertFormContainerFieldContactoInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(proyectosInsertFieldContactoInsertFormContainerFieldContactoInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("proyectosInsertFieldContactoInsertFormContainerFieldContactoInsertFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("proyectosInsertFieldContactoInsertFormContainerFieldContactoInsertFormErrorMessage", message);
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

Template.ProyectosInsertFieldContactoInsertFormContainerFieldContactoInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("proyectosInsertFieldContactoInsertFormContainerFieldContactoInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("proyectosInsertFieldContactoInsertFormContainerFieldContactoInsertFormErrorMessage");
	}
	
});
