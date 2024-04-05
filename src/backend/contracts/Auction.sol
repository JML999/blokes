// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IERC721 {
    function transferFrom(address from, address to, uint256 nftId) external;
}

contract EnglishAuction {
    event Start();
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed bidder, uint amount);
    event End(address highestBidder, uint amount);

    IERC721 public immutable nft;
    uint public immutable nftId;

    address payable public immutable seller;
    uint32 public endTimestamp; // Renamed from endAuction to endTimestamp
    bool public hasStarted;
    bool public hasEnded;

    address public highestBidder;
    uint public highestBid;
    mapping(address => uint) public bids;

    constructor(address _nft, uint _nftId, uint _startingPrice) {
        nft = IERC721(_nft);
        nftId = _nftId;
        seller = payable(msg.sender);
        highestBid = _startingPrice;
    }

    function startAuction() external {
        require(msg.sender == seller, "Only the seller can start the auction.");
        require(!hasStarted, "The auction has already started.");
        hasStarted = true;
        endTimestamp = uint32(block.timestamp + 7 days); // Use 7 days for auction duration
        emit Start();
    }

    function bid() external payable {
        require(hasStarted, "The auction hasn't started.");
        require(block.timestamp < endTimestamp, "The auction has ended.");
        require(msg.value > highestBid, "There already is a higher bid.");

        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }

        highestBid = msg.value;
        highestBidder = msg.sender;
        emit Bid(msg.sender, msg.value);
    }

    function withdraw() external {
        uint bidAmount = bids[msg.sender];
        require(bidAmount > 0, "No bids to withdraw.");

        bids[msg.sender] = 0;
        payable(msg.sender).transfer(bidAmount);
        emit Withdraw(msg.sender, bidAmount);
    }

    function end() external { // Renamed from endAuction to end to avoid naming conflict
        require(hasStarted, "The auction hasn't started.");
        require(block.timestamp >= endTimestamp, "The auction hasn't ended yet.");
        require(!hasEnded, "The auction has already been ended.");

        hasEnded = true;
        if (highestBidder != address(0)) {
            nft.transferFrom(address(this), highestBidder, nftId);
            seller.transfer(highestBid);
        } else {
            nft.transferFrom(address(this), seller, nftId);
        }
        emit End(highestBidder, highestBid);
    }
}