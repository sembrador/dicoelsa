var pageSession = new ReactiveDict();

Template.ContratistasInsert.onCreated(function() {
	
});

Template.ContratistasInsert.onDestroyed(function() {
	
});

Template.ContratistasInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ContratistasInsert.events({
	
});

Template.ContratistasInsert.helpers({
	
});

Template.ContratistasInsertForm.onCreated(function() {
	
});

Template.ContratistasInsertForm.onDestroyed(function() {
	
});

Template.ContratistasInsertForm.onRendered(function() {
	

	pageSession.set("contratistasInsertFormInfoMessage", "");
	pageSession.set("contratistasInsertFormErrorMessage", "");

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

Template.ContratistasInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contratistasInsertFormInfoMessage", "");
		pageSession.set("contratistasInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var contratistasInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(contratistasInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contratistasInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("contratistas", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contratistasInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("contratistasInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("contratistas", mergeObjects(Router.currentRouteParams(), {}));
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

Template.ContratistasInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contratistasInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contratistasInsertFormErrorMessage");
	}
	
});
