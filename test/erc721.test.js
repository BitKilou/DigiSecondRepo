const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers')
const { expect } = require('chai')
const ERC721 = artifacts.require('TokenERC721')

contract('ERC721', (accounts) => {
  const [owner, recipient] = accounts

  beforeEach(async() => {
    erc721Instance = await ERC721.new({from: owner})
  })

  it("deploys the smart contract", async () => {
     expect(erc721Instance.address).to.not.equal('')
  })

  describe('setPrice', function() {

    it('registers a new offer id with its price, and increments offer id', async function () {
        const oldId = await erc721Instance.getOfferId()
        await erc721Instance.setPrice(1)
        const price = await erc721Instance.getPrice(oldId)
        const newId = await erc721Instance.getOfferId()

        expect(price).to.be.bignumber.equal(new BN(1))
        expect(newId.toNumber() - oldId.toNumber()).to.equal(1)
    })

    it('sends an event after setting an offer', async function () {
      expectEvent(await erc721Instance.setPrice(1, {from: owner}), 'priceIsSet', {price: new BN(1), offerId: new BN(0), From: owner})
    })
  })

  describe('awardItem', function() {

    beforeEach(async function () {
      imageHash = 'Qme4hTevbPuqu6JBFhSpriVSAmZdvqGQyJsJtJuZgkJH3y'
      metadataHash = 'QmPVAD7SuF8PgR4TW6nK2eV3Z2eVdVn6oyhUUNZCB1mPAP'
      await erc721Instance.setPrice(2)
      await erc721Instance.awardItem(0, imageHash, metadataHash, {from: owner, value: 2})
    })

    it('reverts if the value is smaller than the offer’s price', async function () {
      await expectRevert(erc721Instance.awardItem(0, imageHash, metadataHash, {from: owner, value: 1}), 'Send the minimum amount required');
    })

    it('registers a new token id, and increments token id', async function () {
      const oldId = await erc721Instance.getTokenId()
      await erc721Instance.awardItem(0, imageHash, metadataHash, {from: owner, value: 2})
      const newId = await erc721Instance.getTokenId()

      expect(newId.toNumber() - oldId.toNumber()).to.equal(1)
    })

    it('associates the token id to the caller Address', async function () {
      const ownerOf = await erc721Instance.ownerOf(0)
      const balanceOf = await erc721Instance.balanceOf(owner)

      expect(ownerOf).to.equal(owner)
      expect(balanceOf).to.be.bignumber.equal(new BN(1))
    })

    it('associates the token id to the metadata hash', async function () {
      const tokenURI = await erc721Instance.tokenURI(0)
      
      expect(tokenURI).to.equal(metadataHash)
    })

    it('registers the value to the caller’s ethBalance', async function () {
      const ethBalance = await erc721Instance.getEthBalance(owner)

      expect(ethBalance).to.be.bignumber.equal(new BN(2))
    })

    it('associates the price to the token id', async function () {
      const tokenPrice = await erc721Instance.getTokenPrice(0)

      expect(tokenPrice).to.be.bignumber.equal(new BN(2))
    })

    it('sends a transfer event through _mint function', async function () {
      const tokenId = await erc721Instance.getTokenId()

      expectEvent(await erc721Instance.awardItem(0, imageHash, metadataHash, {from: owner, value: 2}), 'Transfer', {from: '0x0000000000000000000000000000000000000000', to: owner, tokenId: tokenId})
    })

    it('sends a mintedNFT event', async function () {
      const tokenId = await erc721Instance.getTokenId()

      expectEvent(await erc721Instance.awardItem(0, imageHash, metadataHash, {from: owner, value: 2}), 'mintedNFT', {Buyer: owner, Hash: imageHash, Metadata: metadataHash, IdOfOffer: new BN(0), value: new BN(2)})
    })
  })

  describe('transferFrom', function() {

    beforeEach(async function () {
      imageHash = 'Qme4hTevbPuqu6JBFhSpriVSAmZdvqGQyJsJtJuZgkJH3y'
      metadataHash = 'QmPVAD7SuF8PgR4TW6nK2eV3Z2eVdVn6oyhUUNZCB1mPAP'
      await erc721Instance.setPrice(2)
      await erc721Instance.awardItem(0, imageHash, metadataHash, {from: owner, value: 2})
    })

    it('reverts if not owner of the token', async function () {
      await expectRevert(erc721Instance.transferFrom(owner, recipient, 0, {from: recipient}), "ERC721: transfer caller is not owner nor approved")
    })

    it('transfers from one owner to another and updates their balances', async function () {
      await erc721Instance.transferFrom(owner, recipient, 0, {from: owner})
      const ownerOf = await erc721Instance.ownerOf(0)
      const balanceOfOwner = await erc721Instance.balanceOf(owner)
      const balanceOfRecipient = await erc721Instance.balanceOf(recipient)
      const ethBalanceOfOwner = await erc721Instance.ethBalance(owner)
      const ethBalanceOfRecipient = await erc721Instance.ethBalance(recipient)

      expect(ownerOf).to.equal(recipient)
      expect(balanceOfOwner).to.be.bignumber.equal(new BN(0))
      expect(balanceOfRecipient).to.be.bignumber.equal(new BN(1))
      expect(ethBalanceOfOwner).to.be.bignumber.equal(new BN(0))
      expect(ethBalanceOfRecipient).to.be.bignumber.equal(new BN(2))
    })

    it('TODO sends a transfer event through _transfer function', async function () {
    })

    it('TODO sends a transferedNFT event', async function () {
    })
  })

  describe('reimbursement', function() {
  })

  // function transferFrom(address from, address to, uint256 tokenId ) public virtual override {
  //   require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
  //   _transfer(from, to, tokenId);
    
  //   ethBalance[from] -= tokenPrice[tokenId];
  //   ethBalance[to] += tokenPrice[tokenId];
  //   emit transferedNFT(msg.sender, to, tokenId);

  //function reimbursement

  // it("Should verify that caller is reimbursed", async function() {
  //      const price = new BN(10)
  //      let oldBalanceEth = await erc721Instance.getEthBalance(sender)
  //      const upDatedBal = await erc721Instance.reimbursement(price)
  //      expect(oldBalanceEth.add(price) == upDatedBal)
  //      expectEvent(await this.erc721Instance.reimbursed(sender, receiver), "reimbursed")
  // })

})
