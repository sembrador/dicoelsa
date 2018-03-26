var pageSession = new ReactiveDict();

Template.MaterialesUpdate.onCreated(function() {
	
});

Template.MaterialesUpdate.onDestroyed(function() {
	
});

Template.MaterialesUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.MaterialesUpdate.events({
	
});

Template.MaterialesUpdate.helpers({
	
});

Template.MaterialesUpdateForm.onCreated(function() {
	
});

Template.MaterialesUpdateForm.onDestroyed(function() {
	
});

Template.MaterialesUpdateForm.onRendered(function() {
	

	pageSession.set("materialesUpdateFormInfoMessage", "");
	pageSession.set("materialesUpdateFormErrorMessage", "");

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

Template.MaterialesUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("materialesUpdateFormInfoMessage", "");
		pageSession.set("materialesUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var materialesUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(materialesUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("materialesUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("materiales", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("materialesUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("materialesUpdate", t.data.material._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.MaterialesUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("materialesUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("materialesUpdateFormErrorMessage");
	}
	
});
