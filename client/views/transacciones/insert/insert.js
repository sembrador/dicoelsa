var pageSession = new ReactiveDict();

Template.TransaccionesInsert.onCreated(function() {
	
});

Template.TransaccionesInsert.onDestroyed(function() {
	
});

Template.TransaccionesInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TransaccionesInsert.events({
	
});

Template.TransaccionesInsert.helpers({
	
});

Template.TransaccionesInsertForm.onCreated(function() {
	
});

Template.TransaccionesInsertForm.onDestroyed(function() {
	
});

Template.TransaccionesInsertForm.onRendered(function() {
	

	pageSession.set("transaccionesInsertFormInfoMessage", "");
	pageSession.set("transaccionesInsertFormErrorMessage", "");

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

Template.TransaccionesInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("transaccionesInsertFormInfoMessage", "");
		pageSession.set("transaccionesInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var transaccionesInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(transaccionesInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("transaccionesInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("transacciones", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("transaccionesInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("transaccionesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.TransaccionesInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("transaccionesInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("transaccionesInsertFormErrorMessage");
	}
	
});
