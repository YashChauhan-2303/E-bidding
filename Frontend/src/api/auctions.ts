import api from './client';

export interface Auction {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  condition: string;
  startingBid: number;
  currentBid: number;
  reservePrice: number;
  buyNowPrice?: number;
  startTime: string;
  endTime: string;
  status: 'draft' | 'active' | 'ended' | 'cancelled';
  seller: {
    _id: string;
    fullName: string;
    email: string;
  };
  bids: Array<{
    bidder: string;
    amount: number;
    timestamp: string;
  }>;
  winner?: string;
  watchers: string[];
  featured: boolean;
  createdAt: string;
}

export interface CreateAuctionData {
  title: string;
  description: string;
  category: string;
  condition: string;
  startingBid: number;
  reservePrice?: number;
  buyNowPrice?: number;
  endTime: string;
  images?: string[];
}

export interface PlaceBidData {
  amount: number;
}

// Auction API calls
export const auctionAPI = {
  // Get all auctions
  getAuctions: async (): Promise<{ success: boolean; count: number; data: Auction[] }> => {
    const response = await api.get('/auctions');
    return response.data;
  },

  // Get single auction
  getAuction: async (id: string): Promise<{ success: boolean; data: Auction }> => {
    const response = await api.get(`/auctions/${id}`);
    return response.data;
  },

  // Create auction
  createAuction: async (data: CreateAuctionData): Promise<{ success: boolean; data: Auction }> => {
    const response = await api.post('/auctions', data);
    return response.data;
  },

  // Update auction
  updateAuction: async (id: string, data: Partial<CreateAuctionData>): Promise<{ success: boolean; data: Auction }> => {
    const response = await api.put(`/auctions/${id}`, data);
    return response.data;
  },

  // Delete auction
  deleteAuction: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete(`/auctions/${id}`);
    return response.data;
  },

  // Place bid
  placeBid: async (id: string, data: PlaceBidData): Promise<{ success: boolean; data: Auction }> => {
    const response = await api.post(`/auctions/${id}/bid`, data);
    return response.data;
  }
};