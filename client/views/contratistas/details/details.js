var pageSession = new ReactiveDict();

Template.ContratistasDetails.onCreated(function() {
	
});

Template.ContratistasDetails.onDestroyed(function() {
	
});

Template.ContratistasDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ContratistasDetails.events({
	
});

Template.ContratistasDetails.helpers({
	
});

Template.ContratistasDetailsForm.onCreated(function() {
	
});

Template.ContratistasDetailsForm.onDestroyed(function() {
	
});

Template.ContratistasDetailsForm.onRendered(function() {
	

	pageSession.set("contratistasDetailsFormInfoMessage", "");
	pageSession.set("contratistasDetailsFormErrorMessage", "");

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

Template.ContratistasDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contratistasDetailsFormInfoMessage", "");
		pageSession.set("contratistasDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var contratistasDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(contratistasDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contratistasDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contratistasDetailsFormErrorMessage", message);
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

		Router.go("contratistas", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("contratistas", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ContratistasDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contratistasDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contratistasDetailsFormErrorMessage");
	}
	
});
