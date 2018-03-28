var pageSession = new ReactiveDict();

Template.ProveedoresDetails.onCreated(function() {
	
});

Template.ProveedoresDetails.onDestroyed(function() {
	
});

Template.ProveedoresDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ProveedoresDetails.events({
	
});

Template.ProveedoresDetails.helpers({
	
});

Template.ProveedoresDetailsForm.onCreated(function() {
	
});

Template.ProveedoresDetailsForm.onDestroyed(function() {
	
});

Template.ProveedoresDetailsForm.onRendered(function() {
	

	pageSession.set("proveedoresDetailsFormInfoMessage", "");
	pageSession.set("proveedoresDetailsFormErrorMessage", "");

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

Template.ProveedoresDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("proveedoresDetailsFormInfoMessage", "");
		pageSession.set("proveedoresDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var proveedoresDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(proveedoresDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("proveedoresDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("proveedoresDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("proveedores", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("proveedores", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ProveedoresDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("proveedoresDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("proveedoresDetailsFormErrorMessage");
	}
	
});
