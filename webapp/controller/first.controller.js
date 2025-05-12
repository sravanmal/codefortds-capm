sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], (Controller , MessageToast) => {
    "use strict";

    return Controller.extend("sravan.ust.tdsapp.controller.first", {
        onInit() {
        },
        onGenerateTDS: function() {
            const codeInput = this.getView().byId("codeInput").getValue();
            const outputField = this.getView().byId("tdsOutput");
      
            if (!codeInput) {
              MessageToast.show("Please enter some code first.");
              return;
            }
            
            // Show loading message
            outputField.setValue("Generating TDS...");
      
            // Call backend API
            $.ajax({
                url: "https://myapp-relaxed-jackal-nk.cfapps.us10-001.hana.ondemand.com/askgeminifortds", // Replace with your destination's URL
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ 
                  "value" : codeInput 
                }), // Replace with your actual payload
                success: function(data, status, xhr) {
                  // Handle successful response (e.g., display data in UI)
                  console.log("Success: ", data);
                  outputField.setValue(data.data);
                },
                error: function(xhr, status, error) {
                  // Handle error
                  console.error("Error calling ChatGPT:", error);
                  outputField.setValue("Failed to generate TDS.");
                }
              });
              
          },
      
          onDownload: function() {
            const text = this.getView().byId("tdsOutput").getValue();
            const blob = new Blob([text], { type: "application/msword" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "TDS.doc";
            link.click();
          }      
    });
});