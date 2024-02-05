// catch click on nftCollectionRankingEl page
nftCollectionRankingEl.addEventListener('click', function (event) {
  var element = event.target;
  if (element.matches("button") === true) {
    var nft = {
      identifier : element.parentElement.parentElement.getAttribute("data-identifier"),
      collection : element.parentElement.parentElement.getAttribute("data-collection"),
      contract : element.parentElement.parentElement.getAttribute("data-contract"),
      token_standard : element.parentElement.parentElement.getAttribute("data-token_standard"),
      name : element.parentElement.parentElement.getAttribute("data-name"),
      dayPurchased : Date.now(),
      price : {
          "currency": "",
          "decimals": 0,
          "value": "",
      },
      image_url : element.parentElement.parentElement.getAttribute("data-image_url"),
    };

    var nftIDEl = element.parentElement.firstElementChild.nextElementSibling;
    
    if (wallet.saveNFT(nft)) {
      // display alert to confirm before adding NFT to the wallet
      function walletAlert() {
        var alert = document.createElement("div");
        alert.innerHTML = `<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert" style="width: 500px;">
            <strong class="font-bold">Added To Wallet!</strong>
            <span class="block sm:inline">The item has been added to your wallet.</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3" role="button" id="closeButton">
                <svg class="fill-current h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
            </div>`;

        alert.style.position = "fixed";
        alert.style.top = "50%";
        alert.style.left = "50%";
        alert.style.transform = "translate(-50%, -50%)";

        document.body.appendChild(alert);

        var closeButton = alert.querySelector("#closeButton");
        closeButton.addEventListener("click", function () {
            alert.remove();
            nftIDEl.classList.add("text-red-500");
        });
      };
   
      walletAlert();      
    };
  };
});

function init() {
  renderTop3CollectionRankingByVolumeIn1Day();
};

init();