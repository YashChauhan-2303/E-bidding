const express = require('express');
const {
  getAuctions,
  getAuction,
  createAuction,
  updateAuction,
  deleteAuction,
  placeBid
} = require('../controllers/auctionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getAuctions)
  .post(protect, authorize('seller', 'admin'), createAuction);

router
  .route('/:id')
  .get(getAuction)
  .put(protect, updateAuction)
  .delete(protect, deleteAuction);

router
  .route('/:id/bid')
  .post(protect, authorize('buyer', 'admin'), placeBid);

module.exports = router;