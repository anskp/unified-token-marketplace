
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, Shield, Bell, Lock, Key, AlertTriangle, CheckCircle2, Upload } from "lucide-react";

const UserProfile = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
    phone: "",
    company: "",
    bio: ""
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Function to handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  // Function to handle password change
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  // Function to handle profile input changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  // Function to handle password input changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Your account information
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                <AvatarFallback className="text-2xl">{session?.user?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{session?.user?.name || "User"}</h3>
              <p className="text-muted-foreground mb-2">{session?.user?.email}</p>
              <div className="flex space-x-2 mb-4">
                <Badge variant="outline">{session?.user?.role}</Badge>
                <Badge 
                  variant={session?.user?.kycStatus === "approved" ? "default" : "secondary"}
                  className={session?.user?.kycStatus === "approved" ? "bg-green-500" : ""}
                >
                  {session?.user?.kycStatus === "approved" ? "KYC Verified" : "KYC Pending"}
                </Badge>
              </div>
              <Separator className="mb-4" />
              <div className="space-y-2 w-full">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">User ID:</span>
                  <span className="font-mono truncate max-w-[150px]" title={session?.user?.id}>
                    {session?.user?.id || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Joined:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Wallet:</span>
                  <span className="truncate max-w-[150px]" title={session?.user?.wallet || "Not connected"}>
                    {session?.user?.wallet ? `${session.user.wallet.substring(0, 6)}...${session.user.wallet.substring(session.user.wallet.length - 4)}` : "Not connected"}
                  </span>
                </div>
              </div>
              {!session?.user?.wallet && (
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <a href="/wallet">Connect Wallet</a>
                </Button>
              )}
              {session?.user?.kycStatus !== "approved" && (
                <Button className="mt-4 w-full" asChild>
                  <a href="/kyc">Complete KYC</a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Settings Section */}
          <div className="md:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleProfileUpdate}>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={profileData.name}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={profileData.email}
                              onChange={handleProfileChange}
                              disabled
                            />
                            <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={profileData.phone}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input
                              id="company"
                              name="company"
                              value={profileData.company}
                              onChange={handleProfileChange}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">About</Label>
                          <textarea
                            id="bio"
                            name="bio"
                            value={profileData.bio}
                            onChange={handleProfileChange}
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Brief description about yourself"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="image">Profile Picture</Label>
                          <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                            <div className="flex flex-col items-center">
                              <div className="mb-3">
                                {profileData.image ? (
                                  <img
                                    src={profileData.image}
                                    alt="Profile preview"
                                    className="h-16 w-16 rounded-full object-cover"
                                  />
                                ) : (
                                  <User className="h-16 w-16 text-muted-foreground" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                SVG, PNG, JPG or GIF (max. 2MB)
                              </p>
                              <input type="file" className="hidden" accept="image/*" />
                              <Button size="sm" className="mt-4" type="button">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Image
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button type="submit">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handlePasswordChange}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>
                        <Alert>
                          <Key className="h-4 w-4" />
                          <AlertTitle>Password Requirements</AlertTitle>
                          <AlertDescription>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                              <li>At least 8 characters long</li>
                              <li>Include at least one uppercase letter</li>
                              <li>Include at least one number</li>
                              <li>Include at least one special character</li>
                            </ul>
                          </AlertDescription>
                        </Alert>
                      </div>

                      <div className="mt-6">
                        <Button type="submit">
                          Change Password
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-muted">
                          <Lock className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium">2FA Authentication</h4>
                          <p className="text-sm text-muted-foreground">Protect your account with 2FA</p>
                        </div>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Login Sessions</CardTitle>
                    <CardDescription>
                      Manage your active sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Current Session</h4>
                          <p className="text-sm text-muted-foreground">
                            {navigator.userAgent.split(" ").slice(-1)[0].split("/")[0]} • {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <Separator />
                      <div className="flex justify-end">
                        <Button variant="destructive">Sign Out All Devices</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose what notifications you want to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      {[
                        { 
                          id: "email_marketing", 
                          title: "Email Marketing", 
                          description: "Receive emails about new products, features, and more." 
                        },
                        { 
                          id: "email_security", 
                          title: "Security Alerts", 
                          description: "Important notifications about your account security." 
                        },
                        { 
                          id: "email_system", 
                          title: "System Notifications", 
                          description: "System alerts and notifications." 
                        },
                        { 
                          id: "email_updates", 
                          title: "Token Updates", 
                          description: "Get notified about your token activity and price changes." 
                        },
                      ].map(item => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <div className="flex items-center h-8">
                            <input
                              type="checkbox"
                              id={item.id}
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              defaultChecked={item.id === "email_security"}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="pt-2">
                      <h3 className="font-medium mb-3">Communication Channels</h3>
                      <div className="space-y-4">
                        {[
                          { id: "channel_email", title: "Email", icon: "mail" },
                          { id: "channel_sms", title: "SMS", icon: "smartphone" },
                          { id: "channel_push", title: "Push Notifications", icon: "bell" },
                        ].map(channel => (
                          <div key={channel.id} className="flex items-center justify-between">
                            <span>{channel.title}</span>
                            <div className="flex items-center h-8">
                              <input
                                type="checkbox"
                                id={channel.id}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                defaultChecked={channel.id === "channel_email"}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
