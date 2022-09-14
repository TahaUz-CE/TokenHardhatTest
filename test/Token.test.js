const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const { ethers } = require("hardhat");

describe("Token contract", function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("Token");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const token = await Token.deploy();

    await token.deployed();

    return { Token, token, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { token, owner } = await loadFixture(deployTokenFixture);

      expect(await token.owner()).to.equal(owner.address);
    });
  });

  describe("Buy/Sell", function () {
    it("User1 Buy", async function () {
      const { token, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );
      console.log("********************* USER1 BUY *********************");
      await token.transfer(addr1.address, 100);
      await token.connect(addr1).balanceOf(addr1.address);
      console.log("******************************************");
    });
    it("User1 Transfer to User2", async function () {
      const { token, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );
      console.log(
        "********************* User1 Transfer to User2 *********************"
      );
      await token.transfer(addr1.address, 100);
      await token.connect(addr1).approve(addr1.address, 100);
      await token.connect(addr1).transferFrom(addr1.address, addr2.address, 40);
      await token.connect(addr1).balanceOf(addr1.address);
      await token.connect(addr2).balanceOf(addr2.address);
      console.log("******************************************");
    });
    it("User1 Transfer to User2 but allowance too low", async function () {
      const { token, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );
      console.log(
        "********************* User1 Transfer to User2 but allowance too low *********************"
      );
      await token.transfer(addr1.address, 200);
      await token.connect(addr1).approve(addr1.address, 100);

      await expect(
        token.connect(addr1).transferFrom(addr1.address, addr2.address, 120)
      ).to.be.revertedWith("allowance too low");
      console.log("******************************************");
    });
    it("User1 Transfer to User2 but not enough value", async function () {
      const { token, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );
      console.log(
        "********************* User1 Transfer to User2 but not enough value *********************"
      );
      await token.transfer(addr1.address, 100);
      await token.connect(addr1).approve(addr1.address, 100);

      await expect(
        token.connect(addr1).transferFrom(addr1.address, addr2.address, 120)
      ).to.be.revertedWith("balance too low");
      console.log("******************************************");
    });
  });
});
