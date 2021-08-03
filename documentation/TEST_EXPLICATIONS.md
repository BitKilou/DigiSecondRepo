# Explanation of tests that have been made.

## ERC721 Contract 

  ### In this contract we had in total 4 functions to test. 

  #### Function setPrice 
     1. Check that inputted price by the seller is the outputted price;
     2. Checks that _offersId increments properly;
     3. Checks that the event 'priceIsSet' is triggered;

   ```
     it("Testing setPrice", async function() {
        const oldId = await erc721Instance.getOfferId()
        expectEvent(await erc721Instance.setPrice(1), 'priceIsSet')
        const newId = await erc721Instance.getOfferId()
        // Testing that the id increments
        expect(newId.toNumber() - oldId.toNumber()).to.equal(1);
     });
   ```

Basicly, we make sure the price inputted by the seller is the correct output.

  #### Function awardItem
    1. Checks that the amount asked for the token is inputted, otherwise function will not go through
    2. Check that the token is minted correctly and that msg.sender received it properly
    3. Check if the ETH balance is updated correctly 
    4. Checks that the event 'mintedNFT' is triggered

  ```

  ```

In a few words, we need to make sure that msg.sender receives his NFT once paid for.

  #### Function transferFrom 
    1. Checking if caller is the owner of the token, otherwise function doesn't continue
    2. We then check if the OZ _transfer function happens correctly 
    3. Check if the balance of the sellers and buyers is correctly updated
    4. Checks that the event 'transferedNFT' is triggered

  ```

  ```

  Basicly, we make sure the transfer happened properly

#### Function reimbursement
    1. Checks that the caller is the owner of the token
    2. Check that the ethBalance of the caller is deduced correctly 
    3. Check that the token is properly burnt
    4. Check that the caller has received the eth they are entitled
    5. Checks that the event 'reimbursed' is triggered
 
  ```

  ```

Crucial function to make sure you can be reimbursed or that seller can be paid.  