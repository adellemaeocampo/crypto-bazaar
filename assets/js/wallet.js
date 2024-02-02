var nftWalletEl = walletEl.lastElementChild.lastElementChild;

//
// catch click on remove button on nftWallet page
nftWalletEl.addEventListener('click', function (event) {
  var element = event.target;
  // console.log(element);
  // console.log(element.parentElement);
  if (element.matches("button") === true) {
    var contract = element.parentElement.parentElement.getAttribute("data-contract");
    var identifier = element.parentElement.parentElement.getAttribute("data-identifier");
    
    function removeNFTAlert() {
      var alertEl = document.createElement("div");
      alertEl.innerHTML = `<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert" style="width: 500px;">
          <strong class="font-bold">Remove NFT from Wallet!</strong>
          <p>Are you sure you want to remove this NFT from the wallet? All of your data will be permanently removed. This action cannot be undone.</p>
          <div class="bg-green-100 text-green-700 px-4 py-3 rounded relative justify-center">
          <button type="button" id="ok-button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Ok</button>
          <button type="button" id="cancel-button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
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
          // console.log(nftIDEl);
          // nftIDEl.classList.add("text-red-500");
      });

      var cancelButton = alertEl.querySelector("#cancel-button");
      cancelButton.addEventListener("click", function () {
        alertEl.remove();
          // console.log(nftIDEl);
          // nftIDEl.classList.add("text-red-500");
      });
    };

    removeNFTAlert();

    // wallet.removeNFT(contract, identifier);
    
    // renderNFTwallet();
  }
});

function init() {
    // wallet.clearAllNFTs();
    // console.log(wallet);
    //getCollectionRankingByVolume();
  
    // NFT test data for display in wallet, need to be deleted when buying feature is implemented.
    // nft = {
    //   collection : "boredapegolfclub-altava",
    //   contract : "0xa4871fee6118387959d4c935a91095c99081b7e5",
    //   dayPurchased : "",
    //   identifier : "7522",
    //   name : "BAGC #7522",
    //   price : {currency: '', decimals: 0, value: ''},
    //   token_standard : "erc721",
    //   image_url : "https://bagc-resource.s3.ap-northeast-2.amazonaws.com/images/bagc/7522.png",
    // }
    // wallet.saveNFT(nft);
    
    // nft = {
    //   collection : "rarible",
    //   contract : "0xd07dc4262bcdbf85190c01c996b4c06a461d2430",
    //   dayPurchased : "",
    //   identifier : "22",
    //   name : "souls_are_NFTs",
    //   price : {currency: '', decimals: 0, value: ''},
    //   token_standard : "erc1155",
    //   image_url : "https://ipfs.daonomic.com/ipfs/QmfLfovcq2QKy4SpBLvrtNWSUqdf7DUhXB8BgZv8wcazL4",
    // };
    // wallet.saveNFT(nft);
    
    
    
    wallet.loadNFTs();
    // console.log(wallet);
    renderNFTwallet();
  
};
  
init();
  