// https://api.opensea.io/api/v2/collection/{collection name}/nfts?limit=5
const getNFTsByCollectionURL = "https://api.opensea.io/api/v2/collection/"
const NFTsLimit = 5;

// https://api.opensea.io/api/v2/chain/{chain}/contract/{address}/nfts/{identifier}
const getNFTByContractURL = "https://api.opensea.io/api/v2/chain/";

// https://api.opensea.io/api/v2/listings/collection/{collection_slug}/nfts/{identifier}/best
const getPriceOfNFTURL = "https://api.opensea.io/api/v2/offers/collection/"

// Elements
const nftCollectionRankingEl = document.getElementById("nft");
const walletEl = document.getElementById("wallet");
const nft1 = document.getElementById("nft-1");
const nft2 = document.getElementById("nft-2");
const nft3 = document.getElementById("nft-3");
const totalNFTsAssets = document.getElementById("total-nfts");


// Global variables
var nftCollectionsRankingByVolume = [];
var nftTotalAssets = 0;
var nft = {
  identifier : "",
  collection : "",
  contract : "",
  token_standard : "",
  name : "",
  dayPurchased : "",
  price : {
    "currency": "",
    "decimals": 0,
    "value": "",
  },
  image_url : "",
};
var currentNFTPrice = {
  "currency": "",
  "decimals": 0,
  "value": "",
};


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
//     purchasedPrice : {
//        "currency": "",
//        "decimals": 0,
//        "value": "",
//      },
//     image_url : "",
//   }

  // _checkDuplicate: check if the NFT has been existed in the NFTs, return index of found duplicate or -1 if not found.
  _checkNFTDuplicate : function(address, id) {
    if (this.NFTs.length > 0) {
      for (let index = 0; index < this.NFTs.length; index++) {
        const element = this.NFTs[index];
        if (element.contract === address && element.identifier === id) {
          return index;
        }
      };
    };
    return -1;
  },
  
  // removeNFT(address, id) remove an NFT from the NFTs and localStorage, return true/false.
  removeNFT : function(address, id) {
    // check if NFT has been existed, If no, return true.
    var index = this._checkNFTDuplicate(address, id);
    if (index < 0) {
      return true;
    } else {
      this.NFTs.splice(index, 1);
    }

    // save to localStorage
    try {
      localStorage.setItem('NFTs', JSON.stringify(this.NFTs));
      return true;
    } catch(e) {
      return false;
    };
  },

  // saveNFT gets NFT and save NFT to NFTs in localStorage after transform to string.
  // return false/true if it failed/success to save to localStorage
  saveNFT : function(nft) {
    // console.log(nft);
    // console.log(this.NFTs);

    // check if id = null return false
    if (nft.identifier == null) {
      return false;
    }
    // check if the NFT has been existed. If yes, return true.
    var index = this._checkNFTDuplicate(nft.contract, nft.identifier);
    if (index >= 0) {
      return true;
    } else {
        this.NFTs.push(nft);
    };
    // this.NFTs.push(nft);
    // console.log(this.NFTs);
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
    var url = getNFTsByCollectionURL + collection + "/nfts?limit=" + limit;

    fetch(url, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));    
};

// getNFTsByContract request API https://api.opensea.io/api/v2/chain/{chain}/contract/{address}/nfts/{identifier}
function getNFTByContract(chain, address, identifier) {
    const options = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': '0c9e93e867e640e081971469d0447097'}};
    var url = getNFTByContractURL + chain + "/contract/" + address + "/nfts/" + identifier;

    fetch(url, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // return data to global variable nft
      console.log(data);
      nft.identifier = data.nft.identifier;
      nft.collection = data.nft.collection;
      nft.contract = data.nft.contract;
      nft.token_standard = data.nft.token_standard;
      nft.name = data.nft.name;
      //nft.dayPurchased = new Date()
    })
    .catch(err => console.error(err));
}

// 
function getPriceOfNFT(collection, identifier) {
  const options = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': '0c9e93e867e640e081971469d0447097'}};
  var url = getPriceOfNFTURL + collection + "/nfts/" + identifier + "/best";

  fetch(url, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    // return price data to global variable currentNFTPrice
    currentNFTPrice = data.price.current;
  })
  .catch(err => console.error(err));
}

//
function renderPrice(el, collection, id) {
  const options = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': '0c9e93e867e640e081971469d0447097'}};
  var url = getPriceOfNFTURL + collection + "/nfts/" + id + "/best";

  fetch(url, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
    // console.log(el);
    // return price data to global variable currentNFTPrice
    if (typeof data.price != "undefined") {
      el.textContent = data.price.value/Math.pow(10, data.price.decimals) + " " + data.price.currency; // Render price
      
      if (totalNFTsAssets) {
        nftTotalAssets = nftTotalAssets + data.price.value/Math.pow(10, data.price.decimals);
        totalNFTsAssets.textContent = nftTotalAssets + " " + data.price.currency;        
      };
      
    } else {
      el.textContent = "";
    }
    
  })
  .catch(err => console.error(err));
  
}

// render top 3 collections ranking by volume in 1 day
function renderTop3CollectionRankingByVolumeIn1Day() {
  const options = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': 'nRneSF8mGcK2LHkhbPKszsvz'}};
  var url = 'https://restapi.nftscan.com/api/v2/statistics/ranking/collection?sort_field=volume_1d&sort_direction=desc&limit=3';

  fetch(url, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data.data);
    for (let index = 0; index < data.data.length; index++) {
      const element = data.data[index];
      var i = index + 1;
      var str = "nft-" + i;
      var collectionEl = document.getElementById(str);
      collectionEl.innerHTML = "";
      
      // set contract address to get NFTs later
      collectionEl.setAttribute("data-contract", element.contract_address);

      // display banner logo
      // var section1El = document.createElement('section');
      // var imgEl = document.createElement('img');
      // section1El.classList = 'container flex';
      // imgEl.src = element.banner_url;
      // section1El.appendChild(imgEl);
      // collectionEl.appendChild(section1El);

      // display name of collection
      var section2El = document.createElement('section');
      var h32El = document.createElement('h3');
      section2El.classList = 'container flex text-2xl font-bold';
      h32El.textContent = element.contract_name + " Collection";
      section2El.appendChild(h32El);
      collectionEl.appendChild(section2El);

      // Create a new section for the HR
      var sectionHrEl = document.createElement('section');
      var hrEl = document.createElement('hr');
      hrEl.classList = 'mb-[0.5vw]';
      sectionHrEl.appendChild(hrEl);
      collectionEl.appendChild(sectionHrEl);
      
      
    };
    render10NFTs(nft1);
    render10NFTs(nft2);
    render10NFTs(nft3);
  });
};

// render 10 NFTs for each collection
function render10NFTs(el) {
  // get 10 NFTs
  // var nft1 = document.getElementById("nft-1");
  var contract = el.getAttribute("data-contract");
  const options = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': '0c9e93e867e640e081971469d0447097'}};
    var url = 'https://api.opensea.io/api/v2/chain/ethereum/contract/' + contract + "/nfts?limit=" + 10;

    fetch(url, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data.nfts);
      // render 10 NFTs
      for (let index = 0; index < data.nfts.length; index++) {
        const element = data.nfts[index];
        var nftEl = document.createElement('section');
        //nftWalletEl.appendChild(nftEl);
        // console.log(nftEl);
        nftEl.classList = 'container flex flex-row gap-2';
        nftEl.setAttribute("data-contract", element.contract);
        nftEl.setAttribute("data-identifier", element.identifier);
        nftEl.setAttribute("data-token_standard", element.token_standard);
        nftEl.setAttribute("data-collection", element.collection);
        nftEl.setAttribute("data-name", element.name);
        nftEl.setAttribute("data-image_url", element.image_url);
        el.appendChild(nftEl);

        var section1El = document.createElement('section');
        var imgEl = document.createElement('img');
        section1El.classList = 'container flex mr-[1vw]';
        imgEl.src = element.image_url;
        imgEl.style.width = "300px";
        section1El.style.width = imgEl.style.width; // Set the width of section1El to match the image width
        section1El.appendChild(imgEl);
        nftEl.appendChild(section1El);

        var section3El = document.createElement('section');
        var h33El = document.createElement('h3');
        section3El.classList = 'container flex flex-col justify-center';
        h33El.classList = 'font-bold text-xl';
        h33El.textContent = " #" + element.identifier;
        section3El.appendChild(h33El);

        var priceContainerEl = document.createElement('section');
        priceContainerEl.classList = 'container flex';
        renderPrice(priceContainerEl, element.collection, element.identifier);
        section3El.appendChild(priceContainerEl);
        nftEl.appendChild(section3El);

        // Add to wallet button
        var buttonEl = document.createElement('button');
        buttonEl.classList = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[200px] mt-[1vw]'
        buttonEl.textContent = 'Add To Wallet';
        section3El.appendChild(buttonEl);
        nftEl.appendChild(section3El);
      
      };
    });
  
}

// // render NFT collection
// function renderNFTPage() {
//   //render top 3 collections ranking by volume in 1 day
//   renderTop3CollectionRankingByVolumeIn1Day();
//   //render 10NFTs for each collection
// }

// renderNFTwallet render the list of NFT from the object wallet.
function renderNFTwallet() {
  // get NFT wallet El
  var nftWalletEl = walletEl.lastElementChild.lastElementChild;
  // console.log(walletEl);
  // console.log(nftWalletEl);

  // reset HTML Element
  nftWalletEl.innerHTML = "";


  if (wallet.NFTs.length === 0) {
    return;
  };

  var nfts = wallet.loadNFTs();
  // var nftTotalAssets = 0;
  // console.log(nfts);
  for (let index = 0; index < nfts.length; index++) {
    const element = nfts[index];
    var nftEl = document.createElement('section');
    //nftWalletEl.appendChild(nftEl);
    // console.log(nftEl);
    nftEl.classList = 'container flex';
    nftEl.setAttribute("data-contract", element.contract);
    nftEl.setAttribute("data-identifier", element.identifier);
    nftEl.setAttribute("data-token_standard", element.token_standard);
    nftWalletEl.appendChild(nftEl);

    //
    var section1El = document.createElement('section');
    var h31El = document.createElement('h3');
    section1El.classList = 'container flex bg-cyan-100';
    h31El.textContent = element.name + " #" + element.identifier;
    section1El.appendChild(h31El);
    nftEl.appendChild(section1El);

    //
    var section2El = document.createElement('section');
    var h32El = document.createElement('h3');
    section2El.classList = 'container flex bg-red-100';
    h32El.textContent = element.collection;
    section2El.appendChild(h32El);
    nftEl.appendChild(section2El);

    //
    var section3El = document.createElement('section');
    var h33El = document.createElement('h3');
    section3El.classList = 'container flex bg-yellow-100';

    renderPrice(h33El, element.collection, element.identifier);
    section3El.appendChild(h33El);
    nftEl.appendChild(section3El);

    //
    var section4El = document.createElement('section');
    var imgEl = document.createElement('img');
    section4El.classList = 'container flex bg-green-100';
    imgEl.src = element.image_url;
    imgEl.style.width = "47px";
    section4El.appendChild(imgEl);
    nftEl.appendChild(section4El);

    // Add to wallet button
    var buttonEl = document.createElement('button');
    buttonEl.classList = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[200px] mt-[1vw]'
    buttonEl.textContent = 'Remove From Wallet';
    section4El.appendChild(buttonEl);
    nftEl.appendChild(section4El);
  };




}


