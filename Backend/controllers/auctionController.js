const Auction = require('../models/Auction');

// @desc    Get all auctions
// @route   GET /api/auctions
// @access  Public
const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({ status: 'active' })
      .populate('seller', 'fullName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: auctions.length,
      data: auctions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single auction
// @route   GET /api/auctions/:id
// @access  Public
const getAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate('seller', 'fullName email')
      .populate('bids.bidder', 'fullName email');

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    res.json({
      success: true,
      data: auction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create auction
// @route   POST /api/auctions
// @access  Private/Seller
const createAuction = async (req, res) => {
  try {
    const auction = await Auction.create({
      ...req.body,
      seller: req.user.id
    });

    res.status(201).json({
      success: true,
      data: auction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update auction
// @route   PUT /api/auctions/:id
// @access  Private/Seller
const updateAuction = async (req, res) => {
  try {
    let auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Check if user is auction owner
    if (auction.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    auction = await Auction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: auction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete auction
// @route   DELETE /api/auctions/:id
// @access  Private/Seller
const deleteAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Check if user is auction owner
    if (auction.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await auction.deleteOne();

    res.json({
      success: true,
      message: 'Auction deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Place bid on auction
// @route   POST /api/auctions/:id/bid
// @access  Private/Buyer
const placeBid = async (req, res) => {
  try {
    const { amount } = req.body;
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    if (auction.status !== 'active') {
      return res.status(400).json({ message: 'Auction is not active' });
    }

    if (amount <= auction.currentBid) {
      return res.status(400).json({ message: 'Bid must be higher than current bid' });
    }

    auction.bids.push({
      bidder: req.user.id,
      amount,
      timestamp: new Date()
    });

    auction.currentBid = amount;
    await auction.save();

    res.json({
      success: true,
      data: auction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAuctions,
  getAuction,
  createAuction,
  updateAuction,
  deleteAuction,
  placeBid
};