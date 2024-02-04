// https://api.opensea.io/api/v2/collection/{collection name}/nfts?limit=5
const getNFTsByCollectionURL = "https://api.opensea.io/api/v2/collection/";
const NFTsLimit = 5;

// https://api.opensea.io/api/v2/chain/{chain}/contract/{address}/nfts/{identifier}
const getNFTByContractURL = "https://api.opensea.io/api/v2/chain/";

// https://api.opensea.io/api/v2/listings/collection/{collection_slug}/nfts/{identifier}/best
const getPriceOfNFTURL = "https://api.opensea.io/api/v2/offers/collection/";


// Elements
const nftCollectionRankingEl = document.getElementById("nft");
const walletEl = document.getElementById("wallet");
const nft1 = document.getElementById("nft-1");
const nft2 = document.getElementById("nft-2");
const nft3 = document.getElementById("nft-3");
const totalNFTsAssetsEl = document.getElementById("total-nfts");
const totalCoinsAssetsEl = document.getElementById("total-coins");

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

  // saveCoin
  saveCoins : function() {
    try {
      localStorage.setItem('Coins', JSON.stringify(this.coins));
      return true;
    } catch(e) {
      return false;
    }; 
  },

  // sell Coin
  sellCoin : function(symbol, quantity) {

    // get index of coin
    var index = -1;
    if (this.coins.length > 0) {
      for (let i = 0; i < this.coins.length; i++) {
        const element = this.coins[i];
        if (element.symbol === symbol) {
          index = i;
        }
      };
    };
    
    if (index > 0) {
      if (quantity < this.coins[index].quantity) {
        this.coins[index].quantity = this.coins[index].quantity - quantity;
        this.saveCoins() ;
        return true;
      } else {
        this.removeCoin(symbol);
      }
    }
    
  },

  // removeCoin
  removeCoin : function(symbol) {
    // get index of coin
    var index = -1;
    if (this.coins.length > 0) {
      for (let i = 0; i < this.coins.length; i++) {
        const element = this.coins[i];
        if (element.symbol === symbol) {
          index = i;
        }
      };
    };

    if (index < 0) {
      return true;
    } else {
      this.coins.splice(index, 1);
    }

    // save to localStorage
    this.saveCoins();
  },

  //loadCoins
  loadCoins : function() {
    if (localStorage.getItem("Coins") != null) {
      //  get string from Coins in localStorage and transform back to array of objects.
      this.coins = JSON.parse(localStorage.getItem("Coins"));           
  };
  return this.NFTs;
  },

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

  // saveNFT gets NFT and save NFT to NFTs in localStorage after transform to string. return false/true if it failed/success to save to localStorage
  saveNFT : function(nft) {
    
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

  // clearAll clears the array coins and coins in localStorage
  clearAllCoins : function() {
    if (this.coins.length != 0) {
        this.coins.length = 0;
    };
    localStorage.removeItem("Coins");
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
    })
    .catch(err => console.error(err));
};

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
};

//
function renderPrice(el, collection, id) {
  const options = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': '0c9e93e867e640e081971469d0447097'}};
  var url = getPriceOfNFTURL + collection + "/nfts/" + id + "/best";

  fetch(url, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
  
    // return price data to global variable currentNFTPrice
    if (typeof data.price != "undefined") {
      el.textContent = data.price.value/Math.pow(10, data.price.decimals) + "\u00A0" + data.price.currency; // Render price with non-breaking space
      
      if (totalNFTsAssetsEl) {
        nftTotalAssets = nftTotalAssets + data.price.value/Math.pow(10, data.price.decimals);
        totalNFTsAssetsEl.textContent = parseFloat(nftTotalAssets).toFixed(2) + " " + data.price.currency;              
      };
      
    } else {
      el.textContent = "";
    }
    
  })
  .catch(err => console.error(err));
  
};

// render top 3 collections ranking by volume in 1 day
function renderTop3CollectionRankingByVolumeIn1Day() {
  const options = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': '8yip240fXaUqPUn0qC3nbewQ'}};
  var url = 'https://restapi.nftscan.com/api/v2/statistics/ranking/collection?sort_field=volume_1d&sort_direction=desc&limit=3';

  fetch(url, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    
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
      // console.log(element.contract_name);
      section2El.appendChild(h32El);
      collectionEl.appendChild(section2El);

      // horizontal rule below collection name
      var sectionHrEl = document.createElement('section');
      var hrEl = document.createElement('hr');
      hrEl.classList = 'mt-[1vw]';
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
  var contract = el.getAttribute("data-contract");
  const options = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': '0c9e93e867e640e081971469d0447097'}};
  var url = 'https://api.opensea.io/api/v2/chain/ethereum/contract/' + contract + "/nfts?limit=" + 10;

  fetch(url, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // render 10 NFTs
    var nftRowsContainer = document.createElement('section'); // container for both rows
    nftRowsContainer.classList = 'container flex flex-row justify-between mt-[1vw] mb-[2vw] gap-4';

    for (let index = 0; index < data.nfts.length; index++) {
      const element = data.nfts[index];
      var nftEl = document.createElement('section');
      var nftImgContainer = document.createElement('section'); // container for first row

      nftEl.classList = 'flex';
      nftEl.setAttribute("data-contract", element.contract);
      nftEl.setAttribute("data-identifier", element.identifier);
      nftEl.setAttribute("data-token_standard", element.token_standard);
      nftEl.setAttribute("data-collection", element.collection);
      nftEl.setAttribute("data-name", element.name);
      nftEl.setAttribute("data-image_url", element.image_url);

      var imgEl = document.createElement('img');
      imgEl.src = element.image_url;
      imgEl.classList = "rounded-lg w-[20vw] mb-[1vw]";
      nftImgContainer.appendChild(imgEl);
      nftEl.appendChild(nftImgContainer);
      nftRowsContainer.appendChild(nftEl);

      var nftTitleEl = document.createElement('h3');
      nftTitleEl.classList = "font-bold text-lg"
      nftTitleEl.textContent = " #" + element.identifier;
      nftImgContainer.appendChild(nftTitleEl);
      nftEl.appendChild(nftImgContainer);

      var nftPriceEl = document.createElement('section');
      nftPriceEl.classList = "text-md"
      renderPrice(nftPriceEl, element.collection, element.identifier);
      nftImgContainer.appendChild(nftPriceEl);
      nftEl.appendChild(nftImgContainer);

      var buttonEl = document.createElement('button');
      buttonEl.classList = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-[1vw]'
      buttonEl.textContent = 'Add To Wallet';
      nftImgContainer.appendChild(buttonEl);
      nftEl.appendChild(nftImgContainer);

      // Create a new row after rendering 5 NFTs
      if ((index + 1) % 5 === 0) {
        el.appendChild(nftRowsContainer);
        nftRowsContainer = document.createElement('section'); // container for second row
        nftRowsContainer.classList = 'container flex flex-row justify-between mb-[2vw] gap-4';
      }

      // Append any remaining NFTs in the last row
      el.appendChild(nftRowsContainer);
    };
  });
};

// renderNFTwallet render the list of NFT from the object wallet.
function renderNFTwallet() {
  // get NFT wallet El
  var nftWalletEl = walletEl.lastElementChild.lastElementChild;
  
  // reset total assets to recalculate it.
  nftTotalAssets = 0;

  // reset HTML Element
  nftWalletEl.innerHTML = "";

  function formatCollectionName(name) {
    let words = name.split('-');
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ');
  };

  if (wallet.NFTs.length === 0) {
    totalNFTsAssetsEl.textContent = "0";

    // display "Your NFT wallet is empty..."
    var nftEl = document.createElement('section');
    nftEl.classList = 'container flex';
    nftWalletEl.appendChild(nftEl);

    var h3El = document.createElement('h3');
    h3El.innerHTML = 'Your NFT wallet is empty - <a href="nft.html" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Explore NFT\'s</a> to find NFT\'s to add to your wallet. ';
    nftEl.appendChild(h3El);

    return;
  };

  var nfts = wallet.loadNFTs();
  var length = nfts.length;

  for (let index = 0; index < length; index++) {
    const element = nfts[index];
    var nftEl = document.createElement('section');

    nftEl.classList = 'container flex';
    nftEl.setAttribute("data-contract", element.contract);
    nftEl.setAttribute("data-identifier", element.identifier);
    nftEl.setAttribute("data-token_standard", element.token_standard);
    nftWalletEl.appendChild(nftEl);

    //
    var section3El = document.createElement('section');
    var imgEl = document.createElement('img');
    section3El.classList = 'container flex mr-[2vw] my-[1vw]';
    imgEl.src = element.image_url;
    imgEl.style.width = "300px";
    imgEl.classList = 'rounded';
    section3El.style.width = imgEl.style.width;
    section3El.appendChild(imgEl);
    nftEl.appendChild(section3El);

    //
    var section1El = document.createElement('section');
    var h31El = document.createElement('h3');
    section1El.classList = 'container flex items-center text-lg font-bold mr-[2vw]';
    h31El.textContent = formatCollectionName(element.collection) + " #" + element.identifier;
    section1El.appendChild(h31El);
    nftEl.appendChild(section1El);

    //
    var section2El = document.createElement('section');
    var h32El = document.createElement('h3');
    section2El.classList = 'container flex items-center text-md mr-[2vw]';
    renderPrice(h32El, element.collection, element.identifier);
    section2El.appendChild(h32El);
    nftEl.appendChild(section2El);

    // Add to wallet button
    var section4El = document.createElement('section');
    section4El.classList = 'container flex items-center justify-end';
    var buttonEl = document.createElement('button');
    buttonEl.classList = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[200px] h-[5vh]'
    buttonEl.innerHTML = 'Remove&nbsp;From&nbsp;Wallet';
    section4El.appendChild(buttonEl);
    nftEl.appendChild(section4El);
  };
};