var pageSession = new ReactiveDict();

Template.TransaccionesUpdate.onCreated(function() {
	
});

Template.TransaccionesUpdate.onDestroyed(function() {
	
});

Template.TransaccionesUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TransaccionesUpdate.events({
	
});

Template.TransaccionesUpdate.helpers({
	
});

Template.TransaccionesUpdateForm.onCreated(function() {
	
});

Template.TransaccionesUpdateForm.onDestroyed(function() {
	
});

Template.TransaccionesUpdateForm.onRendered(function() {
	

	pageSession.set("transaccionesUpdateFormInfoMessage", "");
	pageSession.set("transaccionesUpdateFormErrorMessage", "");

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

Template.TransaccionesUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("transaccionesUpdateFormInfoMessage", "");
		pageSession.set("transaccionesUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var transaccionesUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(transaccionesUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("transaccionesUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("transacciones", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("transaccionesUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("transaccionesUpdate", t.data.transaccion._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("transacciones", mergeObjects(Router.currentRouteParams(), {}));
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

Template.TransaccionesUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("transaccionesUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("transaccionesUpdateFormErrorMessage");
	}
	
});
