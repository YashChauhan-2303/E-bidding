
import React, { useState } from 'react';
import { Timer, Gavel, Shield, Zap, Star, ArrowRight, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const featuredAuctions = [
    {
      id: 1,
      title: "Vintage Rolex Submariner",
      currentBid: 12500,
      timeLeft: "2d 14h 23m",
      image: "/placeholder.svg",
      bids: 23
    },
    {
      id: 2,
      title: "Abstract Digital Art NFT",
      currentBid: 2800,
      timeLeft: "1d 8h 45m",
      image: "/placeholder.svg",
      bids: 17
    },
    {
      id: 3,
      title: "Classic Ferrari Model",
      currentBid: 850,
      timeLeft: "3d 2h 12m",
      image: "/placeholder.svg",
      bids: 9
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Art Collector",
      content: "I've found amazing pieces at incredible prices. The live bidding feature is so engaging!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Vintage Seller",
      content: "Easy to list items and the platform takes care of everything. Great commission rates too.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Casual Buyer",
      content: "User-friendly interface and transparent bidding process. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gavel className="h-8 w-8 text-bid-primary" />
              <span className="text-2xl font-bold text-bid-primary">BidHub</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-bid-gray-600 hover:text-bid-primary transition-colors">Features</a>
              <a href="#auctions" className="text-bid-gray-600 hover:text-bid-primary transition-colors">Auctions</a>
              <a href="#testimonials" className="text-bid-gray-600 hover:text-bid-primary transition-colors">Reviews</a>
              <Link to="/contactus" className="text-bid-gray-600 hover:text-bid-primary transition-colors">Contact</Link>
            </nav>

            <div className="hidden md:flex space-x-4">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="outline" className="border-bid-primary text-bid-primary hover:bg-bid-primary hover:text-white">
                      Dashboard ({profile?.role})
                    </Button>
                  </Link>
                  <Button 
                    onClick={signOut} 
                    variant="outline" 
                    className="border-bid-gray-300 text-bid-gray-600 hover:bg-bid-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="outline" className="border-bid-primary text-bid-primary hover:bg-bid-primary hover:text-white">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="bid-button-primary">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-bid-gray-600 hover:text-bid-primary">Features</a>
                <a href="#auctions" className="text-bid-gray-600 hover:text-bid-primary">Auctions</a>
                <a href="#testimonials" className="text-bid-gray-600 hover:text-bid-primary">Reviews</a>
                <Link to="/contactus" className="text-bid-gray-600 hover:text-bid-primary">Contact</Link>
                <div className="flex flex-col space-y-2 pt-4">
                  {user ? (
                    <>
                      <Link to="/dashboard">
                        <Button variant="outline" className="border-bid-primary text-bid-primary w-full">
                          Dashboard ({profile?.role})
                        </Button>
                      </Link>
                      <Button onClick={signOut} variant="outline" className="border-bid-gray-300 text-bid-gray-600">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth">
                        <Button variant="outline" className="border-bid-primary text-bid-primary w-full">Sign In</Button>
                      </Link>
                      <Link to="/auth">
                        <Button className="bid-button-primary w-full">Get Started</Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bid-gradient-bg text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            The Future of Online Auctions
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of buyers and sellers in our secure, real-time bidding platform. 
            Discover unique items, place winning bids, and grow your collection.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {user ? (
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-white text-bid-primary hover:bg-bid-gray-100 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button 
                    size="lg" 
                    className="bg-white text-bid-primary hover:bg-bid-gray-100 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    Start Bidding <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button 
                    size="lg" 
                    className="bg-white text-bid-primary hover:bg-bid-gray-100 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    Sell Your Item <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-bid-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-bid-gray-800">
            Why Choose BidHub?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bid-card-hover">
              <Zap className="h-12 w-12 text-bid-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Real-Time Bidding</h3>
              <p className="text-bid-gray-600">
                Experience the thrill of live auctions with instant bid updates and real-time notifications.
              </p>
            </Card>
            <Card className="p-8 text-center bid-card-hover">
              <Shield className="h-12 w-12 text-bid-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Secure Transactions</h3>
              <p className="text-bid-gray-600">
                Your payments and personal data are protected with bank-level security and encryption.
              </p>
            </Card>
            <Card className="p-8 text-center bid-card-hover">
              <Gavel className="h-12 w-12 text-bid-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Expert Moderation</h3>
              <p className="text-bid-gray-600">
                All listings are verified by our team to ensure authenticity and quality.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Auctions Section */}
      <section id="auctions" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-bid-gray-800">Featured Auctions</h2>
            <Button variant="outline" className="border-bid-primary text-bid-primary hover:bg-bid-primary hover:text-white">
              View All Auctions
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden bid-card-hover">
                <div className="h-48 bg-bid-gray-200 flex items-center justify-center">
                  <img 
                    src={auction.image} 
                    alt={auction.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{auction.title}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-bid-gray-600">Current Bid</p>
                      <p className="text-2xl font-bold text-bid-primary">${auction.currentBid.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-bid-gray-600">{auction.bids} bids</p>
                      <p className="text-sm font-mono text-bid-warning">{auction.timeLeft}</p>
                    </div>
                  </div>
                  <Button className="w-full bid-button-primary">
                    <Timer className="mr-2 h-4 w-4" />
                    Place Bid
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-bid-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-bid-gray-800">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 bid-card-hover">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-bid-warning fill-current" />
                  ))}
                </div>
                <p className="text-bid-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-bid-gray-600">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bid-gradient-bg text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Start Bidding?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our community of buyers and sellers. Create your account today and discover amazing deals.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-white text-bid-primary hover:bg-bid-gray-100 text-lg px-8 py-4"
                >
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button 
                    size="lg" 
                    className="bg-white text-bid-primary hover:bg-bid-gray-100 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    Sign Up as Buyer <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button 
                    size="lg" 
                    className="bg-white text-bid-primary hover:bg-bid-gray-100 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    Sign Up as Seller <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bid-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Gavel className="h-8 w-8 text-bid-primary" />
                <span className="text-2xl font-bold">BidHub</span>
              </div>
              <p className="text-bid-gray-400">
                The most trusted platform for online auctions and bidding.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Buyers</h4>
              <ul className="space-y-2 text-bid-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How to Bid</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Payment Methods</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Sellers</h4>
              <ul className="space-y-2 text-bid-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">List an Item</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Seller Fees</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Practices</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-bid-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><Link to="/contactus" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-bid-gray-700 mt-8 pt-8 text-center text-bid-gray-400">
            <p>&copy; 2024 BidHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
