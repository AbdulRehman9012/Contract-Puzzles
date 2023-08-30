const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const threshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;
var address;
describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    var wallet = ethers.Wallet.createRandom(); 
    var validAddress=false;
    var i=0;
      while (!validAddress) {
      wallet = ethers.Wallet.createRandom();
      address = await wallet.getAddress()
      i++;
      console.log(i);
      console.log(await wallet.getAddress());
      console.log(address < threshold);
      if(address < threshold)
       validAddress = true;
      }
      address = await wallet.getAddress()
    return { game, wallet };
  }
  it('should be a winner', async function () {
    const { game, wallet } = await loadFixture(deployContractAndSetVariables);

    // good luck
    Wallet = wallet.connect(ethers.provider)
    const signer = ethers.provider.getSigner(0)

    // send some ether(needed for gas fees on the upcoming function call)
    await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther('200')
    })
    await game.connect(Wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
