/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"opensap/manageproducts/ManageProducts/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"opensap/manageproducts/ManageProducts/test/integration/pages/Worklist",
	"opensap/manageproducts/ManageProducts/test/integration/pages/Object",
	"opensap/manageproducts/ManageProducts/test/integration/pages/NotFound",
	"opensap/manageproducts/ManageProducts/test/integration/pages/Browser",
	"opensap/manageproducts/ManageProducts/test/integration/pages/App",
	"opensap/manageproducts/ManageProducts/test/integration/pages/NewProduct"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "opensap.manageproducts.ManageProducts.view."
	});

	sap.ui.require([
		"opensap/manageproducts/ManageProducts/test/integration/WorklistJourney",
		"opensap/manageproducts/ManageProducts/test/integration/ObjectJourney",
		"opensap/manageproducts/ManageProducts/test/integration/NavigationJourney",
		"opensap/manageproducts/ManageProducts/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});