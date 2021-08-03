# Design Pattern

  In this doc we will explain the main decisions we took about our code.
  We decided to follow the Solidity pattern link to check all patterns. See link here: https://fravoll.github.io/solidity-patterns/

## Behavioral Pattern.
 - Guard check : We make sure that the buyer, will receive his NFT after buying it. 
      ``` 
      _mint(msg.sender, newItemId);
      ```
      We want our NFT to be able to be offered. So Alice, can offer the NFT purchased from our marketPlace to Bob. We just need to be aware of the NFT ID, when it is sent back. 
 - State Machine : 
 - Oracle : We collect data from the users and the offers directly in our data base. We do not have the necesity to use an Oracle.
 - Randomness : We have no need for random data in our Dapp.

 ## Security patterns.
 - Acces restrictions : We will not restrict access to users or sellers on our plateform. Each user will be able to access his or her page. The only difference will be in his profil page. Indeed, we will display his/her NFTs or NFTs that the seller has sold. Also, we will give a remainder, if a user tries to purchase a NFT but his MetaMask is not connected.
 - Checks Effects Interactions :  The main danger here are Reentrancies, we solve this by using the last version of solidity compiler 0.8.0.
 - Secure Ether transfers : We are using the safest sending method known. The .call method to transfer Eth. Using this method allows attackers to exploit Reentrancy. But we are aware of it and took the necessary steps to avoid it.
      ``` 
      (bool success, ) = msg.sender.call{value: tokenPrice[tokenId]}("");
      require(success, "Failed to send Ether");
      ``` 
 - Pull over Push : We are using this method, only difference is that we do not have a "WhiteList". Indeed, each user and/or seller has the possibility to use the function reimbursement. The function reimbursement allows him/her to withdraw the funds that he owns on the smart contract. So instead of sending the transaction directly to the balanceOwner we wait for him to call the function reimburse. This avoids a lot of issues regarding using loops to transfer funds for example.
      ``` 
        function reimbursement(uint256 tokenId) external{
            require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
            ethBalance[from] -= tokenPrice[tokenId];
            _burn(tokenId);

            (bool success, ) = msg.sender.call{value: tokenPrice[tokenId]}("");
            require(success, "Failed to send Ether");
          }
      ``` 
 - Emergency stop : We do not have an emergency stop in our contract. //Check if we can implement.

 ## Upgradeability Patterns.
 - Proxy Delegate : We did not implement this pattern in our Dapp. WHY ? We are not using delegate calls.
 - Eternal Storage : Our contract is not upgradeable.

 ## Economic Patterns
 - String Equality Comparison : We do not need this pattern. WHY ? We do not need to check if stringA === stringB.
 - Tight Variable Packing : HERE WE NEED TO FINALIZE ALL CODE of smart contract TO SHOW CODE OPTIMIZATION.
 - Memory Array : We have made the choice to export large/heavy datas to IPFS or to our local servers in order to save on gas consumption.
 Indeed we save PDF's on external decentralize servers. Indeed our Dapp has very few functions, and efficient ones cost related.
