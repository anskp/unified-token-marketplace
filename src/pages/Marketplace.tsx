
import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/custom-label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Filter, 
  Building2, 
  Paintbrush, 
  Gem, 
  Coins, 
  ArrowUpDown, 
  Activity,
  DollarSign,
  Percent,
  Users,
  Calendar,
  BadgePercent,
  Share2
} from "lucide-react";

const Marketplace = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    assetType: "all",
    priceRange: [0, 1000000],
    status: "all",
  });
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  
  // Mock data for tokens
  const tokens = [
    {
      id: "1",
      name: "Manhattan Office Building",
      symbol: "MNHT",
      assetType: "real_estate",
      price: 135.42,
      priceChange: 5.2,
      totalSupply: 100000,
      availableSupply: 85000,
      roi: 8.5,
      location: "New York, USA",
      description: "Prime office space in Manhattan's financial district. Class A building with modern amenities.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      status: "active",
      yearBuilt: 2005,
      squareFootage: 125000,
      occupancyRate: 92,
      annualRevenue: 12500000,
    },
    {
      id: "2",
      name: "Blue Chip Art Collection",
      symbol: "BART",
      assetType: "art",
      price: 78.15,
      priceChange: -2.4,
      totalSupply: 50000,
      availableSupply: 25000,
      roi: 12.3,
      location: "Global",
      description: "Curated collection of blue-chip contemporary artworks from renowned artists.",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      status: "active",
      artist: "Multiple",
      medium: "Mixed",
      provenance: "Gallery certified",
      historicalAppreciation: 15.8,
    },
    {
      id: "3",
      name: "Residential Development",
      symbol: "RESD",
      assetType: "real_estate",
      price: 95.30,
      priceChange: 1.8,
      totalSupply: 200000,
      availableSupply: 150000,
      roi: 7.2,
      location: "Austin, TX",
      description: "Luxury residential development in rapidly growing tech hub with strong rental demand.",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      status: "presale",
      yearBuilt: 2023,
      squareFootage: 350000,
      units: 215,
      projectedOccupancy: 95,
    },
    {
      id: "4",
      name: "Gold Reserve Fund",
      symbol: "GOLD",
      assetType: "commodity",
      price: 214.50,
      priceChange: 3.1,
      totalSupply: 500000,
      availableSupply: 350000,
      roi: 5.8,
      location: "Secure Vaults - Global",
      description: "Physical gold reserve backed by allocated gold bullion stored in secure vaults.",
      image: "https://images.unsplash.com/photo-1610375461369-d613b564dbdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      status: "active",
      purity: "99.99%",
      storage: "Insured",
      auditedBy: "KPMG",
      physicalBacking: "100%",
    },
    {
      id: "5",
      name: "Renewable Energy Project",
      symbol: "RENW",
      assetType: "infrastructure",
      price: 45.75,
      priceChange: 12.3,
      totalSupply: 1000000,
      availableSupply: 750000,
      roi: 9.7,
      location: "Multiple Sites - Europe",
      description: "Portfolio of operational wind and solar energy projects with long-term power purchase agreements.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      status: "active",
      capacity: "250MW",
      contractLength: "20 years",
      sustainabilityImpact: "High",
      estimatedLifespan: "25 years",
    },
    {
      id: "6",
      name: "Vintage Wine Collection",
      symbol: "WINE",
      assetType: "collectible",
      price: 189.25,
      priceChange: 0.8,
      totalSupply: 25000,
      availableSupply: 15000,
      roi: 14.2,
      location: "Temperature-controlled vault, France",
      description: "Curated portfolio of rare and investment-grade wines from premier vintages.",
      image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      status: "active",
      vintage: "Multiple",
      regions: "Bordeaux, Burgundy, Tuscany",
      averageRating: 95,
      historicalAppreciation: 12.5,
    },
  ];
  
  // Filter tokens based on search and selected filters
  const filteredTokens = tokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          token.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAssetType = selectedFilters.assetType === "all" || token.assetType === selectedFilters.assetType;
    
    const matchesPriceRange = token.price >= selectedFilters.priceRange[0] && 
                            token.price <= selectedFilters.priceRange[1];
    
    const matchesStatus = selectedFilters.status === "all" || token.status === selectedFilters.status;
    
    return matchesSearch && matchesAssetType && matchesPriceRange && matchesStatus;
  });
  
  // Handle purchase
  const handlePurchase = () => {
    if (!selectedToken) return;
    
    toast({
      title: "Token Purchase Successful",
      description: `You've purchased ${purchaseAmount} ${selectedToken.symbol} tokens.`,
    });
    
    setOpenPurchaseDialog(false);
    setPurchaseAmount(1);
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  // Format large numbers
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };
  
  // Asset Type Icon
  const AssetIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "real_estate":
        return <Building2 className="h-5 w-5" />;
      case "art":
        return <Paintbrush className="h-5 w-5" />;
      case "commodity":
        return <Gem className="h-5 w-5" />;
      case "infrastructure":
        return <Building2 className="h-5 w-5" />;
      case "collectible":
        return <Coins className="h-5 w-5" />;
      default:
        return <Coins className="h-5 w-5" />;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground mt-2">
            Discover and invest in tokenized real-world assets
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets by name or symbol..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select
              defaultValue={selectedFilters.assetType}
              onValueChange={(value) => setSelectedFilters({...selectedFilters, assetType: value})}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="real_estate">Real Estate</SelectItem>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="commodity">Commodities</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="collectible">Collectibles</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              defaultValue="recent"
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="roi_desc">Highest ROI</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectContent>
            </Select>
            
            <Dialog open={openFilterDialog} onOpenChange={setOpenFilterDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Filter Assets</DialogTitle>
                  <DialogDescription>
                    Refine your search with additional criteria
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="priceRange">Price Range</Label>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>{formatCurrency(selectedFilters.priceRange[0])}</span>
                      <span>{formatCurrency(selectedFilters.priceRange[1])}</span>
                    </div>
                    <Slider
                      id="priceRange"
                      defaultValue={selectedFilters.priceRange}
                      min={0}
                      max={1000000}
                      step={1000}
                      onValueChange={(value) => setSelectedFilters({...selectedFilters, priceRange: value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      defaultValue={selectedFilters.status}
                      onValueChange={(value) => setSelectedFilters({...selectedFilters, status: value})}
                    >
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="presale">Presale</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="location">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="europe">Europe</SelectItem>
                        <SelectItem value="asia">Asia</SelectItem>
                        <SelectItem value="global">Global</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenFilterDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setOpenFilterDialog(false)}>
                    Apply Filters
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="real_estate">Real Estate</TabsTrigger>
            <TabsTrigger value="art">Art</TabsTrigger>
            <TabsTrigger value="commodity">Commodities</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="collectible">Collectibles</TabsTrigger>
          </TabsList>
          
          {/* All Tokens */}
          <TabsContent value="all" className="mt-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTokens.length > 0 ? (
                filteredTokens.map((token) => (
                  <Card key={token.id} className="overflow-hidden">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={token.image}
                        alt={token.name}
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{token.name}</CardTitle>
                          <div className="flex items-center mt-1 space-x-2">
                            <Badge variant="outline" className="capitalize">
                              <AssetIcon type={token.assetType} />
                              <span className="ml-1">
                                {token.assetType.replace('_', ' ')}
                              </span>
                            </Badge>
                            <Badge
                              className={`${
                                token.status === "active" ? "bg-green-500" :
                                token.status === "presale" ? "bg-blue-500" : "bg-amber-500"
                              }`}
                            >
                              {token.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">{formatCurrency(token.price)}</div>
                          <div className={`text-sm ${token.priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {token.priceChange >= 0 ? "+" : ""}{token.priceChange}%
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-muted-foreground text-sm line-clamp-2">
                        {token.description}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Percent className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">ROI:</span>
                          <span className="ml-1 font-medium">{token.roi}%</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">Available:</span>
                          <span className="ml-1 font-medium">
                            {Math.round((token.availableSupply / token.totalSupply) * 100)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex justify-between w-full">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedToken(token);
                            // In a real app, this would navigate to a token detail page
                          }}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSelectedToken(token);
                            setOpenPurchaseDialog(true);
                          }}
                        >
                          Buy Tokens
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No assets found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Category-specific tabs */}
          {["real_estate", "art", "commodity", "infrastructure", "collectible"].map((category) => (
            <TabsContent key={category} value={category} className="mt-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tokens.filter(token => token.assetType === category).length > 0 ? (
                  tokens
                    .filter(token => token.assetType === category)
                    .map((token) => (
                      <Card key={token.id} className="overflow-hidden">
                        {/* Same card structure as in "all" tab */}
                        <AspectRatio ratio={16 / 9}>
                          <img
                            src={token.image}
                            alt={token.name}
                            className="object-cover w-full h-full"
                          />
                        </AspectRatio>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">{token.name}</CardTitle>
                              <div className="flex items-center mt-1 space-x-2">
                                <Badge variant="outline" className="capitalize">
                                  <AssetIcon type={token.assetType} />
                                  <span className="ml-1">
                                    {token.assetType.replace('_', ' ')}
                                  </span>
                                </Badge>
                                <Badge
                                  className={`${
                                    token.status === "active" ? "bg-green-500" :
                                    token.status === "presale" ? "bg-blue-500" : "bg-amber-500"
                                  }`}
                                >
                                  {token.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold">{formatCurrency(token.price)}</div>
                              <div className={`text-sm ${token.priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {token.priceChange >= 0 ? "+" : ""}{token.priceChange}%
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="text-muted-foreground text-sm line-clamp-2">
                            {token.description}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center">
                              <Percent className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-muted-foreground">ROI:</span>
                              <span className="ml-1 font-medium">{token.roi}%</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-muted-foreground">Available:</span>
                              <span className="ml-1 font-medium">
                                {Math.round((token.availableSupply / token.totalSupply) * 100)}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <div className="flex justify-between w-full">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedToken(token);
                                // In a real app, this would navigate to a token detail page
                              }}
                            >
                              View Details
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => {
                                setSelectedToken(token);
                                setOpenPurchaseDialog(true);
                              }}
                            >
                              Buy Tokens
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <AssetIcon type={category} className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No {category.replace('_', ' ')} assets found</h3>
                    <p className="text-muted-foreground mt-2">
                      Check back later for new listings in this category
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Purchase Dialog */}
        <Dialog open={openPurchaseDialog} onOpenChange={setOpenPurchaseDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Purchase Tokens</DialogTitle>
              <DialogDescription>
                {selectedToken ? `Buy ${selectedToken.symbol} tokens at ${formatCurrency(selectedToken.price)} per token.` : ''}
              </DialogDescription>
            </DialogHeader>
            {selectedToken && (
              <div className="py-4 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-md overflow-hidden">
                    <img
                      src={selectedToken.image}
                      alt={selectedToken.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{selectedToken.name}</h4>
                    <div className="text-sm text-muted-foreground">{selectedToken.symbol}</div>
                    <div className="text-sm mt-1">{formatCurrency(selectedToken.price)} per token</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tokenAmount">Number of Tokens</Label>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPurchaseAmount(Math.max(1, purchaseAmount - 1))}
                      disabled={purchaseAmount <= 1}
                    >
                      -
                    </Button>
                    <Input
                      id="tokenAmount"
                      type="number"
                      min={1}
                      max={selectedToken.availableSupply}
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(parseInt(e.target.value) || 1)}
                      className="text-center"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPurchaseAmount(purchaseAmount + 1)}
                      disabled={purchaseAmount >= selectedToken.availableSupply}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-lg bg-muted p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price per token</span>
                    <span>{formatCurrency(selectedToken.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity</span>
                    <span>{purchaseAmount} tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform fee (1.5%)</span>
                    <span>{formatCurrency(selectedToken.price * purchaseAmount * 0.015)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(selectedToken.price * purchaseAmount * 1.015)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select defaultValue="wallet">
                    <SelectTrigger id="paymentMethod">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wallet">Connected Wallet</SelectItem>
                      <SelectItem value="card">Credit Card</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenPurchaseDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handlePurchase}>
                Complete Purchase
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Marketplace;
