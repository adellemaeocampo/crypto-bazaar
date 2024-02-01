var nftWalletEl = walletEl.lastElementChild.lastElementChild;

//
// catch click on nftWallet
nftWalletEl.addEventListener('click', function (event) {
  var element = event.target;
  // console.log(element);
  // console.log(element.parentElement);
  if (element.matches("button") === true) {
    var contract = element.parentElement.parentElement.getAttribute("data-contract");
    var identifier = element.parentElement.parentElement.getAttribute("data-identifier");
    // console.log(contract);

    wallet.removeNFT(contract, identifier);
    
    renderNFTwallet();
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
  