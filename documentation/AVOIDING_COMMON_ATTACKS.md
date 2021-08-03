# Avoiding common attacks.

   List of known and frequently used attacks.

 - Self destruct.
 - DelegateCall.
 - Re-Entrancy.
 - Overflow/underflow.
 - Accessing Private Data.
 - Source of randomness.
 - Denial-Of-Service.
 - Phising => tx.origin.
 - Front running.
 - Block TimeStamp manipulation by miners.
 - Signature Replay.

 ## Measures we took against possible vulnerabilities.

   1. We avoid Reentrancy by using the last version of solidity compiler 0.8.0 ✅
   2. We overcame the potential issue of overFlow and underFlow by using the OpenZeppelin library Counters to increment our indexes. ✅
```
import "@openzeppelin/contracts/utils/Counters.sol";

contract TokenERC721 is ERC721URIStorage {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter private _offerIds;

  mapping(uint256 => uint256) prices;
  mapping(string => uint8) hashes;
  mapping(address => uint256) public ethBalance; 
  mapping(uint256 => uint256) public tokenPrice;
  
  constructor() ERC721("DigiboxToken", "DGBT") {}

  receive() external payable {}

  function setPrice(uint256 price) public returns (uint256) {
    _offerIds.increment();
    uint256 newOfferId = _offerIds.current();
    prices[newOfferId] = price;

    return newOfferId;
  } 
  ```


 ## Unecessary measures for this project.

   1. Self-destruct 🟩
   2. DelegateCall 🟥
   3. Accessing private data 🟥
   4. Phising => tx.origin 🟥
   5. Front running 🟥
   6. Block TimeStamp manipulation by miners 🟥
   7. Signature Replay 🟥
   8. Denial-of-service 🟩

   ### Legend

   ✅ => Has been worked on
   🟩 => To be studied if launched on mainnet.
   🟥 => Not to be worried about in our this project.
   
 

 