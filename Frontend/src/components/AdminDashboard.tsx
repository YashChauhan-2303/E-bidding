
import React from 'react';
import { Users, Gavel, AlertTriangle, TrendingUp, Search, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '2,847', change: '+12%', icon: Users },
    { label: 'Active Auctions', value: '156', change: '+8%', icon: Gavel },
    { label: 'Pending Reviews', value: '23', change: '-5%', icon: AlertTriangle },
    { label: 'Revenue (MTD)', value: '$89,432', change: '+18%', icon: TrendingUp },
  ];

  const recentAuctions = [
    { id: 1, title: 'Vintage Guitar Collection', seller: 'John Doe', bids: 34, status: 'active', endTime: '2h 15m' },
    { id: 2, title: 'Rare Book Set', seller: 'Alice Smith', bids: 12, status: 'pending', endTime: '1d 4h' },
    { id: 3, title: 'Antique Jewelry', seller: 'Bob Johnson', bids: 67, status: 'active', endTime: '45m' },
    { id: 4, title: 'Art Deco Lamp', seller: 'Carol White', bids: 23, status: 'flagged', endTime: '3h 22m' },
  ];

  const disputeCases = [
    { id: 1, buyer: 'Mike Chen', seller: 'Sara Wilson', item: 'Designer Watch', priority: 'high' },
    { id: 2, buyer: 'Tom Brown', seller: 'Lisa Davis', item: 'Vintage Camera', priority: 'medium' },
    { id: 3, buyer: 'Emma Jones', seller: 'Paul Miller', item: 'Comic Books', priority: 'low' },
  ];

  return (
    <div className="min-h-screen bg-bid-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-bid-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-bid-gray-600">Manage users, auctions, and platform operations</p>
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
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-bid-accent' : 'text-bid-danger'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-bid-primary bg-opacity-10 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-bid-primary" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Auctions Management */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Auctions</h3>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentAuctions.map((auction) => (
                <div key={auction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{auction.title}</h4>
                    <p className="text-sm text-bid-gray-600">by {auction.seller} • {auction.bids} bids</p>
                    <p className="text-sm text-bid-warning">Ends in {auction.endTime}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={auction.status === 'active' ? 'default' : auction.status === 'flagged' ? 'destructive' : 'secondary'}
                    >
                      {auction.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Dispute Resolution */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Dispute Cases</h3>
              <Button variant="outline" size="sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {disputeCases.map((dispute) => (
                <div key={dispute.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{dispute.item}</h4>
                    <Badge 
                      variant={
                        dispute.priority === 'high' ? 'destructive' : 
                        dispute.priority === 'medium' ? 'default' : 'secondary'
                      }
                    >
                      {dispute.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-bid-gray-600 mb-3">
                    {dispute.buyer} vs {dispute.seller}
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-bid-accent text-white">Resolve</Button>
                    <Button size="sm" variant="outline">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
