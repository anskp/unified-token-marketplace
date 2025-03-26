import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  ArrowUpDown, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  Building,
  Palette,
  Briefcase,
  Database
} from "lucide-react";
import { getAllTokens } from "@/lib/api";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [assetTypeFilter, setAssetTypeFilter] = useState("all");
  const [sort, setSort] = useState("trending");
  const [openTradeDialog, setOpenTradeDialog] = useState(false);
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [tradeAmount, setTradeAmount] = useState("");

  // Fetch all tokens
  const { data: tokens, isLoading } = useQuery({
    queryKey: ["tokens"],
    queryFn: getAllTokens
  });

  // Mock market data for display purposes
  const marketData = [
    {
      id: "1",
      name: "Manhattan Office Complex",
      symbol: "MNHTN",
      type: "real_estate",
      price: 105.25,
      change: 5.2,
      volume: 1250000,
      marketCap: 10525000,
      icon: Building,
    },
    {
      id: "2",
      name: "Blue Chip Art Collection",
      symbol: "BART",
      type: "art",
      price: 78.15,
      change: -2.4,
      volume: 820000,
      marketCap: 7815000,
      icon: Palette,
    },
    {
      id: "3",
      name: "Renewable Energy Project",
      symbol: "RENW",
      type: "infrastructure",
      price: 214.50,
      change: 12.3,
      volume: 3500000,
      marketCap: 21450000,
      icon: Briefcase,
    },
    {
      id: "4",
      name: "Gold Reserve Fund",
      symbol: "GOLD",
      type: "commodity",
      price: 45.30,
      change: 1.8,
      volume: 6500000,
      marketCap: 45300000,
      icon: Database,
    },
    {
      id: "5",
      name: "Downtown Retail Space",
      symbol: "RTSP",
      type: "real_estate",
      price: 63.75,
      change: 3.1,
      volume: 980000,
      marketCap: 6375000,
      icon: Building,
    },
    {
      id: "6",
      name: "Rare Collectibles Set",
      symbol: "RCOL",
      type: "art",
      price: 112.40,
      change: -1.3,
      volume: 540000,
      marketCap: 11240000,
      icon: Palette,
    },
    {
      id: "7",
      name: "Sustainable Agriculture",
      symbol: "SAGR",
      type: "commodity",
      price: 28.95,
      change: 0.8,
      volume: 1820000,
      marketCap: 2895000,
      icon: Database,
    },
    {
      id: "8",
      name: "Bridge Project Bonds",
      symbol: "BRDG",
      type: "infrastructure",
      price: 135.20,
      change: -0.5,
      volume: 2100000,
      marketCap: 13520000,
      icon: Briefcase,
    },
  ];

  // Filter market data based on search query and asset type
  const filteredMarketData = marketData.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = assetTypeFilter === "all" || item.type === assetTypeFilter;
    
    return matchesSearch && matchesType;
  });

  // Sort market data
  const sortedMarketData = [...filteredMarketData].sort((a, b) => {
    switch (sort) {
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "price_asc":
        return a.price - b.price;
      case "price_desc":
        return b.price - a.price;
      case "change_asc":
        return a.change - b.change;
      case "change_desc":
        return b.change - a.change;
      case "volume_desc":
        return b.volume - a.volume;
      case "trending":
      default:
        return Math.abs(b.change) - Math.abs(a.change);
    }
  });

  const openTrade = (token: any) => {
    setSelectedToken(token);
    setOpenTradeDialog(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatVolume = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  const getAssetTypeLabel = (type: string) => {
    switch (type) {
      case "real_estate":
        return "Real Estate";
      case "art":
        return "Art & Collectibles";
      case "commodity":
        return "Commodity";
      case "infrastructure":
        return "Infrastructure";
      default:
        return type;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Asset Marketplace</h1>
          <p className="text-muted-foreground mt-2">
            Discover and trade tokenized real-world assets
          </p>
        </div>

        {/* Market Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Market Volume (24h)
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12.5M</div>
              <p className="text-xs text-green-500">
                +8.2% from yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Listings
              </CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">842</div>
              <p className="text-xs text-muted-foreground">
                Across 4 asset classes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Daily Trades
              </CardTitle>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">237</div>
              <p className="text-xs text-green-500">
                +12.4% this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Market Sentiment
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Bullish</div>
              <p className="text-xs text-muted-foreground">
                Based on market activity
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Market Explorer</CardTitle>
            <CardDescription>
              Browse, filter, and trade tokenized assets
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or symbol..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Select 
                  defaultValue={assetTypeFilter} 
                  onValueChange={setAssetTypeFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Asset Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assets</SelectItem>
                    <SelectItem value="real_estate">Real Estate</SelectItem>
                    <SelectItem value="art">Art & Collectibles</SelectItem>
                    <SelectItem value="commodity">Commodities</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  </SelectContent>
                </Select>
                <Select 
                  defaultValue={sort}
                  onValueChange={setSort}
                >
                  <SelectTrigger className="w-[180px]">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                    <SelectItem value="price_asc">Price (Low to High)</SelectItem>
                    <SelectItem value="price_desc">Price (High to Low)</SelectItem>
                    <SelectItem value="change_desc">Highest Gainers</SelectItem>
                    <SelectItem value="change_asc">Highest Losers</SelectItem>
                    <SelectItem value="volume_desc">Volume (Highest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Market Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="real_estate">Real Estate</TabsTrigger>
                <TabsTrigger value="art">Art</TabsTrigger>
                <TabsTrigger value="commodity">Commodities</TabsTrigger>
                <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4 mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">24h Change</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                      <TableHead className="text-right">Market Cap</TableHead>
                      <TableHead className="text-right">Trade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedMarketData.map((token) => (
                      <TableRow key={token.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                              <token.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div>{token.name}</div>
                              <div className="text-xs text-muted-foreground">{token.symbol}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{getAssetTypeLabel(token.type)}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(token.price)}</TableCell>
                        <TableCell className={`text-right ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          <div className="flex items-center justify-end">
                            {token.change >= 0 ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                            {token.change >= 0 ? '+' : ''}{token.change}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{formatVolume(token.volume)}</TableCell>
                        <TableCell className="text-right">{formatVolume(token.marketCap)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openTrade(token)}>
                            Trade
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {sortedMarketData.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No assets found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              {/* Other tabs would have similar content but filtered by asset type */}
              <TabsContent value="real_estate" className="space-y-4 mt-4">
                <Table>
                  {/* Copy of the same table structure, but with filtered data */}
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">24h Change</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                      <TableHead className="text-right">Market Cap</TableHead>
                      <TableHead className="text-right">Trade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedMarketData.filter(token => token.type === 'real_estate').map((token) => (
                      <TableRow key={token.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                              <token.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div>{token.name}</div>
                              <div className="text-xs text-muted-foreground">{token.symbol}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{getAssetTypeLabel(token.type)}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(token.price)}</TableCell>
                        <TableCell className={`text-right ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          <div className="flex items-center justify-end">
                            {token.change >= 0 ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                            {token.change >= 0 ? '+' : ''}{token.change}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{formatVolume(token.volume)}</TableCell>
                        <TableCell className="text-right">{formatVolume(token.marketCap)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openTrade(token)}>
                            Trade
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              {/* Additional tabs with similar structure */}
              <TabsContent value="art" className="space-y-4 mt-4">
                {/* Art specific content */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">24h Change</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                      <TableHead className="text-right">Market Cap</TableHead>
                      <TableHead className="text-right">Trade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedMarketData.filter(token => token.type === 'art').map((token) => (
                      <TableRow key={token.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                              <token.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div>{token.name}</div>
                              <div className="text-xs text-muted-foreground">{token.symbol}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{getAssetTypeLabel(token.type)}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(token.price)}</TableCell>
                        <TableCell className={`text-right ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          <div className="flex items-center justify-end">
                            {token.change >= 0 ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                            {token.change >= 0 ? '+' : ''}{token.change}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{formatVolume(token.volume)}</TableCell>
                        <TableCell className="text-right">{formatVolume(token.marketCap)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openTrade(token)}>
                            Trade
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="commodity" className="space-y-4 mt-4">
                {/* Commodity specific content */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">24h Change</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                      <TableHead className="text-right">Market Cap</TableHead>
                      <TableHead className="text-right">Trade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedMarketData.filter(token => token.type === 'commodity').map((token) => (
                      <TableRow key={token.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                              <token.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div>{token.name}</div>
                              <div className="text-xs text-muted-foreground">{token.symbol}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{getAssetTypeLabel(token.type)}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(token.price)}</TableCell>
                        <TableCell className={`text-right ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          <div className="flex items-center justify-end">
                            {token.change >= 0 ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                            {token.change >= 0 ? '+' : ''}{token.change}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{formatVolume(token.volume)}</TableCell>
                        <TableCell className="text-right">{formatVolume(token.marketCap)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openTrade(token)}>
                            Trade
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="infrastructure" className="space-y-4 mt-4">
                {/* Infrastructure specific content */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">24h Change</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                      <TableHead className="text-right">Market Cap</TableHead>
                      <TableHead className="text-right">Trade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedMarketData.filter(token => token.type === 'infrastructure').map((token) => (
                      <TableRow key={token.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                              <token.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div>{token.name}</div>
                              <div className="text-xs text-muted-foreground">{token.symbol}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{getAssetTypeLabel(token.type)}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(token.price)}</TableCell>
                        <TableCell className={`text-right ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          <div className="flex items-center justify-end">
                            {token.change >= 0 ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                            {token.change >= 0 ? '+' : ''}{token.change}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{formatVolume(token.volume)}</TableCell>
                        <TableCell className="text-right">{formatVolume(token.marketCap)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openTrade(token)}>
                            Trade
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Trade Dialog */}
        <Dialog open={openTradeDialog} onOpenChange={setOpenTradeDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Trade {selectedToken?.name}</DialogTitle>
              <DialogDescription>
                Enter the amount you want to trade.
              </DialogDescription>
            </DialogHeader>
            
            {selectedToken && (
              <div className="py-4 space-y-4">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <selectedToken.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{selectedToken.name}</div>
                      <div className="text-xs text-muted-foreground">{selectedToken.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(selectedToken.price)}</div>
                    <div className={`text-xs ${selectedToken.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {selectedToken.change >= 0 ? '+' : ''}{selectedToken.change}%
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="tradeType">Trade Type</Label>
                  <Select defaultValue="buy">
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (Tokens)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Trade Preview</Label>
                  <Card>
                    <CardContent className="pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tokens:</span>
                        <span>{tradeAmount || '0'} {selectedToken.symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span>{formatCurrency(selectedToken.price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span>{formatCurrency(selectedToken.price * (parseFloat(tradeAmount) || 0))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fee (0.5%):</span>
                        <span>{formatCurrency(selectedToken.price * (parseFloat(tradeAmount) || 0) * 0.005)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>{formatCurrency(selectedToken.price * (parseFloat(tradeAmount) || 0) * 1.005)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenTradeDialog(false)}>
                Cancel
              </Button>
              <Button>
                Confirm Trade <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Marketplace;
