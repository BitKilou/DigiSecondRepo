const { BN, ether, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect, assert } = require('chai');
const ERC721 = artifacts.require('TokenERC721');

contract('ERC721', (accounts) => {
  const [owner, sender, receiver] = accounts;

  beforeEach(async() => {
    this.value = new BN(1);
    erc721Instance = await ERC721.new();
  });

  it("Should deploy our smart contract", async () => {
     assert(erc721Instance.address !== "");
  });

  /*it("reverts if price is less than 1 wei", async function() {
    const testPrice = await erc721Instance.setPrice(0);
    expectRevert( await erc721Instance.setPrice(testPrice),
    "Minimum price is 1 wei",
    );
  });*/

  //function setPrice

  it("Testing setPrice", async function() {
    const oldId = await erc721Instance.getOfferId()
    expectEvent(await erc721Instance.setPrice(1), 'priceIsSet')
    const newId = await erc721Instance.getOfferId()
    // Testing that the id increments
    expect(newId.toNumber() - oldId.toNumber()).to.equal(1);
  });

  // function awardItem 
  it("Should verify that _tokenIds increments", async function() {
    const oldId = await erc721Instance.getTokenId()
    expectEvent(await erc721Instance.awardItem(0, "efe", "ezfze"), 'mintedNFT')
    const newId = await erc721Instance.getTokenId()
    // Testing that the id increments
    expect(newId.toNumber() - oldId.toNumber()).to.equal(1);
  });

  //function awardItem 
  // it("Should verify that _tokenIds increments", async function() {
  //   const oldId = await erc721Instance.getTokenId()
  //   const receipt = await erc721Instance.awardItem(1, "efe", "ezfze")
  //   // expectEvent(, 'mintedNFT')
  //   const newId = await erc721Instance.getTokenId()

  //   // Balance greater than 0 if amount inputed in metamask
  //   const balance = await erc721Instance.getEthBalance("0xa5A5eb5d2F75aC8956530051CDC7D2fc630d2C02")
  //   assert(balance.toNumber() !== 0, "Balance should be different from 0")
  //   // Testing that the id increments
  //   expect(newId.toNumber() - oldId.toNumber()).to.equal(1);
  // });

  //function transferFrom
  // it("Should verify that transferFrom msg.sender to receiver", async function() {
  //      let balanceofSenderBefore = 1;
  //      let balanceOfReceiverBefore = 0;
  //      ///let tokenId = 0;
  //      const updatedBalance = await erc721Instance.transferFrom(sender, receiver, 1);
  //      let balanceofSenderAfter = balanceofSenderBefore.sub(1);
  //      let balanceOfReceiverAfter = balanceOfReceiverBefore.add(1);
  //      expect(balanceofSenderAfter == 0 && balanceOfReceiverAfter == 1);
  //      expectEvent(await erc721Instance.transferFrom(sender, receiver, tokenId), 'transferedNFT')
  // });

  //function reimbursement

  // it("Should verify that caller is reimbursed", async function() {
  //      const price = new BN(10);
  //      let oldBalanceEth = await erc721Instance.getEthBalance(sender);
  //      const upDatedBal = await erc721Instance.reimbursement(price);
  //      expect(oldBalanceEth.add(price) == upDatedBal);
  //      expectEvent(await this.erc721Instance.reimbursed(sender, receiver), "reimbursed");
  // });

});
