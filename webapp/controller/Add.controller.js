sap.ui.define([
	"opensap/manageproducts/ManageProducts/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function(BaseController, History, MessageToast) {
	"use strict";
	return BaseController.extend("opensap.manageproducts.ManageProducts.controller.Add", {
		/* =========================================================== */
		/* lifecycle methods */
		/* =========================================================== */
		/**
		 * Called when the add controller is instantiated.
		 * @public
		 */
		onInit: function() {
			// Register to the add route matched
			this.getRouter().getRoute("add").attachPatternMatched(this._onRouteMatched, this);
		},
		/* =========================================================== */
		/* event handlers */
		/* =========================================================== */
		_onRouteMatched: function() {
			var oModel = this.getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		_onMetadataLoaded: function() {
			var oProperties = {
				ProductID: "" + parseInt(Math.random() * 1000000000, 10),
				TypeCode: "PR",
				TaxTarifCode: 1,
				CurrencyCode: "EUR",
				MeasureUnit: "EA"
				
			};
			this._oContext = this.getModel().createEntry("/ProductSet", {
				properties: oProperties,
				success: this._onCreateSuccess.bind(this)
			});
			this.getView().setBindingContext(this._oContext);
		},
		_onCreateSuccess: function(oProduct) {
			var sId = oProduct.ProductID;
			this.getRouter().navTo("object", {
				objectId: sId
			}, true);
			this.getView().unbindObject();
			var sMessage = this.getResourceBundle().getText("newObjectCreated", [oProduct.Name]);
			
			MessageToast.show(sMessage, {
				closeOnBrowserNavigation: false
			});
			
			
		},
		onCanel: function() {
			this.onNavBack();
		},
		onSave: function() {
			this.getModel().submitChanges();
		},
		/**
		* Event handler for navigating back.
		* It checks if there is a history entry. If yes, history.go(-1) will
		happen.
		* If not, it will replace the current entry of the browser history
		with the worklist route.
		* @public
		*/
		onNavBack: function() {
			this.getModel().deleteCreatedEntry(this._oContext);
			
			var oHistory = History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("worklist", {}, bReplace);
			}
		}
	});
});