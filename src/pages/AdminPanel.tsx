
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getAllTokens, updateUserKYCStatus } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/custom-label";
import { 
  Users, 
  Coins, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  UserCheck,
  ShieldAlert,
  Database,
  BarChart4,
  List
} from "lucide-react";

const AdminPanel = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [kycAction, setKycAction] = useState<string | null>(null);
  const [isKycDialogOpen, setIsKycDialogOpen] = useState(false);
  const [kycReason, setKycReason] = useState("");

  // If not admin, redirect to dashboard
  React.useEffect(() => {
    if (session && session.user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  // Fetch all tokens
  const { data: tokens, isLoading: tokensLoading } = useQuery({
    queryKey: ["tokens"],
    queryFn: getAllTokens
  });

  // Mock users data
  const users = [
    { 
      id: "1", 
      name: "John Doe", 
      email: "john@example.com", 
      role: "investor", 
      kycStatus: "approved", 
      tokens: 3,
      registeredAt: "2023-04-15T10:30:00Z"
    },
    { 
      id: "2", 
      name: "Alice Smith", 
      email: "alice@example.com", 
      role: "issuer", 
      kycStatus: "pending", 
      tokens: 1,
      registeredAt: "2023-05-22T14:45:00Z"
    },
    { 
      id: "3", 
      name: "Bob Johnson", 
      email: "bob@example.com", 
      role: "investor", 
      kycStatus: "pending_review", 
      tokens: 0,
      registeredAt: "2023-06-10T09:15:00Z"
    },
    { 
      id: "4", 
      name: "Carol Williams", 
      email: "carol@example.com", 
      role: "issuer", 
      kycStatus: "rejected", 
      tokens: 2,
      registeredAt: "2023-03-05T11:20:00Z"
    },
    { 
      id: "5", 
      name: "David Brown", 
      email: "david@example.com", 
      role: "investor", 
      kycStatus: "approved", 
      tokens: 5,
      registeredAt: "2023-01-18T16:40:00Z"
    },
  ];

  // Mock pending KYC data
  const pendingKyc = [
    { 
      id: "1", 
      userId: "3", 
      userName: "Bob Johnson", 
      email: "bob@example.com", 
      documentType: "passport", 
      submittedAt: "2023-06-10T09:15:00Z",
      status: "pending_review"
    },
    { 
      id: "2", 
      userId: "2", 
      userName: "Alice Smith", 
      email: "alice@example.com", 
      documentType: "id_card", 
      submittedAt: "2023-05-22T14:45:00Z",
      status: "pending"
    },
  ];

  // Filter users by search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Handle KYC action
  const handleKycAction = (user: any, action: string) => {
    setSelectedUser(user);
    setKycAction(action);
    setIsKycDialogOpen(true);
  };

  // Submit KYC update
  const submitKycUpdate = () => {
    if (!selectedUser || !kycAction) return;
    
    // In a real app, this would call an API
    let newStatus = "";
    if (kycAction === "approve") {
      newStatus = "approved";
    } else if (kycAction === "reject") {
      newStatus = "rejected";
    }
    
    // Call API to update KYC status
    if (newStatus) {
      // This would be a real API call
      // updateUserKYCStatus(selectedUser.id, newStatus);
      
      toast({
        title: `KYC ${kycAction}d`,
        description: `Successfully ${kycAction}d KYC for ${selectedUser.name}`,
      });
    }
    
    setIsKycDialogOpen(false);
    setSelectedUser(null);
    setKycAction(null);
    setKycReason("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">
            Manage users, tokens, and platform settings
          </p>
        </div>

        {/* Admin Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                {users.filter(u => u.role === "investor").length} investors, {users.filter(u => u.role === "issuer").length} issuers
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Tokens
              </CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tokensLoading ? "..." : tokens?.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                Across all asset types
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending KYC
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingKyc.length}</div>
              <p className="text-xs text-amber-500">
                Requires review
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                System Status
              </CardTitle>
              <ShieldAlert className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Healthy</div>
              <p className="text-xs text-green-500">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="kyc">
              <UserCheck className="h-4 w-4 mr-2" />
              KYC Verification
            </TabsTrigger>
            <TabsTrigger value="tokens">
              <Coins className="h-4 w-4 mr-2" />
              Tokens
            </TabsTrigger>
            <TabsTrigger value="system">
              <Database className="h-4 w-4 mr-2" />
              System
            </TabsTrigger>
          </TabsList>
          
          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage platform users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users by name or email..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="investor">Investors</SelectItem>
                      <SelectItem value="issuer">Issuers</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="KYC Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>KYC Status</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Tokens</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              user.kycStatus === "approved" ? "default" : 
                              user.kycStatus === "pending" || user.kycStatus === "pending_review" ? "outline" : 
                              "destructive"
                            }
                            className={user.kycStatus === "approved" ? "bg-green-500" : ""}
                          >
                            {user.kycStatus === "pending_review" ? "Under Review" : user.kycStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(user.registeredAt)}</TableCell>
                        <TableCell>{user.tokens}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleKycAction(user, user.kycStatus === "approved" ? "reject" : "approve")}
                            >
                              {user.kycStatus === "approved" ? "Revoke KYC" : "Approve KYC"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No users found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* KYC Verification Tab */}
          <TabsContent value="kyc" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>KYC Verification Requests</CardTitle>
                <CardDescription>
                  Review and approve user identity verification requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Pending Verifications</AlertTitle>
                  <AlertDescription>
                    There are {pendingKyc.length} KYC verification requests waiting for review.
                  </AlertDescription>
                </Alert>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Document Type</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingKyc.map((kyc) => (
                      <TableRow key={kyc.id}>
                        <TableCell className="font-medium">{kyc.userName}</TableCell>
                        <TableCell>{kyc.email}</TableCell>
                        <TableCell className="capitalize">{kyc.documentType}</TableCell>
                        <TableCell>{formatDate(kyc.submittedAt)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {kyc.status === "pending_review" ? "Under Review" : kyc.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View Documents
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              className="bg-green-500 hover:bg-green-600"
                              onClick={() => handleKycAction(
                                { id: kyc.userId, name: kyc.userName }, 
                                "approve"
                              )}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleKycAction(
                                { id: kyc.userId, name: kyc.userName }, 
                                "reject"
                              )}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {pendingKyc.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No pending KYC verification requests
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tokens Tab */}
          <TabsContent value="tokens" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Token Management</CardTitle>
                <CardDescription>
                  Review and manage tokenized assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tokens by name or symbol..."
                      className="pl-8"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Asset Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="real_estate">Real Estate</SelectItem>
                      <SelectItem value="art">Art & Collectibles</SelectItem>
                      <SelectItem value="commodity">Commodities</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token Name</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Supply</TableHead>
                      <TableHead>Issuer</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tokensLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Loading token data...
                        </TableCell>
                      </TableRow>
                    ) : tokens && tokens.length > 0 ? (
                      tokens.map((token: any) => (
                        <TableRow key={token.id}>
                          <TableCell className="font-medium">{token.name}</TableCell>
                          <TableCell>{token.symbol}</TableCell>
                          <TableCell>{String(token.supply)}</TableCell>
                          <TableCell>{token.issuer?.name || "Unknown"}</TableCell>
                          <TableCell>{new Date(token.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                Audit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No tokens found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* System Tab */}
          <TabsContent value="system" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>
                    Monitor platform performance and status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {[
                      { name: "API Services", status: "operational", uptime: "99.98%" },
                      { name: "Database", status: "operational", uptime: "99.95%" },
                      { name: "Authentication", status: "operational", uptime: "99.99%" },
                      { name: "Blockchain Node", status: "operational", uptime: "99.90%" },
                      { name: "File Storage", status: "operational", uptime: "99.93%" },
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${service.status === "operational" ? "bg-green-500" : "bg-amber-500"}`} />
                          <span>{service.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2 capitalize">
                            {service.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{service.uptime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">System Resources</h3>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Healthy
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { name: "CPU Usage", value: "42%" },
                        { name: "Memory Usage", value: "68%" },
                        { name: "Disk Space", value: "56%" },
                      ].map((resource, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{resource.name}</span>
                            <span>{resource.value}</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary"
                              style={{ width: resource.value }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>
                    Configure global platform parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="platformFee">Platform Fee (%)</Label>
                      <Input id="platformFee" defaultValue="1.5" />
                      <p className="text-xs text-muted-foreground">
                        Fee charged on each transaction
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="minWithdrawal">Minimum Withdrawal (USD)</Label>
                      <Input id="minWithdrawal" defaultValue="100" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="maxWithdrawal">Maximum Withdrawal (USD)</Label>
                      <Input id="maxWithdrawal" defaultValue="25000" />
                    </div>
                    
                    <div className="pt-2">
                      <h3 className="font-medium mb-3">Security Settings</h3>
                      
                      <div className="space-y-4">
                        {[
                          { id: "requireKyc", title: "Require KYC for all users", defaultChecked: true },
                          { id: "enforceStrongPasswords", title: "Enforce strong passwords", defaultChecked: true },
                          { id: "allowGuests", title: "Allow guest browsing", defaultChecked: false },
                          { id: "maintenanceMode", title: "Maintenance mode", defaultChecked: false },
                        ].map(setting => (
                          <div key={setting.id} className="flex items-center justify-between">
                            <span>{setting.title}</span>
                            <div className="flex items-center h-8">
                              <input
                                type="checkbox"
                                id={setting.id}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                defaultChecked={setting.defaultChecked}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Settings</Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>
                  View platform activity and error logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="activity">
                  <TabsList>
                    <TabsTrigger value="activity">Activity Logs</TabsTrigger>
                    <TabsTrigger value="error">Error Logs</TabsTrigger>
                    <TabsTrigger value="auth">Auth Logs</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="activity" className="space-y-4 mt-4">
                    <div className="h-[300px] overflow-y-auto rounded border p-4 bg-muted/30 font-mono text-xs">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="pb-2 border-b mb-2 last:border-0 last:mb-0">
                          <div className="text-muted-foreground">
                            {new Date(Date.now() - i * 1000 * 60 * 15).toISOString()} [INFO]
                          </div>
                          <div>
                            {[
                              "User login successful for user_id=12345",
                              "Token purchase completed for token_id=789, amount=5.25",
                              "KYC verification updated for user_id=54321, status=approved",
                              "New user registered with email=user@example.com",
                              "Wallet connected for user_id=12345, wallet=0x1234...5678"
                            ][i % 5]}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <List className="mr-2 h-4 w-4" />
                        View All Logs
                      </Button>
                      <Button variant="outline" size="sm">
                        Download Logs
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="error" className="space-y-4 mt-4">
                    <div className="h-[300px] overflow-y-auto rounded border p-4 bg-muted/30 font-mono text-xs">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="pb-2 border-b mb-2 last:border-0 last:mb-0 text-red-500">
                          <div className="text-muted-foreground">
                            {new Date(Date.now() - i * 1000 * 60 * 120).toISOString()} [ERROR]
                          </div>
                          <div>
                            {[
                              "Database connection timeout after 30s",
                              "Failed to process payment for user_id=54321: Insufficient funds",
                              "Blockchain transaction failed: Gas limit exceeded",
                              "API rate limit exceeded for endpoint /api/tokens",
                              "Failed to validate KYC documents: File format not supported"
                            ][i]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="auth" className="space-y-4 mt-4">
                    <div className="h-[300px] overflow-y-auto rounded border p-4 bg-muted/30 font-mono text-xs">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="pb-2 border-b mb-2 last:border-0 last:mb-0">
                          <div className="text-muted-foreground">
                            {new Date(Date.now() - i * 1000 * 60 * 45).toISOString()} [{i % 5 === 0 ? "WARN" : "INFO"}]
                          </div>
                          <div className={i % 5 === 0 ? "text-amber-500" : ""}>
                            {[
                              "Failed login attempt for user_id=12345 from IP=192.168.1.1",
                              "User login successful for user_id=12345",
                              "Password reset requested for email=user@example.com",
                              "User logout for user_id=54321",
                              "Token refresh for user_id=12345"
                            ][i % 5]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* KYC Action Dialog */}
        <Dialog open={isKycDialogOpen} onOpenChange={setIsKycDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {kycAction === "approve" ? "Approve KYC Verification" : "Reject KYC Verification"}
              </DialogTitle>
              <DialogDescription>
                {kycAction === "approve"
                  ? "This will grant the user full access to platform features."
                  : "This will restrict the user from accessing certain platform features."
                }
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {selectedUser && (
                <div className="mb-4 p-3 bg-muted rounded">
                  <div className="text-sm text-muted-foreground">User</div>
                  <div className="font-medium">{selectedUser.name}</div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="reason">Reason {kycAction === "reject" && "(Required)"}</Label>
                <textarea
                  id="reason"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={kycAction === "approve" ? "Optional comment" : "Explain the reason for rejection"}
                  value={kycReason}
                  onChange={(e) => setKycReason(e.target.value)}
                  required={kycAction === "reject"}
                />
              </div>
              
              {kycAction === "reject" && (
                <Alert className="mt-4" variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    User will be notified about this rejection and may need to resubmit their KYC verification.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsKycDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={submitKycUpdate}
                disabled={kycAction === "reject" && !kycReason}
                variant={kycAction === "approve" ? "default" : "destructive"}
              >
                {kycAction === "approve" ? "Approve" : "Reject"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminPanel;
