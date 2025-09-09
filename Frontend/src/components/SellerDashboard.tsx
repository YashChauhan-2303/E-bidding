
import React, { useState } from 'react';
import { Plus, Package, TrendingUp, Clock, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const SellerDashboard = () => {
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);

  const stats = [
    { label: 'Active Listings', value: '12', icon: Package },
    { label: 'Total Revenue', value: '$4,280', icon: TrendingUp },
    { label: 'Avg. Sale Price', value: '$356', icon: TrendingUp },
    { label: 'Success Rate', value: '87%', icon: TrendingUp },
  ];

  const myListings = [
    {
      id: 1,
      title: 'Vintage Camera Collection',
      currentBid: 850,
      startingBid: 200,
      bids: 23,
      timeLeft: '2d 14h',
      status: 'active',
      views: 456
    },
    {
      id: 2,
      title: 'Antique Pocket Watch',
      currentBid: 1200,
      startingBid: 300,
      bids: 34,
      timeLeft: '1d 8h',
      status: 'active',
      views: 789
    },
    {
      id: 3,
      title: 'Rare Book First Edition',
      currentBid: 0,
      startingBid: 150,
      bids: 0,
      timeLeft: '5d 2h',
      status: 'pending',
      views: 67
    },
    {
      id: 4,
      title: 'Art Deco Vase',
      finalPrice: 680,
      startingBid: 100,
      bids: 19,
      status: 'sold',
      views: 234
    },
  ];

  const ListingForm = () => (
    <form className="space-y-4">
      <div>
        <Label htmlFor="title">Item Title</Label>
        <Input id="title" placeholder="Enter item title" />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Describe your item in detail" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startingBid">Starting Bid ($)</Label>
          <Input id="startingBid" type="number" placeholder="100" />
        </div>
        <div>
          <Label htmlFor="reservePrice">Reserve Price ($)</Label>
          <Input id="reservePrice" type="number" placeholder="500" />
        </div>
      </div>
      <div>
        <Label htmlFor="duration">Auction Duration</Label>
        <select id="duration" className="w-full p-2 border rounded-md">
          <option value="3">3 days</option>
          <option value="5">5 days</option>
          <option value="7">7 days</option>
          <option value="10">10 days</option>
        </select>
      </div>
      <div>
        <Label htmlFor="images">Upload Images</Label>
        <Input id="images" type="file" multiple accept="image/*" />
      </div>
      <div className="flex space-x-4 pt-4">
        <Button type="submit" className="bid-button-primary flex-1">List Item</Button>
        <Button type="button" variant="outline" onClick={() => setIsListingModalOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-bid-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-bid-gray-800 mb-2">Seller Dashboard</h1>
            <p className="text-bid-gray-600">Manage your listings and track sales</p>
          </div>
          <Dialog open={isListingModalOpen} onOpenChange={setIsListingModalOpen}>
            <DialogTrigger asChild>
              <Button className="bid-button-primary">
                <Plus className="h-4 w-4 mr-2" />
                New Listing
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Auction Listing</DialogTitle>
              </DialogHeader>
              <ListingForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 bid-card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-bid-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-bid-gray-900">{stat.value}</p>
                  </div>
                  <div className="h-12 w-12 bg-bid-secondary bg-opacity-10 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-bid-secondary" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* My Listings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">My Listings</h3>
          <div className="space-y-4">
            {myListings.map((listing) => (
              <div key={listing.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">{listing.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-bid-gray-600">
                      <span>Starting: ${listing.startingBid}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {listing.views} views
                      </span>
                      <span>•</span>
                      <span>{listing.bids} bids</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge 
                        variant={
                          listing.status === 'active' ? 'default' : 
                          listing.status === 'sold' ? 'secondary' : 'outline'
                        }
                      >
                        {listing.status}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-bid-primary">
                      {listing.status === 'sold' 
                        ? `Sold: $${listing.finalPrice}` 
                        : listing.currentBid > 0 
                          ? `$${listing.currentBid}` 
                          : 'No bids'
                      }
                    </div>
                    {listing.timeLeft && (
                      <div className="text-sm text-bid-warning flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {listing.timeLeft}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  {listing.status !== 'sold' && (
                    <>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-bid-danger hover:bg-bid-danger hover:text-white">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;
