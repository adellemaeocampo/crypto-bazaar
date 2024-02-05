var nftWalletEl = walletEl.lastElementChild.lastElementChild;

//
// catch click on remove button on nftWallet page
nftWalletEl.addEventListener('click', function (event) {
  var element = event.target;
  
  if (element.matches("button") === true) {
    var contract = element.parentElement.parentElement.getAttribute("data-contract");
    var identifier = element.parentElement.parentElement.getAttribute("data-identifier");
    
    // display the alert to get confirmation before remove NFT from wallet
    function removeNFTAlert() {
      var alertEl = document.createElement("div");
      alertEl.innerHTML = `<div class="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" style="width: 500px;">
          <strong class="font-bold">Are you sure?</strong>
          <p>This action will remove the item from your wallet, and cannot be undone.</p>
          <div class="bg-red-100 text-red-700 px-4 py-3 rounded relative justify-center">
          <button type="button" id="ok-button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Yes</button>
          <button type="button" id="cancel-button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">No</button>
          </div>
          </div>`;
          

      alertEl.style.position = "fixed";
      alertEl.style.top = "50%";
      alertEl.style.left = "50%";
      alertEl.style.transform = "translate(-50%, -50%)";

      document.body.appendChild(alertEl);

      var okButton = alertEl.querySelector("#ok-button");
      okButton.addEventListener("click", function () {
        wallet.removeNFT(contract, identifier);  
        alertEl.remove();
        renderNFTwallet();
      });

      var cancelButton = alertEl.querySelector("#cancel-button");
      cancelButton.addEventListener("click", function () {
        alertEl.remove();
      });
    };

    removeNFTAlert();
  }
});

//print wallet found in local storage to wallet page
function printTowallet (coins){

  var coinWalletEl = walletEl.firstElementChild.lastElementChild;
  coinWalletEl.innerHTML = "";
  
  if (coins.length === 0) {
    
    // display "Your Coins wallet is empty..."
    var coinEl = document.createElement('section');
    coinEl.classList = 'container flex';
    coinWalletEl.appendChild(coinEl);

    var h3El = document.createElement('h3');
    h3El.innerHTML = 'Your Crypto wallet is empty - <a href="crypto.html" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Explore Cryptocurrency</a> to find currency to add to your wallet. ';
    coinEl.appendChild(h3El);
    return;
  };

  var sumCoinsValue = 0;
  totalCoinsAssetsEl.textContent = sumCoinsValue;

  for (let index = 0; index < coins.length; index++) {
    const element = coins[index];

    var line = document.createElement("section");
    line.classList.add("container", "flex");
    coinWalletEl.append(line);
  
    var iconCont = document.createElement("section");
    var iconImg = document.createElement("img");
    iconCont.classList.add("container", "flex", "mr-[2vw]", "my-[1vw]");
    iconImg.src = element.iconUrl; 
    iconImg.style.width = "300px";
    iconCont.style.width = iconImg.style.width;
    iconCont.append(iconImg);
    line.append(iconCont);

    var listSymbol = document.createElement("section");
    listSymbol.classList.add("container", "flex", "items-center", "text-lg", "font-bold");
    listSymbol.textContent = element.symbol + " / " + element.name;
    line.append(listSymbol);

    var listQuantity = document.createElement("section");
    listQuantity.classList.add("container", "flex", "items-center", "text-lg");
    listQuantity.textContent = "Quantity: " + element.quantity;
    line.append(listQuantity);

    var listPrice = document.createElement("section");
    listPrice.classList.add("container", "flex", "items-center", "text-md");
    listPrice.textContent = "$" + parseFloat(element.price).toFixed(2);
    line.append(listPrice);

    sumCoinsValue += element.quantity * element.price;

    totalCoinsAssetsEl.textContent = "$" + parseFloat(sumCoinsValue).toFixed(2);

    // var listGraph = document.createElement("section");
    // listGraph.classList.add("container", "flex");
    // listGraph.textContent = "";
    // line.append(listGraph);

    // var canvas = document.createElement("canvas");
    // canvas.classList.add("bg-white-100")
    // canvas.id = element.name;
    // listGraph.append(canvas);
    
    // new Chart(element.name, {
    //     type: "line",
    //     data: {
    //         labels: element.sparkline.map((_, index) => (index + 1)),
    //         datasets: [{
    //             backgroundColor: "rgba(0, 0, 255, 1.0)",
    //             borderColor: "rgba(0, 0, 255, 0.1)",
    //             data: element.sparkline
    //         }]
    //     }
    // });

    var buttonCont = document.createElement("section");
    buttonCont.classList.add("container", "flex", "items-center", "justify-end", "ml-[4vw]");
    var button = document.createElement("button");
    button.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "w-[200px]", "h-[5vh]");
    button.innerHTML = "Remove&nbsp;From&nbsp;Wallet";
    button.addEventListener("click", function(){
      
      // display alert to confirm before removeing coin from wallet
      function removeCoinAlert() {
        var alertEl = document.createElement("div");
        alertEl.innerHTML = `<div class="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" style="width: 500px;">
            <strong class="font-bold">Are you sure?</strong>
            <p>This action will remove the item from your wallet, and cannot be undone.</p>
            <div class="bg-red-100 text-red-700 px-4 py-3 rounded relative justify-center">
            <button type="button" id="ok-button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Yes</button>
            <button type="button" id="cancel-button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">No</button>
            </div>
            </div>`;
            
        alertEl.style.position = "fixed";
        alertEl.style.top = "50%";
        alertEl.style.left = "50%";
        alertEl.style.transform = "translate(-50%, -50%)";
  
        document.body.appendChild(alertEl);
  
        var okButton = alertEl.querySelector("#ok-button");
        okButton.addEventListener("click", function () {
          wallet.removeCoin(element.symbol);
          alertEl.remove();
          printTowallet(wallet.coins);
        });
  
        var cancelButton = alertEl.querySelector("#cancel-button");
        cancelButton.addEventListener("click", function () {
          alertEl.remove();
        });
      };

      removeCoinAlert();
    });
    buttonCont.append(button);
    line.append(buttonCont);
  };
};

function init() {
  wallet.loadCoins();
  printTowallet(wallet.coins);
  wallet.loadNFTs();
  renderNFTwallet();
};
  
init();
  