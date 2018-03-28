var pageSession = new ReactiveDict();

Template.ProveedoresInsert.onCreated(function() {
	
});

Template.ProveedoresInsert.onDestroyed(function() {
	
});

Template.ProveedoresInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ProveedoresInsert.events({
	
});

Template.ProveedoresInsert.helpers({
	
});

Template.ProveedoresInsertForm.onCreated(function() {
	
});

Template.ProveedoresInsertForm.onDestroyed(function() {
	
});

Template.ProveedoresInsertForm.onRendered(function() {
	

	pageSession.set("proveedoresInsertFormInfoMessage", "");
	pageSession.set("proveedoresInsertFormErrorMessage", "");

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

Template.ProveedoresInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("proveedoresInsertFormInfoMessage", "");
		pageSession.set("proveedoresInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var proveedoresInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(proveedoresInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("proveedoresInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("proveedores", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("proveedoresInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("proveedoresInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.ProveedoresInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("proveedoresInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("proveedoresInsertFormErrorMessage");
	}
	
});
