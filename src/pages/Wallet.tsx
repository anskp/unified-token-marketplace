
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { createWalletForUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Copy, ExternalLink, AlertTriangle, CheckCircle2, Coins } from "lucide-react";

const Wallet = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [sendAmount, setSendAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);
  const [newWalletAddress, setNewWalletAddress] = useState("");

  // Connect wallet mutation
  const connectWalletMutation = useMutation({
    mutationFn: () => {
      return createWalletForUser(session?.user?.id || "", newWalletAddress);
    },
    onSuccess: () => {
      toast({
        title: "Wallet connected successfully",
        description: "Your wallet has been linked to your account.",
      });
      setIsConnectWalletOpen(false);
      // In a real app, you'd refetch the user data here
    },
    onError: (error) => {
      toast({
        title: "Failed to connect wallet",
        description: "There was an error connecting your wallet. Please try again.",
        variant: "destructive",
      });
      console.error("Wallet connection error:", error);
    }
  });

  // Check if user has a wallet
  const hasWallet = !!session?.user?.wallet;
  
  // Mock wallet data
  const walletData = {
    address: session?.user?.wallet || "0x0000000000000000000000000000000000000000",
    balance: "2,345.67",
    tokens: [
      { id: 1, name: "Manhattan Office Complex", symbol: "MNHTN", balance: "5.000", value: "$526.25", change: "+5.2%" },
      { id: 2, name: "Blue Chip Art Collection", symbol: "BART", balance: "12.500", value: "$976.88", change: "-2.4%" },
      { id: 3, name: "Renewable Energy Project", symbol: "RENW", balance: "3.250", value: "$697.13", change: "+12.3%" },
    ],
    transactions: [
      { id: 1, type: "receive", date: "2023-06-15", amount: "2.500", token: "MNHTN", from: "0x1234...5678", status: "completed" },
      { id: 2, type: "send", date: "2023-06-10", amount: "1.250", token: "BART", to: "0x8765...4321", status: "completed" },
      { id: 3, type: "receive", date: "2023-06-05", amount: "3.250", token: "RENW", from: "0x2468...1357", status: "completed" },
      { id: 4, type: "send", date: "2023-05-28", amount: "0.500", token: "MNHTN", to: "0x9876...5432", status: "completed" },
      { id: 5, type: "receive", date: "2023-05-20", amount: "4.000", token: "BART", from: "0x5555...7777", status: "completed" },
    ]
  };

  const handleConnectWallet = () => {
    connectWalletMutation.mutate();
  };

  const handleSend = () => {
    toast({
      title: "Transaction submitted",
      description: `Sent ${sendAmount} tokens to ${recipientAddress.substring(0, 6)}...${recipientAddress.substring(recipientAddress.length - 4)}`,
    });
    setSendAmount("");
    setRecipientAddress("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Wallet address copied to clipboard",
    });
  };

  // Format wallet address for display
  const formatAddress = (address: string) => {
    if (address.length < 12) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
          <p className="text-muted-foreground mt-2">
            Manage your digital assets and transactions
          </p>
        </div>

        {/* Wallet Status */}
        {hasWallet ? (
          <>
            {/* Wallet Overview Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <CardTitle>Wallet Overview</CardTitle>
                    <CardDescription>
                      Manage your digital assets and transactions
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(walletData.address)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Address
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`https://etherscan.io/address/${walletData.address}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on Explorer
                      </a>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
                  <div className="bg-muted p-3 rounded-lg flex items-center space-x-2">
                    <WalletIcon className="h-6 w-6 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Wallet Address</div>
                      <div className="font-mono text-sm sm:text-base">{formatAddress(walletData.address)}</div>
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Total Balance (USD)</div>
                    <div className="text-2xl font-bold">${walletData.balance}</div>
                  </div>
                </div>

                <Tabs defaultValue="assets" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="assets">Assets</TabsTrigger>
                    <TabsTrigger value="send">Send</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="assets" className="space-y-4 mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Token</TableHead>
                          <TableHead className="text-right">Balance</TableHead>
                          <TableHead className="text-right">Value (USD)</TableHead>
                          <TableHead className="text-right">24h Change</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {walletData.tokens.map((token) => (
                          <TableRow key={token.id}>
                            <TableCell className="font-medium">
                              <div>
                                <div>{token.name}</div>
                                <div className="text-xs text-muted-foreground">{token.symbol}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{token.balance}</TableCell>
                            <TableCell className="text-right">{token.value}</TableCell>
                            <TableCell className={`text-right ${token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                              {token.change}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                Trade
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-center">
                        <Coins className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium">Want to explore more assets?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Discover and invest in a variety of tokenized real-world assets
                        </p>
                        <Button asChild>
                          <a href="/marketplace">Explore Marketplace</a>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="send" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Send Tokens</CardTitle>
                        <CardDescription>
                          Transfer tokens to another wallet address
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="token">Select Token</Label>
                          <select
                            id="token"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {walletData.tokens.map((token) => (
                              <option key={token.id} value={token.symbol}>
                                {token.symbol} - Balance: {token.balance}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount</Label>
                          <Input 
                            id="amount" 
                            placeholder="0.00" 
                            value={sendAmount} 
                            onChange={(e) => setSendAmount(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recipient">Recipient Address</Label>
                          <Input 
                            id="recipient" 
                            placeholder="0x..." 
                            value={recipientAddress} 
                            onChange={(e) => setRecipientAddress(e.target.value)}
                          />
                        </div>
                        
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Important</AlertTitle>
                          <AlertDescription>
                            Double-check the recipient address before sending. Transactions cannot be reversed.
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={handleSend}
                          disabled={!sendAmount || !recipientAddress}
                        >
                          Send Tokens
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="history" className="space-y-4 mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Token</TableHead>
                          <TableHead>From/To</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {walletData.transactions.map((tx) => (
                          <TableRow key={tx.id}>
                            <TableCell>
                              <div className="flex items-center">
                                {tx.type === "receive" ? (
                                  <div className="mr-2 p-1 rounded-full bg-green-100 dark:bg-green-900">
                                    <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                                  </div>
                                ) : (
                                  <div className="mr-2 p-1 rounded-full bg-blue-100 dark:bg-blue-900">
                                    <ArrowUpRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                  </div>
                                )}
                                <span className="capitalize">{tx.type}</span>
                              </div>
                            </TableCell>
                            <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                            <TableCell>{tx.amount}</TableCell>
                            <TableCell>{tx.token}</TableCell>
                            <TableCell>
                              {tx.type === "receive" ? (
                                <span title={tx.from}>From: {tx.from.substring(0, 6)}...{tx.from.substring(tx.from.length - 4)}</span>
                              ) : (
                                <span title={tx.to}>To: {tx.to.substring(0, 6)}...{tx.to.substring(tx.to.length - 4)}</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant={tx.status === "completed" ? "outline" : "secondary"}>
                                {tx.status === "completed" ? (
                                  <div className="flex items-center">
                                    <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
                                    Completed
                                  </div>
                                ) : (
                                  tx.status
                                )}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* No Wallet State */}
            <Card>
              <CardHeader>
                <CardTitle>Connect Wallet</CardTitle>
                <CardDescription>
                  Connect your wallet to manage your digital assets
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="mb-4 rounded-full bg-muted p-6">
                  <WalletIcon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Wallet Connected</h3>
                <p className="text-muted-foreground mb-6 text-center">
                  Connect your wallet to view and manage your tokenized assets.
                </p>
                <Button onClick={() => setIsConnectWalletOpen(true)}>
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>

            {/* Connect Wallet Dialog */}
            <Dialog open={isConnectWalletOpen} onOpenChange={setIsConnectWalletOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Connect Your Wallet</DialogTitle>
                  <DialogDescription>
                    Enter your wallet address to connect it to your account
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="walletAddress">Wallet Address</Label>
                    <Input
                      id="walletAddress"
                      placeholder="0x..."
                      value={newWalletAddress}
                      onChange={(e) => setNewWalletAddress(e.target.value)}
                    />
                  </div>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      Make sure you provide the correct wallet address. You'll need access to this wallet to manage your assets.
                    </AlertDescription>
                  </Alert>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsConnectWalletOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleConnectWallet}
                    disabled={!newWalletAddress || connectWalletMutation.isPending}
                  >
                    {connectWalletMutation.isPending ? "Connecting..." : "Connect Wallet"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Wallet;
