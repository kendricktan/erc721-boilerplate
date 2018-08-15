pragma solidity ^0.4.23;

import "./ERC721Token.sol";

contract MyERC721 is ERC721Token {
  address owner;

  constructor (string _name, string _symbol) public
    ERC721Token(_name, _symbol)
  {
    owner = msg.sender;
  }

  /**
  * Custom accessor to create a unique token
  */
  function mintUniqueTokenTo(
    address _to,
    uint256 _tokenId,
    string  _tokenURI
  ) public
  {
    require(msg.sender == owner);
    super._mint(_to, _tokenId);
    super._setTokenURI(_tokenId, _tokenURI);
  }
}