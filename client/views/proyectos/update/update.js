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
				

				Meteor.call("proyectosUpdate", t.data.proyecto._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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
	}

	
});

Template.ProyectosUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("proyectosUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("proyectosUpdateFormErrorMessage");
	}
	
});
