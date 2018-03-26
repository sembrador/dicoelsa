Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"login",
	"register",
	"verify_email",
	"forgot_password",
	"reset_password"
];

Router.privateRoutes = [
	"home_private",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout",
	"materiales",
	"materiales.details",
	"materiales.insert",
	"materiales.update",
	"proyectos",
	"proyectos.details",
	"proyectos.insert",
	"proyectos.update",
	"contratistas",
	"contratistas.details",
	"contratistas.insert",
	"contratistas.update",
	"transacciones",
	"transacciones.details",
	"transacciones.insert",
	"transacciones.update",
	"proveedores",
	"proveedores.details",
	"proveedores.insert",
	"proveedores.update"
];

Router.freeRoutes = [
	"home_public"
];

Router.roleMap = [
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] },
	{ route: "user_settings",	roles: ["user","admin"] },
	{ route: "user_settings.profile",	roles: ["user","admin"] },
	{ route: "user_settings.change_pass",	roles: ["user","admin"] }
];

Router.defaultFreeRoute = "home_public";
Router.defaultPublicRoute = "home_public";
Router.defaultPrivateRoute = "home_private";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("/", {name: "home_public", title: "", controller: "HomePublicController"});
	this.route("/login", {name: "login", title: "", controller: "LoginController"});
	this.route("/register", {name: "register", title: "", controller: "RegisterController"});
	this.route("/verify_email/:verifyEmailToken", {name: "verify_email", title: "", controller: "VerifyEmailController"});
	this.route("/forgot_password", {name: "forgot_password", title: "", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", title: "", controller: "ResetPasswordController"});
	this.route("/home_private", {name: "home_private", title: "HOLA! {{userFullName}}!", controller: "HomePrivateController"});
	this.route("/admin", {name: "admin", title: "", controller: "AdminController"});
	this.route("/admin/users", {name: "admin.users", title: "", controller: "AdminUsersController"});
	this.route("/admin/users/details/:userId", {name: "admin.users.details", title: "", controller: "AdminUsersDetailsController"});
	this.route("/admin/users/insert", {name: "admin.users.insert", title: "", controller: "AdminUsersInsertController"});
	this.route("/admin/users/edit/:userId", {name: "admin.users.edit", title: "", controller: "AdminUsersEditController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
	this.route("/materiales", {name: "materiales", title: "", controller: "MaterialesController"});
	this.route("/materiales/details/:materialId", {name: "materiales.details", title: "", controller: "MaterialesDetailsController"});
	this.route("/materiales/insert", {name: "materiales.insert", title: "", controller: "MaterialesInsertController"});
	this.route("/materiales/update/:materialId", {name: "materiales.update", title: "", controller: "MaterialesUpdateController"});
	this.route("/proyectos", {name: "proyectos", title: "", controller: "ProyectosController"});
	this.route("/proyectos/details/:proyectoId", {name: "proyectos.details", title: "", controller: "ProyectosDetailsController"});
	this.route("/proyectos/insert", {name: "proyectos.insert", title: "", controller: "ProyectosInsertController"});
	this.route("/proyectos/update/:proyectoId", {name: "proyectos.update", title: "", controller: "ProyectosUpdateController"});
	this.route("/contratistas", {name: "contratistas", title: "", controller: "ContratistasController"});
	this.route("/contratistas/details/:contratistaId", {name: "contratistas.details", title: "", controller: "ContratistasDetailsController"});
	this.route("/contratistas/insert", {name: "contratistas.insert", title: "", controller: "ContratistasInsertController"});
	this.route("/contratistas/update/:contratistaId", {name: "contratistas.update", title: "", controller: "ContratistasUpdateController"});
	this.route("/transacciones", {name: "transacciones", title: "", controller: "TransaccionesController"});
	this.route("/transacciones/details/:transaccionId", {name: "transacciones.details", title: "", controller: "TransaccionesDetailsController"});
	this.route("/transacciones/insert", {name: "transacciones.insert", title: "", controller: "TransaccionesInsertController"});
	this.route("/transacciones/update/:transaccionId", {name: "transacciones.update", title: "", controller: "TransaccionesUpdateController"});
	this.route("/proveedores", {name: "proveedores", title: "", controller: "ProveedoresController"});
	this.route("/proveedores/details/:proveedorId", {name: "proveedores.details", title: "", controller: "ProveedoresDetailsController"});
	this.route("/proveedores/insert", {name: "proveedores.insert", title: "", controller: "ProveedoresInsertController"});
	this.route("/proveedores/update/:proveedorId", {name: "proveedores.update", title: "", controller: "ProveedoresUpdateController"});
});
