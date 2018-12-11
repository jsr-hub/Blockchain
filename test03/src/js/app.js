App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Deliver.json", function(deliver) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Deliver = TruffleContract(deliver);
      // Connect provider to interact with contract
      App.contracts.Deliver.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Deliver.deployed().then(function(instance) {
      DeliveryInstance = instance;
      return DeliveryInstance.productsCount();
    }).then(function(productsCount) {
      var productsResults = $("#productsResults");
      productsResults.empty();

      for (var i = 1; i <= productsCount; i++) {
        DeliveryInstance.products(i).then(function(product) {
          var sid = product[0];
          var rid = product[1];
          var name = product[2];
          var quantity = product[3];

          // Render candidate Result
          var productTemplate = "<tr><th>" + sid + "</th><td>" + rid + "</th><td>" + name + "</td><td>" + quantity + "</td></tr>"
          productsResults.append(productTemplate);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
