// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title A NFT MarketPlace, buying and selling.
/// @author Nicolas Fruneau, Kilian Mongey.
/// @notice This contract is open source, you are more then welcomed to copy functions as you please.
/// @dev We purposely put many data Off-Chain, trying to keep our smart contract as gas efficient as possible.
/// NOTE : This smart contract hasn't been audited. Please, DYOR before launching. 

/// @dev We will implement the following libraries in our SC.

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TokenERC721 is ERC721URIStorage { 

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _offerIds;

    mapping(uint256 => uint256) prices;
    mapping(string => uint8) hashes;
    mapping(address => uint256) public ethBalance; 
    mapping(uint256 => uint256) public tokenPrice;

    event priceIsSet(uint256 price, uint256 offerId, address From);
    event mintedNFT(address Buyer, string Hash, string Metadata, uint256 IdOfOffer, uint256 value);
    event transferedNFT(address From, address To, uint256 tokenId);
    event reimbursed(address From, uint256 amount);

    constructor() ERC721("DigiboxToken", "DGBT") {}

    /** @notice Sets the price of the NFT, inputed by the seller.
     * @dev We use the OZ lib to increment Id's in order to avoid overFlows
     * @param price We then set the price to the following Id of the NFT
     * @dev By placing an event here, we will be able to display it on our front-end
     */
    function setPrice(uint256 price) public {
        uint256 newOfferId = _offerIds.current();
        prices[newOfferId] = price;
        _offerIds.increment();
        emit priceIsSet(price, newOfferId, msg.sender);
    }
     
     /** @notice Minting and attributing the NFT to the buyer.
      * @dev Firstly we require that the value sent is higher then the value asked by the seller
      * then, using the _mint function from OZ lib we create the NFT and send it to the function caller.
      * UpDate the ether balance of the buyer
      * @param offerId We want to be able to track the offers created. 
      * @param hash Identifier of the image of the NFT on IPFS
      * @param metadata Metdata Identifier of the NFT on IPFS
      * @dev We also want to be able to display in our front a few event, so we added this mintedNFT event
      * @return We return the item's unique Id
      */

    function awardItem(uint256 offerId, string memory hash, string memory metadata) public payable returns (uint256) {
        require(msg.value >= prices[offerId], "Send the minimum amount required");  
        // require(hashes[hash] != 1); // not available yet, need PDF implementation in nodejs
        hashes[hash] = 1;

        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadata);

        ethBalance[msg.sender] += msg.value;
        tokenPrice[newItemId] = prices[offerId];

        emit mintedNFT(msg.sender, hash, metadata, offerId, msg.value);

        _tokenIds.increment();
        
        return newItemId;
    }

    /** @notice This function is used to transfer NFTs, this function 
     * will be used to send to the seller, or send the NFT as a gift 
     * @dev We back this function using OZ ERC721 lib
     * using the lib, we require that the token owner is the caller of this function
     * We then proceed to the transfer 
     * @param from The msg.sender
     * @param to The receiver 
     * @param tokenId We make sure that the tokenID is inputed as a param by the caller to avoid problems
     * @dev By emitting these events we are able to display a msg in our front
     * Finally, we reset the balances of the owner and the receiver.
     */

    function transferFrom(address from, address to, uint256 tokenId ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _transfer(from, to, tokenId);
        
        ethBalance[from] -= tokenPrice[tokenId];
        ethBalance[to] += tokenPrice[tokenId];
        emit transferedNFT(msg.sender, to, tokenId);
    }
     
    /** @notice This function is our "pay" function, indeed we decided to go with a pull over push function
     * Firstly for security reasons, it also allows the user that purchased 
     * the NFT to call this function and to get reimbursed, so everybody win's :)
     * @dev As in our previous function we use the OZ lib to back-up our contract
     * We then require that the caller is the owner of the tokenId 
     * then the balance of the caller is updated.
     * the token is then burned(using OZ lib)
     * then => proceed to the payment, the caller will receive his funds by calling the function
     * Emitting this event will allow the front to send a confirmation/Fail messsage
     * @param tokenId We need to know the tokenId to proceed
     */

    function reimbursement(uint256 tokenId) external payable {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        ethBalance[msg.sender] -= tokenPrice[tokenId];
        _burn(tokenId);

        (bool sent, ) = msg.sender.call{value: tokenPrice[tokenId]}("");
        require(sent, "Failed to withdraw");

        emit reimbursed(msg.sender, tokenPrice[tokenId]);
    }

    /// @dev fallback function
    receive() external payable {}

    /** @notice these are our getter functions
     * @dev for tests && front-end display
     */
    function getOfferId() public view returns(uint256) {
        return _offerIds.current();
    }

    function getTokenId() public view returns(uint256) {
        return _tokenIds.current();
    }

    function getEthBalance(address _address) public view returns(uint256) {
        return ethBalance[_address];
    }

    function balanceContract() view public returns (uint256) {
        return address(this).balance;
    }
}
