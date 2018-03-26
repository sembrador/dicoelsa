var pageSession = new ReactiveDict();

Template.MaterialesDetails.onCreated(function() {
	
});

Template.MaterialesDetails.onDestroyed(function() {
	
});

Template.MaterialesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.MaterialesDetails.events({
	
});

Template.MaterialesDetails.helpers({
	
});

Template.MaterialesDetailsForm.onCreated(function() {
	
});

Template.MaterialesDetailsForm.onDestroyed(function() {
	
});

Template.MaterialesDetailsForm.onRendered(function() {
	pageSession.set("ultimaEntradaCrudItems", this.data.material.ultima_entrada || []);
pageSession.set("ultimaSalidaCrudItems", this.data.material.ultima_salida || []);


	pageSession.set("materialesDetailsFormInfoMessage", "");
	pageSession.set("materialesDetailsFormErrorMessage", "");

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

Template.MaterialesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("materialesDetailsFormInfoMessage", "");
		pageSession.set("materialesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var materialesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(materialesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("materialesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("materialesDetailsFormErrorMessage", message);
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

		Router.go("materiales", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("materiales", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.MaterialesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("materialesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("materialesDetailsFormErrorMessage");
	}, 
		"ultimaSalidaCrudItems": function() {
		return pageSession.get("ultimaSalidaCrudItems");
	},
	"ultimaEntradaCrudItems": function() {
		return pageSession.get("ultimaEntradaCrudItems");
	}
});
