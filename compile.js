const path = require('path')
const fs = require('fs')
const solc = require('solc')
const compiledPath = path.resolve(__dirname, 'compiled_contracts')

const resolveSol = (x) => {
  const contractsPath = path.resolve(__dirname, 'contracts', x)
  return fs.readFileSync(contractsPath, 'utf8')
}

const writeCompiled = (x, data) => {
  const f = path.resolve(compiledPath, x)
  fs.writeFileSync(f, data)
}

const input = {
  'AddressUtils.sol': resolveSol('AddressUtils.sol'),
  'ERC165.sol': resolveSol('ERC165.sol'),
  'ERC721.sol': resolveSol('ERC721.sol'),
  'ERC721Basic.sol': resolveSol('ERC721Basic.sol'),
  'ERC721BasicToken.sol': resolveSol('ERC721BasicToken.sol'),
  'ERC721Receiver.sol': resolveSol('ERC721Receiver.sol'),
  'ERC721Token.sol': resolveSol('ERC721Token.sol'),
  'MyERC721.sol': resolveSol('MyERC721.sol'),
  'SafeMath.sol': resolveSol('SafeMath.sol'),
  'SupportsInterfaceWithLookup.sol': resolveSol('SupportsInterfaceWithLookup.sol')
}

const compiled = solc.compile({ sources: input }, 1)

// Create folder if doesn't exist
if (!fs.existsSync(compiledPath)) {
  fs.mkdirSync(compiledPath)
}

const mainContract = compiled.contracts['MyERC721.sol:MyERC721']

// Write data
writeCompiled('abi.json', mainContract.interface)

module.exports = {
  abi: mainContract.interface,
  bytecode: mainContract.bytecode
}
