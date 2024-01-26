// https://api.opensea.io/api/v2/collection/{collection name}/nfts?limit=5
const getNFTsByCollectionURL = "https://api.opensea.io/api/v2/collection/"
const NFTsLimit = 5;

// https://api.opensea.io/api/v2/chain/{chain}/contract/{address}/nfts/{identifier}
const getNFTByContractURL = "https://api.opensea.io/api/v2/chain/";

// https://api.opensea.io/api/v2/offers/collection/{collection_slug}/nfts/{identifier}/best
const getPriceOfNFTURL = "https://api.opensea.io/api/v2/offers/collection/"

// Object: wallet keep track of NFTs and Coins which are the list of NFTs and coins in the wallet save to localstorage
var wallet = {
  coins : [],
  NFTs : [],

//  // element of NFTs
//   NFT = {
//     identifier : "",
//     collection : "",
//     contract : "",
//     token_standard : "",
//     name : "",
//     dayPurchased : "",
//   }

  // _checkDuplicate: check if the NFT has been existed in the NFTs, return index of found duplicate or -1 if not found.
  _checkNFTDuplicate : function(address, id) {
          
    for (let index = 0; index < this.NFTs.length; index++) {
      const element = this.NFTs[index];
      if (element.contract === address && element.identifier === id) {
        return index;
      }
    };
    return -1;
  },
  
  // saveNFT gets NFT and save NFT to NFTs in localStorage after transform to string.
  // return false/true if it failed/success to save to localStorage
  saveNFT : function(NFT) {
    // check if the NFT has been existed. If yes, return true.
    var index = this._checkDuplicate(NFT.contract, NFT.identifier);
    if (index >= 0) {
      return true;
    } else {
        this.NFTs.push(NFT);
    };

    try {
      localStorage.setItem('NFTs', JSON.stringify(this.NFTs));
      return true;
    } catch(e) {
      return false;
    };      
  },
    
  // loadNFTs returns array of objects from NFTs in localStorage.
  loadNFTs : function() {
      if (localStorage.getItem("NFTs") != null) {
          //  get string from NFTs in localStorage and transform back to array of objects.
          this.NFTs = JSON.parse(localStorage.getItem("NFTs"));           
      };
      return this.NFTs;
  },
    
  // clearAll clears the array NFTs and NFTs in localStorage
  clearAllNFTs : function() {
      if (this.NFTs.length != 0) {
          this.NFTs.length = 0;
      };
      localStorage.removeItem("NFTs");
  },
};

// getNFTsByCollection request API https://api.opensea.io/api/v2/collections/{collection_slug}
// 
function getNFTsByCollection(collection, limit) {
    const options = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': '0c9e93e867e640e081971469d0447097'}};
    const url = getNFTsByCollectionURL + collection + "/nfts?limit=" + limit;

    fetch(url, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));    
};

// getNFTsByContract request API https://api.opensea.io/api/v2/chain/{chain}/contract/{address}/nfts/{identifier}
function getNFTByContract(chain, address, identifier) {
    const options = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': '0c9e93e867e640e081971469d0447097'}};
    const url = getNFTByContractURL + chain + "/contract/" + address + "/nfts/" + identifier;

    fetch(url, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

// 
function getPriceOfNFT(collection, identifier) {
    const options = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': '0c9e93e867e640e081971469d0447097'}};
    const url = getPriceOfNFTURL + collection + "/nfts/" + identifier + "/best";

    fetch('url', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}