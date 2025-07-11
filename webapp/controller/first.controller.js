sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], (Controller , MessageToast) => {
    "use strict";

    return Controller.extend("sravan.ust.tdsapp.controller.first", {
        onInit() {
        },
        onGenerateFDS: function() {
            MessageToast.show("generate fds");
            const codeInput = this.getView().byId("codeInput").getValue();
            const outputField = this.getView().byId("fdsOutput");
            const buttondownload = this.getView().byId("_IDGenButton1");
          
            buttondownload.setEnabled(false);
            if (!codeInput) {
              MessageToast.show("Please enter some code first.");
              return;
            }
            
            // Show loading message
            outputField.setValue("Generating FDS...");
      
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
                  buttondownload.setEnabled(true);
                },
                error: function(xhr, status, error) {
                  // Handle error
                  console.error("Error calling ChatGPT:", error);
                  outputField.setValue("Failed to generate TDS.");
                }
              });
              
          },
      
          onDownload: function() {
            MessageToast.show("exporting into word");
            const text = this.getView().byId("fdsOutput").getValue();
            const blob = new Blob([text], { type: "application/msword" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "FDS.doc";
            link.click();
          },
            
    });
});