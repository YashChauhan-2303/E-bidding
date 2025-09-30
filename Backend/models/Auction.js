const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
  bidder: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const AuctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  images: [{
    type: String
  }],
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Electronics',
      'Fashion',
      'Home & Garden',
      'Sports',
      'Books',
      'Art & Collectibles',
      'Automotive',
      'Other'
    ]
  },
  condition: {
    type: String,
    required: [true, 'Please add item condition'],
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor']
  },
  startingBid: {
    type: Number,
    required: [true, 'Please add a starting bid'],
    min: [0.01, 'Starting bid must be at least $0.01']
  },
  currentBid: {
    type: Number,
    default: function() {
      return this.startingBid;
    }
  },
  reservePrice: {
    type: Number,
    default: 0
  },
  buyNowPrice: {
    type: Number,
    default: null
  },
  startTime: {
    type: Date,
    required: [true, 'Please add start time'],
    default: Date.now
  },
  endTime: {
    type: Date,
    required: [true, 'Please add end time']
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'ended', 'cancelled'],
    default: 'active'
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  bids: [BidSchema],
  winner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null
  },
  watchers: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for search functionality
AuctionSchema.index({ title: 'text', description: 'text' });

// Virtual for time remaining
AuctionSchema.virtual('timeRemaining').get(function() {
  if (this.status !== 'active') return 0;
  const now = new Date();
  const timeLeft = this.endTime - now;
  return Math.max(0, timeLeft);
});

// Virtual for total bids
AuctionSchema.virtual('totalBids').get(function() {
  return this.bids.length;
});

// Pre-save middleware to update status based on time
AuctionSchema.pre('save', function(next) {
  const now = new Date();
  
  if (this.endTime <= now && this.status === 'active') {
    this.status = 'ended';
    
    // Set winner to highest bidder
    if (this.bids.length > 0) {
      const highestBid = this.bids.reduce((prev, current) => {
        return (prev.amount > current.amount) ? prev : current;
      });
      this.winner = highestBid.bidder;
    }
  }
  
  next();
});

module.exports = mongoose.model('Auction', AuctionSchema);