
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllTokens } from "@/lib/api";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Coins, Users, Wallet, TrendingUp, PieChart } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Dashboard = () => {
  const { session } = useAuth();
  const user = session?.user;

  // Fetch all tokens
  const { data: tokens, isLoading: tokensLoading } = useQuery({
    queryKey: ["tokens"],
    queryFn: getAllTokens
  });

  // Stats data
  const stats = [
    {
      title: "Total Tokens",
      value: tokensLoading ? "Loading..." : tokens?.length || 0,
      description: "Tokenized assets on the platform",
      icon: Coins,
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Users",
      value: "2,452",
      description: "Total registered users",
      icon: Users,
      change: "+7.2%",
      trend: "up",
    },
    {
      title: "Market Volume",
      value: "$8.2M",
      description: "30-day trading volume",
      icon: TrendingUp,
      change: "+22.5%",
      trend: "up",
    },
    {
      title: "Wallet Balance",
      value: user?.wallet ? "$2,340" : "No Wallet",
      description: "Your current balance",
      icon: Wallet,
      change: "-3.1%",
      trend: "down",
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || "User"}</h2>
          <p className="text-muted-foreground">
            Here's an overview of your assets and market activity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                {stat.change && (
                  <p className={`text-xs mt-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {stat.change} from last month
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* KYC Status Card */}
        {user?.kycStatus !== "approved" && (
          <Card className="bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle>Complete Your KYC</CardTitle>
              <CardDescription>
                Verify your identity to unlock full platform features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="w-full sm:w-auto">
                  <a 
                    href="/kyc" 
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Start Verification
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Tabs */}
        <Tabs defaultValue="tokenization" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tokenization">My Tokens</TabsTrigger>
            <TabsTrigger value="marketplace">Market Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          {/* Tokenization Tab */}
          <TabsContent value="tokenization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Tokenized Assets</CardTitle>
                <CardDescription>
                  View and manage your tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                {tokensLoading ? (
                  <div className="text-center py-8">Loading your tokens...</div>
                ) : tokens && tokens.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tokens.slice(0, 3).map((token) => (
                      <Card key={token.id} className="overflow-hidden">
                        <AspectRatio ratio={16 / 9}>
                          <div className="flex h-full w-full items-center justify-center bg-muted">
                            <PieChart className="h-10 w-10 text-muted-foreground" />
                          </div>
                        </AspectRatio>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">{token.name}</CardTitle>
                          <CardDescription>{token.symbol}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">Supply:</div>
                            <div className="text-right font-medium">{String(token.supply)}</div>
                            <div className="text-muted-foreground">Chain:</div>
                            <div className="text-right font-medium">{token.chain}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {tokens.length > 3 && (
                      <a
                        href="/tokens/manage"
                        className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center hover:bg-accent"
                      >
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                          <Coins className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium">View All Tokens</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          You have {tokens.length - 3} more tokenized assets
                        </p>
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Coins className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No tokens found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You haven't created any tokens yet.
                    </p>
                    <a
                      href="/tokens/issue"
                      className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    >
                      Create Your First Token
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Overview</CardTitle>
                <CardDescription>
                  Recent marketplace activity and trending assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-medium">Trending Assets</h3>
                    <div className="rounded-lg border">
                      <div className="grid grid-cols-4 gap-4 p-4 text-sm font-medium">
                        <div>Asset</div>
                        <div className="text-right">Price</div>
                        <div className="text-right">Change</div>
                        <div className="text-right">Volume</div>
                      </div>
                      {[
                        { name: "Real Estate Token A", price: "$105.42", change: "+5.2%", volume: "$1.2M", trend: "up" },
                        { name: "Art Collection B", price: "$78.15", change: "-2.4%", volume: "$820K", trend: "down" },
                        { name: "Infrastructure C", price: "$214.50", change: "+12.3%", volume: "$3.5M", trend: "up" },
                        { name: "Commodity D", price: "$45.30", change: "+1.8%", volume: "$650K", trend: "up" },
                      ].map((asset, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-4 gap-4 p-4 text-sm hover:bg-muted"
                        >
                          <div>{asset.name}</div>
                          <div className="text-right">{asset.price}</div>
                          <div className={`text-right ${asset.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                            {asset.change}
                          </div>
                          <div className="text-right">{asset.volume}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <a
                      href="/marketplace"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      View Full Marketplace
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Overview of your portfolio performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="h-[240px] w-full rounded-lg border bg-muted p-6">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">Analytics charts will be displayed here</p>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      { title: "Portfolio Value", value: "$24,520", change: "+12.3%", period: "1y" },
                      { title: "ROI", value: "18.2%", change: "+5.1%", period: "1y" },
                      { title: "Asset Diversity", value: "8 Types", change: "+2", period: "6m" },
                    ].map((stat, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            {stat.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <p className="text-xs text-green-500">
                            {stat.change} ({stat.period})
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <a
                      href="/analytics"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      View Detailed Analytics
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
