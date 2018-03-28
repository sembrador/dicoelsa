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
				

				Meteor.call("proveedoresUpdate", t.data.proveedor._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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
	}

	
});

Template.ProveedoresUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("proveedoresUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("proveedoresUpdateFormErrorMessage");
	}
	
});
