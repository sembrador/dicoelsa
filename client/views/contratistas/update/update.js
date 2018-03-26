var pageSession = new ReactiveDict();

Template.ContratistasUpdate.onCreated(function() {
	
});

Template.ContratistasUpdate.onDestroyed(function() {
	
});

Template.ContratistasUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ContratistasUpdate.events({
	
});

Template.ContratistasUpdate.helpers({
	
});

Template.ContratistasUpdateForm.onCreated(function() {
	
});

Template.ContratistasUpdateForm.onDestroyed(function() {
	
});

Template.ContratistasUpdateForm.onRendered(function() {
	pageSession.set("telefonosCrudItems", this.data.contratista.telefonos || []);


	pageSession.set("contratistasUpdateFormInfoMessage", "");
	pageSession.set("contratistasUpdateFormErrorMessage", "");

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

Template.ContratistasUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contratistasUpdateFormInfoMessage", "");
		pageSession.set("contratistasUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var contratistasUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(contratistasUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contratistasUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("contratistas", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contratistasUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				values.telefonos = pageSession.get("telefonosCrudItems"); Meteor.call("contratistasUpdate", t.data.contratista._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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
	}, 

	'click .field-telefonos .crud-table-row .delete-icon': function(e, t) { e.preventDefault(); var self = this; bootbox.dialog({ message: 'Delete? Are you sure?', title: 'Delete', animate: false, buttons: { success: { label: 'Yes', className: 'btn-success', callback: function() { var items = pageSession.get('telefonosCrudItems'); var index = -1; _.find(items, function(item, i) { if(item._id == self._id) { index = i; return true; }; }); if(index >= 0) items.splice(index, 1); pageSession.set('telefonosCrudItems', items); } }, danger: { label: 'No', className: 'btn-default' } } }); return false; }
});

Template.ContratistasUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contratistasUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contratistasUpdateFormErrorMessage");
	}, 
		"telefonosCrudItems": function() {
		return pageSession.get("telefonosCrudItems");
	}
});


Template.ContratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertForm.onCreated(function() {
	
});

Template.ContratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertForm.onDestroyed(function() {
	
});

Template.ContratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertForm.onRendered(function() {
	

	pageSession.set("contratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertFormInfoMessage", "");
	pageSession.set("contratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertFormErrorMessage", "");

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

Template.ContratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertFormInfoMessage", "");
		pageSession.set("contratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var contratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(contratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				var data = pageSession.get("telefonosCrudItems") || []; values._id = Random.id(); data.push(values); pageSession.set("telefonosCrudItems", data); $("#field-telefonos-insert-form").modal("hide"); e.currentTarget.reset();
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		$("#field-telefonos-insert-form").modal("hide"); t.find("form").reset();

		/*CANCEL_REDIRECT*/
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

Template.ContratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contratistasUpdateFieldTelefonosInsertFormContainerFieldTelefonosInsertFormErrorMessage");
	}
	
});
