var pageSession = new ReactiveDict();

Template.TransaccionesDetails.onCreated(function() {
	
});

Template.TransaccionesDetails.onDestroyed(function() {
	
});

Template.TransaccionesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TransaccionesDetails.events({
	
});

Template.TransaccionesDetails.helpers({
	
});

Template.TransaccionesDetailsForm.onCreated(function() {
	
});

Template.TransaccionesDetailsForm.onDestroyed(function() {
	
});

Template.TransaccionesDetailsForm.onRendered(function() {
	

	pageSession.set("transaccionesDetailsFormInfoMessage", "");
	pageSession.set("transaccionesDetailsFormErrorMessage", "");

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

Template.TransaccionesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("transaccionesDetailsFormInfoMessage", "");
		pageSession.set("transaccionesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var transaccionesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(transaccionesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("transaccionesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("transaccionesDetailsFormErrorMessage", message);
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

		Router.go("transacciones", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("transacciones", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.TransaccionesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("transaccionesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("transaccionesDetailsFormErrorMessage");
	}
	
});
