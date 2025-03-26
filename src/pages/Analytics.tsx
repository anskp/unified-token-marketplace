import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { 
  PieChart as PieChartIcon, 
  BarChart4, 
  TrendingUp, 
  Calendar, 
  ArrowUp, 
  ArrowDown, 
  DollarSign 
} from "lucide-react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");

  // Mock data for charts
  const portfolioData = [
    { name: "Jan", value: 2400 },
    { name: "Feb", value: 1398 },
    { name: "Mar", value: 9800 },
    { name: "Apr", value: 3908 },
    { name: "May", value: 4800 },
    { name: "Jun", value: 3800 },
    { name: "Jul", value: 4300 },
    { name: "Aug", value: 5300 },
    { name: "Sep", value: 4800 },
    { name: "Oct", value: 6000 },
    { name: "Nov", value: 8200 },
    { name: "Dec", value: 7300 },
  ];

  const marketData = [
    { name: "Jan", real_estate: 4000, art: 2400, commodity: 2400, infrastructure: 1800 },
    { name: "Feb", real_estate: 3000, art: 1398, commodity: 2210, infrastructure: 1300 },
    { name: "Mar", real_estate: 2000, art: 9800, commodity: 2290, infrastructure: 2100 },
    { name: "Apr", real_estate: 2780, art: 3908, commodity: 2000, infrastructure: 1800 },
    { name: "May", real_estate: 1890, art: 4800, commodity: 2181, infrastructure: 2200 },
    { name: "Jun", real_estate: 2390, art: 3800, commodity: 2500, infrastructure: 2400 },
    { name: "Jul", real_estate: 3490, art: 4300, commodity: 2100, infrastructure: 2100 },
  ];

  const assetDistributionData = [
    { name: "Real Estate", value: 45 },
    { name: "Art & Collectibles", value: 20 },
    { name: "Commodities", value: 15 },
    { name: "Infrastructure", value: 20 },
  ];

  const volumeData = [
    { date: "2023-01-01", volume: 4000 },
    { date: "2023-02-01", volume: 3000 },
    { date: "2023-03-01", volume: 2000 },
    { date: "2023-04-01", volume: 2780 },
    { date: "2023-05-01", volume: 1890 },
    { date: "2023-06-01", volume: 2390 },
    { date: "2023-07-01", volume: 3490 },
    { date: "2023-08-01", volume: 3490 },
    { date: "2023-09-01", volume: 4000 },
    { date: "2023-10-01", volume: 5000 },
    { date: "2023-11-01", volume: 4800 },
    { date: "2023-12-01", volume: 5200 },
  ];

  const topTokens = [
    { id: 1, name: "Manhattan Office Complex", symbol: "MNHTN", value: "$5.2M", change: "+12.3%" },
    { id: 2, name: "Blue Chip Art Collection", symbol: "BART", value: "$3.8M", change: "-2.4%" },
    { id: 3, name: "Renewable Energy Project", symbol: "RENW", value: "$2.5M", change: "+8.7%" },
    { id: 4, name: "Gold Reserve Fund", symbol: "GOLD", value: "$1.9M", change: "+1.5%" },
    { id: 5, name: "Downtown Retail Space", symbol: "RTSP", value: "$1.2M", change: "+4.2%" },
  ];

  // Performance metrics
  const performanceMetrics = [
    { metric: "30-Day Return", value: "+8.2%", trend: "up" },
    { metric: "90-Day Return", value: "+15.4%", trend: "up" },
    { metric: "1-Year Return", value: "+32.6%", trend: "up" },
    { metric: "ROI", value: "18.3%", trend: "up" },
    { metric: "Volatility", value: "12.5%", trend: "down" },
    { metric: "Sharpe Ratio", value: "1.42", trend: "up" },
  ];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Format large numbers
  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  // Bar color function for recharts
  const getBarColor = (d: any) => {
    const value = d.return;
    return value >= 0 ? "#4ade80" : "#f87171";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Track performance and market insights
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Portfolio Value", value: "$1,245,300", change: "+8.2%", trend: "up", icon: DollarSign },
            { title: "Assets", value: "12", change: "+2", trend: "up", icon: PieChartIcon },
            { title: "30-Day Return", value: "12.3%", change: "+4.5%", trend: "up", icon: TrendingUp },
            { title: "Annual Yield", value: "15.8%", change: "+2.3%", trend: "up", icon: BarChart4 },
          ].map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className={`text-xs ${card.trend === "up" ? "text-green-500" : "text-red-500"} flex items-center`}>
                  {card.trend === "up" ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                  {card.change} {timeRange === "all" ? "" : `(${timeRange})`}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
          </TabsList>
          
          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Value Over Time</CardTitle>
                <CardDescription>
                  Track the growth of your tokenized asset portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={portfolioData}
                      margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={formatValue} />
                      <Tooltip formatter={(value) => formatValue(value as number)} />
                      <Legend />
                      <Area type="monotone" dataKey="value" name="Portfolio Value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Assets</CardTitle>
                  <CardDescription>
                    Assets with the highest returns in your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topTokens.map((token) => (
                      <div key={token.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{token.name}</div>
                          <div className="text-xs text-muted-foreground">{token.symbol}</div>
                        </div>
                        <div className="text-right">
                          <div>{token.value}</div>
                          <div className={`text-xs ${token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                            {token.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Asset Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of your portfolio by asset class
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={assetDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {assetDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatPercentage(value as number)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Market Tab */}
          <TabsContent value="market" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Overview by Asset Class</CardTitle>
                <CardDescription>
                  Compare performance across different asset types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={marketData}
                      margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={formatValue} />
                      <Tooltip formatter={(value) => formatValue(value as number)} />
                      <Legend />
                      <Bar dataKey="real_estate" name="Real Estate" fill="#0088FE" />
                      <Bar dataKey="art" name="Art & Collectibles" fill="#00C49F" />
                      <Bar dataKey="commodity" name="Commodities" fill="#FFBB28" />
                      <Bar dataKey="infrastructure" name="Infrastructure" fill="#FF8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Trading Volume</CardTitle>
                  <CardDescription>
                    Monthly trading volume across all assets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={volumeData}
                        margin={{
                          top: 20, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('default', { month: 'short' })} />
                        <YAxis tickFormatter={formatValue} />
                        <Tooltip formatter={(value) => formatValue(value as number)} />
                        <Legend />
                        <Line type="monotone" dataKey="volume" name="Trading Volume" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Market Trends</CardTitle>
                  <CardDescription>
                    Current market trends and insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Real Estate Market", description: "Commercial properties showing strong growth in metropolitan areas", trend: "positive" },
                      { title: "Art & Collectibles", description: "Digital art tokenization increasing, traditional art stable", trend: "neutral" },
                      { title: "Commodities", description: "Gold and precious metals slightly down, agricultural commodities up", trend: "mixed" },
                      { title: "Infrastructure", description: "Renewable energy projects outperforming traditional infrastructure", trend: "positive" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge variant="outline" className={
                            item.trend === "positive" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                            item.trend === "negative" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" :
                            item.trend === "neutral" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                            "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          }>
                            {item.trend}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-3">
              {performanceMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      {metric.metric}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className={`flex items-center text-xs ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {metric.trend === "up" ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                      Compared to previous period
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>
                  Compare your portfolio performance against market benchmarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', portfolio: 100, sp500: 100, nasdaq: 100 },
                        { month: 'Feb', portfolio: 108, sp500: 104, nasdaq: 106 },
                        { month: 'Mar', portfolio: 115, sp500: 107, nasdaq: 110 },
                        { month: 'Apr', portfolio: 120, sp500: 108, nasdaq: 115 },
                        { month: 'May', portfolio: 118, sp500: 110, nasdaq: 112 },
                        { month: 'Jun', portfolio: 125, sp500: 112, nasdaq: 118 },
                        { month: 'Jul', portfolio: 132, sp500: 115, nasdaq: 125 },
                      ]}
                      margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="portfolio" name="Your Portfolio" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="sp500" name="S&P 500" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="nasdaq" name="NASDAQ" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Historical Returns</CardTitle>
                <CardDescription>
                  Monthly returns over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { month: 'Jan', return: 2.5 },
                        { month: 'Feb', return: 1.8 },
                        { month: 'Mar', return: 3.2 },
                        { month: 'Apr', return: -0.5 },
                        { month: 'May', return: 1.2 },
                        { month: 'Jun', return: 2.8 },
                        { month: 'Jul', return: 3.5 },
                        { month: 'Aug', return: 2.1 },
                        { month: 'Sep', return: -1.2 },
                        { month: 'Oct', return: 1.9 },
                        { month: 'Nov', return: 2.7 },
                        { month: 'Dec', return: 3.1 },
                      ]}
                      margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Bar 
                        dataKey="return" 
                        name="Monthly Return" 
                        fill="#4ade80"
                        // Using a custom fill function directly here would cause TS errors
                        // Instead, we'll use a base color and handle the color logic in CSS
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Asset Allocation Tab */}
          <TabsContent value="allocation" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Current Allocation</CardTitle>
                  <CardDescription>
                    How your investments are currently allocated
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={assetDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {assetDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatPercentage(value as number)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Allocation</CardTitle>
                  <CardDescription>
                    Suggested portfolio distribution based on your profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Real Estate", value: 35 },
                            { name: "Art & Collectibles", value: 15 },
                            { name: "Commodities", value: 25 },
                            { name: "Infrastructure", value: 25 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {assetDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatPercentage(value as number)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Asset Performance by Class</CardTitle>
                <CardDescription>
                  Compare returns across different asset classes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { period: '1m', real_estate: 2.1, art: 1.5, commodity: 3.2, infrastructure: 1.9 },
                        { period: '3m', real_estate: 5.4, art: 4.2, commodity: 7.1, infrastructure: 4.8 },
                        { period: '6m', real_estate: 8.2, art: 6.5, commodity: 9.8, infrastructure: 7.2 },
                        { period: '1y', real_estate: 14.5, art: 12.8, commodity: 18.2, infrastructure: 15.6 },
                        { period: '3y', real_estate: 42.3, art: 38.5, commodity: 45.2, infrastructure: 40.1 },
                      ]}
                      margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Bar dataKey="real_estate" name="Real Estate" fill="#0088FE" />
                      <Bar dataKey="art" name="Art & Collectibles" fill="#00C49F" />
                      <Bar dataKey="commodity" name="Commodities" fill="#FFBB28" />
                      <Bar dataKey="infrastructure" name="Infrastructure" fill="#FF8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Optimization Suggestions</CardTitle>
                <CardDescription>
                  Recommendations to improve your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Increase Commodity Exposure", description: "Your portfolio could benefit from increased exposure to commodities to help hedge against inflation.", action: "Increase by 5-10%" },
                    { title: "Diversify Real Estate Holdings", description: "Your real estate holdings are concentrated in commercial properties. Consider adding residential or industrial.", action: "Rebalance within class" },
                    { title: "Consider Infrastructure Projects", description: "Infrastructure assets can provide steady income and have shown strong performance.", action: "Increase by 3-5%" },
                    { title: "Review Art Investments", description: "Your art portfolio has underperformed. Consider rebalancing within this asset class.", action: "Optimize selections" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {item.action}
                        </Badge>
                        <a href="#" className="text-sm text-primary hover:underline">Apply Recommendation</a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
