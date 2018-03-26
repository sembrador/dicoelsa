var pageSession = new ReactiveDict();

Template.MaterialesInsert.onCreated(function() {
	
});

Template.MaterialesInsert.onDestroyed(function() {
	
});

Template.MaterialesInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.MaterialesInsert.events({
	
});

Template.MaterialesInsert.helpers({
	
});

Template.MaterialesInsertForm.onCreated(function() {
	
});

Template.MaterialesInsertForm.onDestroyed(function() {
	
});

Template.MaterialesInsertForm.onRendered(function() {
	

	pageSession.set("materialesInsertFormInfoMessage", "");
	pageSession.set("materialesInsertFormErrorMessage", "");

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

Template.MaterialesInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("materialesInsertFormInfoMessage", "");
		pageSession.set("materialesInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var materialesInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(materialesInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("materialesInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("materiales", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("materialesInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("materialesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("materiales", mergeObjects(Router.currentRouteParams(), {}));
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

Template.MaterialesInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("materialesInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("materialesInsertFormErrorMessage");
	}
	
});
