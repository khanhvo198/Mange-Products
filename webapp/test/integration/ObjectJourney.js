/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	"use strict";

	QUnit.module("Object");

	opaTest("Should see the busy indicator on object view after metadata is loaded", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		//Actions
		When.onTheWorklistPage.iRememberTheItemAtPosition(1);
		When.onTheBrowser.iRestartTheAppWithTheRememberedItem({
			delay: 1000
		});
		When.onTheAppPage.iWaitUntilTheAppBusyIndicatorIsGone();

		// Assertions
		Then.onTheObjectPage.iShouldSeeTheObjectViewsBusyIndicator().
		and.theObjectViewsBusyIndicatorDelayIsRestored().
		and.iShouldSeeTheRememberedObject().
		and.theObjectViewShouldContainOnlyFormattedUnitNumbers();

		// Cleanup
		Then.iTeardownMyAppFrame();

	});
	
	opaTest("Should see the 'New Product' view after pressing the 'Add' button", function(Given, When, Then) {
		Given.iStartMyApp();
		When.onTheWorklistPage.iWaitUntilTheTableIsLoaded().and.iPressAdd();
		Then.onTheNewProductPage.iShouldSeeThePage().and.iTeardownMyAppFrame();                    
	});
	
	
	

});