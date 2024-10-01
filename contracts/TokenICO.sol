// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import interfaces from erc 20 token contract

interface ERC20 {
    // function to transfer tokens
    function transfer(address recipient, uint256 amount) external returns (bool);

    // function to get the balance of tokens
    function balanceOf(address account) external view returns (uint256);

    // function for allowance to allow other address to spend tokens
    function allowance(address owner, address spender) external view returns (uint256);

    // function to approve for allowance
    function approve(address spender, uint256 amount) external returns (bool);

    // funcrion to traansferFrom
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    // funcrion to get symbol
    function symbol() external view returns (string memory);

    // function to get total supply
    function totalSupply() external view returns (uint256);

    // function to get decimals
    function name() external view returns (string memory);
}

// token ICO contract

contract TokenICO {
    // address of the ERC20 token contract
    address public owner;

    // address of the ERC20 token contract
    address public tokenAddress;

    // token price
    uint256 public tokenSalePrice;

    // total tokens sold
    uint256 public soldTokens;

    // modifier to check if the caller is the owner

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        // _; is a placeholder for the code to be executed
        _;
    }

    // constructor to set the owner and token address
    constructor() {
        owner = msg.sender;
    }

    // function to update token
    function updateToken(address _tokenAddress) public onlyOwner {
        tokenAddress = _tokenAddress;
    }

    // function to update token price
    function updateTokenPrice(uint256 _tokenSalePrice) public onlyOwner {
        tokenSalePrice = _tokenSalePrice;
    
    }

    //  function to multiply token
    function multiplyToken(uint256 x, uint256 y) internal pure returns (uint256 z) {
    // Ensure that if y is not zero, the result of x * y divided by y equals x.
    // This checks for overflow in multiplication.
    require(y == 0 || (z = x * y) / y == x, "Multiplication overflow");
    }
   

    // function to buy tokens
    function buyTokens(uint256 _tokenAmount) public payable {
        // check if the ether amount is sufficient
        require(msg.value == multiplyToken(_tokenAmount, tokenSalePrice), "Insufficient Ether Provided for the token purchase");

        // get the token contract
        ERC20 token = ERC20(tokenAddress);

        // check if the token amount is sufficient
        require(_tokenAmount <= token.balanceOf(address(this)), "Not enough token left for sale");

        // transfer the tokens to the buyer
        require(token.transfer(msg.sender, _tokenAmount * 1e18));

        // transfer the ether to  owner
        payable(owner).transfer(msg.value);

        // update the sold tokens
        soldTokens += _tokenAmount;
    }
        
    

    // function to get token details
    function getTokenDetails() public view returns (string memory name, string memory symbol, uint256 balance, uint256 supply, uint256 tokenPrice) {
        // get the token contract
        ERC20 token = ERC20(tokenAddress);
        // return the token details
        return (token.name(), token.symbol(), token.balanceOf(address(this)), token.totalSupply(), tokenSalePrice);
    }

    // function to transfer to owner this is using for receiving donations
    function transferToOwner(uint256 _amount) external payable  {
        require(msg.value >= 0, "Insufficient funds sent");
        
        // transfer the ether to owner 
        (bool success, ) = payable(owner).call{value: _amount}("");
        require(success, "Transfer failed");
    }

    // function to transfer ether
    function transferEther(address payable _to, uint256 _amount) external payable {
        require(msg.value >= _amount, "Insufficient funds sent");

        // transfer the ether to the address
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Transfer failed");
    }

    // function to withdraw all tokens
    function withdrawAllTokens() public onlyOwner {
        // get the token contract
        ERC20 token = ERC20(tokenAddress);

        // get the balance of tokens
        uint256 balance = token.balanceOf(address(this));

        // transfer the tokens to the owner
        require(balance > 0, "No tokens to withdraw");

        require(token.transfer(owner, balance), "Withdrawal failed");
    }

    

    
    
    

    
        

}
