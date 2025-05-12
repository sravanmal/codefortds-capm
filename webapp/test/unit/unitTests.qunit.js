/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sravan/ust/tdsapp/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
