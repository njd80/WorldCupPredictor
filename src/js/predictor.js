predictor = {
  init: function() {
    console.log('init');

    //Load Data
    $.getJSON("data.json", function(d) {
      predictor.processData(d);
    });
  },

  processData: function(d) {
    console.log(d);
    
  }

};

$(document).ready(function () {
    predictor.init();
});
