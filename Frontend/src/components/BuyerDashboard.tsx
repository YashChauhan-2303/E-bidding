import React, { useState } from 'react';
import { Search, Heart, Clock, Trophy, Filter, Bell, Gavel, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const BuyerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { label: 'Watchlist Items', value: '8', icon: Heart },
    { label: 'Active Bids', value: '5', icon: Gavel },
    { label: 'Won Auctions', value: '12', icon: Trophy },
    { label: 'Ending Soon', value: '3', icon: Clock },
  ];

  const activeAuctions = [
    {
      id: 1,
      title: 'Vintage Rolex Submariner',
      currentBid: 12500,
      myBid: 12000,
      timeLeft: '2h 15m',
      image: '/placeholder.svg',
      isWinning: false,
      watchers: 45
    },
    {
      id: 2,
      title: 'Abstract Digital Art NFT',
      currentBid: 2800,
      myBid: 2800,
      timeLeft: '1d 8h',
      image: '/placeholder.svg',
      isWinning: true,
      watchers: 23
    },
    {
      id: 3,
      title: 'Antique Chess Set',
      currentBid: 450,
      myBid: 400,
      timeLeft: '45m',
      image: '/placeholder.svg',
      isWinning: false,
      watchers: 12
    },
  ];

  const recentActivity = [
    { type: 'outbid', item: 'Vintage Guitar', time: '2 hours ago', amount: 850 },
    { type: 'won', item: 'Rare Book Collection', time: '1 day ago', amount: 1200 },
    { type: 'bid', item: 'Art Deco Lamp', time: '3 hours ago', amount: 680 },
    { type: 'watchlist', item: 'Classic Camera', time: '5 hours ago', amount: null },
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Mid-Century Modern Chair',
      currentBid: 320,
      timeLeft: '3d 14h',
      image: '/placeholder.svg',
      category: 'Furniture'
    },
    {
      id: 2,
      title: 'Signed Baseball Collection',
      currentBid: 890,
      timeLeft: '2d 6h',
      image: '/placeholder.svg',
      category: 'Sports'
    },
    {
      id: 3,
      title: 'Vintage Jewelry Box',
      currentBid: 150,
      timeLeft: '4d 12h',
      image: '/placeholder.svg',
      category: 'Jewelry'
    },
  ];

  return (
    <div className="min-h-screen bg-bid-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-bid-gray-800 mb-2">Buyer Dashboard</h1>
            <p className="text-bid-gray-600">Track your bids and discover new auctions</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-bid-gray-600">
              <User className="h-4 w-4" />
              <span>Welcome, {user?.fullName}</span>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              size="sm"
              className="border-bid-gray-300 text-bid-gray-600 hover:bg-bid-gray-100"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="p-4 mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bid-gray-400 h-4 w-4" />
              <Input
                placeholder="Search auctions, categories, or sellers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </Card>

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
                  <div className="h-12 w-12 bg-bid-accent bg-opacity-10 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-bid-accent" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Bids */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">My Active Bids</h3>
              <div className="space-y-4">
                {activeAuctions.map((auction) => (
                  <div key={auction.id} className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-bid-gray-200 rounded-lg flex items-center justify-center">
                        <img src={auction.image} alt={auction.title} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{auction.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-bid-gray-600">
                          <span>Current: ${auction.currentBid.toLocaleString()}</span>
                          <span>My bid: ${auction.myBid.toLocaleString()}</span>
                          <span>{auction.watchers} watchers</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant={auction.isWinning ? "default" : "secondary"}>
                            {auction.isWinning ? "Winning" : "Outbid"}
                          </Badge>
                          <span className="text-sm text-bid-warning font-mono">{auction.timeLeft}</span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" className={auction.isWinning ? "bg-bid-accent" : "bid-button-primary"}>
                          {auction.isWinning ? "Increase Bid" : "Place Bid"}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="h-3 w-3 mr-1" />
                          Watch
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'won' ? 'bg-bid-accent' :
                      activity.type === 'outbid' ? 'bg-bid-danger' :
                      activity.type === 'bid' ? 'bg-bid-primary' : 'bg-bid-gray-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-bid-gray-800">
                        {activity.type === 'won' && 'Won auction: '}
                        {activity.type === 'outbid' && 'Outbid on: '}
                        {activity.type === 'bid' && 'Bid placed on: '}
                        {activity.type === 'watchlist' && 'Added to watchlist: '}
                        <span className="font-medium">{activity.item}</span>
                      </p>
                      <p className="text-bid-gray-500">{activity.time}</p>
                    </div>
                    {activity.amount && (
                      <span className="font-medium text-bid-primary">${activity.amount}</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recommended for You</h3>
              <div className="space-y-4">
                {recommendations.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-bid-gray-200 rounded-lg flex items-center justify-center">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <p className="text-xs text-bid-gray-500">{item.category}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-medium text-bid-primary">${item.currentBid}</span>
                        <span className="text-xs text-bid-warning">{item.timeLeft}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button size="sm" variant="outline" className="w-full mt-4">View More</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
