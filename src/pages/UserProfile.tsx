
import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/custom-label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Edit, Shield, User, Wallet } from "lucide-react";

const UserProfile = () => {
  const { session } = useAuth();
  const user = session?.user;
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would call an API to update the user profile
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
    
    setIsEditing(false);
  };
  
  // Handle password change
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation don't match.",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call an API to update the password
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully."
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your personal information and account settings
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="text-4xl">{user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{user?.name || "User"}</CardTitle>
                    <CardDescription>{user?.email || ""}</CardDescription>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                      />
                    ) : (
                      <div className="px-3 py-2 rounded-md bg-muted">{user?.name || "N/A"}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    ) : (
                      <div className="px-3 py-2 rounded-md bg-muted">{user?.email || "N/A"}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <div className="px-3 py-2 rounded-md bg-muted capitalize">{user?.role || "User"}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="kycStatus">KYC Status</Label>
                    <div className="flex items-center space-x-2">
                      <div className={`px-3 py-1.5 rounded-full text-xs font-medium
                        ${user?.kycStatus === "approved" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                          user?.kycStatus === "pending" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" :
                          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}>
                        {user?.kycStatus || "Not Started"}
                      </div>
                      {user?.kycStatus !== "approved" && (
                        <Button variant="outline" size="sm" asChild>
                          <a href="/kyc">Complete KYC</a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                {isEditing && (
                  <div className="mt-6">
                    <Button type="submit">Save Changes</Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
          
          {/* Security Card */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and account security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        type="password" 
                        value={currentPassword} 
                        onChange={(e) => setCurrentPassword(e.target.value)} 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="mt-2">Change Password</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Wallet Connection</CardTitle>
                <CardDescription>
                  Connect your blockchain wallet
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user?.wallet ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="walletAddress">Wallet Address</Label>
                      <div className="px-3 py-2 rounded-md bg-muted font-mono text-sm truncate">
                        {user.wallet}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Disconnect</Button>
                      <Button variant="outline" size="sm">View on Explorer</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>No wallet connected</AlertTitle>
                      <AlertDescription>
                        Connect your wallet to trade tokens and manage your digital assets.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline">
                        <Wallet className="mr-2 h-4 w-4" />
                        Connect Wallet
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent platform activity and transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <div className="font-medium">
                          {[
                            "Logged in from new device",
                            "Updated profile information",
                            "Viewed Token ABC details",
                            "Connected wallet",
                            "Changed password"
                          ][i]}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(Date.now() - i * 86400000).toLocaleDateString()} at {new Date(Date.now() - i * 86400000).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="text-muted-foreground">
                        {["Security", "Account", "Tokens", "Wallet", "Security"][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View All Activity</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Documents</CardTitle>
                <CardDescription>
                  Manage your identification documents and certificates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertTitle>Your documents are securely stored</AlertTitle>
                    <AlertDescription>
                      All files are encrypted and only accessible for verification purposes.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="rounded-lg border divide-y">
                    {[
                      { name: "ID Document", status: "Verified", date: "2023-01-15" },
                      { name: "Proof of Address", status: "Verified", date: "2023-01-15" },
                      { name: "Selfie Verification", status: "Verified", date: "2023-01-15" },
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-4">
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Uploaded on {new Date(doc.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-xs py-1 px-2 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            {doc.status}
                          </div>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Upload New Document</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "email_notifications", title: "Email Notifications", description: "Receive updates and alerts via email" },
                    { id: "login_alerts", title: "Login Alerts", description: "Get notified of new logins to your account" },
                    { id: "transaction_alerts", title: "Transaction Alerts", description: "Receive notifications for token transactions" },
                    { id: "marketing_emails", title: "Marketing Emails", description: "Receive news about new features and offers" },
                  ].map(pref => (
                    <div key={pref.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{pref.title}</div>
                        <div className="text-sm text-muted-foreground">{pref.description}</div>
                      </div>
                      <div className="flex items-center h-8">
                        <input
                          type="checkbox"
                          id={pref.id}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked={pref.id !== "marketing_emails"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
