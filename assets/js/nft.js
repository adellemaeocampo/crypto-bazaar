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
      
      if (wallet.saveNFT(nft)) {
        element.parentElement.parentElement.firstElementChild.firstElementChild.classList.add("text-red");
      };
    }
  });

function init() {
    
    renderTop3CollectionRankingByVolumeIn1Day();
    // render10NFTs(nft1);
    // render10NFTs(nft2);
    // render10NFTs(nft3);
    
};
  
init();