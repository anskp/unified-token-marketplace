
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { getUserById, updateUserKYCStatus } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Check, AlertTriangle, ShieldCheck } from "lucide-react";

const KycVerification = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const userId = session?.user?.id || "";
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    idType: "passport",
    idNumber: "",
    phoneNumber: "",
  });

  // Fetch user data to get current KYC status
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId
  });

  // Mutation for updating KYC status
  const updateKycMutation = useMutation({
    mutationFn: (status: string) => updateUserKYCStatus(userId, status),
    onSuccess: () => {
      toast({
        title: "KYC submission successful",
        description: "Your verification is now pending review.",
      });
    },
    onError: (error) => {
      toast({
        title: "KYC submission failed",
        description: "There was an error submitting your information. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateKycMutation.mutate("pending_review");
  };

  const nextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">Loading KYC status...</div>
        </div>
      </DashboardLayout>
    );
  }

  // If KYC is already approved, show success message
  if (userData?.kycStatus === "approved") {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto">
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-6 w-6 text-green-600" />
                <CardTitle>KYC Verification Complete</CardTitle>
              </div>
              <CardDescription>
                Your identity has been verified successfully
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-white p-6 dark:bg-background">
                  <h3 className="text-lg font-medium">Verification Details</h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium text-green-600">Approved</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Verified On</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Verification Level</span>
                      <span className="font-medium">Level 2 (Full Access)</span>
                    </div>
                  </div>
                </div>
                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertTitle>All Features Unlocked</AlertTitle>
                  <AlertDescription>
                    You now have full access to all platform features including token issuance, trading, and withdrawal.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href="/dashboard">Return to Dashboard</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // If KYC is pending review, show pending message
  if (userData?.kycStatus === "pending_review") {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto">
          <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
                <CardTitle>KYC Verification Pending</CardTitle>
              </div>
              <CardDescription>
                Your submission is currently under review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-white p-6 dark:bg-background">
                  <h3 className="text-lg font-medium">Verification Status</h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium text-amber-600">Under Review</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Submitted On</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Estimated Completion</span>
                      <span className="font-medium">24-48 hours</span>
                    </div>
                  </div>
                </div>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Verification in Progress</AlertTitle>
                  <AlertDescription>
                    Our team is reviewing your submission. You'll be notified once the verification is complete.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href="/dashboard">Return to Dashboard</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // KYC form for new submissions
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">KYC Verification</h1>
          <p className="text-muted-foreground mt-2">
            Complete your identity verification to unlock full platform features
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Identity Verification</CardTitle>
            <CardDescription>
              This information is required for regulatory compliance and to protect against fraud.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between">
                <div className={`flex-1 border-b-2 pb-2 ${activeStep >= 1 ? "border-primary" : "border-muted"}`}>
                  <div className="flex items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${activeStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      1
                    </div>
                    <span className="ml-2 text-sm font-medium">Personal Information</span>
                  </div>
                </div>
                <div className={`flex-1 border-b-2 pb-2 ${activeStep >= 2 ? "border-primary" : "border-muted"}`}>
                  <div className="flex items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${activeStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      2
                    </div>
                    <span className="ml-2 text-sm font-medium">Identity Documents</span>
                  </div>
                </div>
                <div className={`flex-1 border-b-2 pb-2 ${activeStep >= 3 ? "border-primary" : "border-muted"}`}>
                  <div className="flex items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${activeStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      3
                    </div>
                    <span className="ml-2 text-sm font-medium">Review & Submit</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {activeStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Legal Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Legal Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Identity Document</h3>
                    <Tabs defaultValue="passport" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="passport">Passport</TabsTrigger>
                        <TabsTrigger value="id_card">ID Card</TabsTrigger>
                        <TabsTrigger value="driving_license">Driving License</TabsTrigger>
                      </TabsList>
                      <TabsContent value="passport" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="passportNumber">Passport Number</Label>
                          <Input
                            id="passportNumber"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Upload Passport Scan (Front)</Label>
                          <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                            <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG or PDF (max. 5MB)
                            </p>
                            <input type="file" className="hidden" />
                            <Button size="sm" className="mt-4" type="button">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload File
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="id_card" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="idCardNumber">ID Card Number</Label>
                          <Input
                            id="idCardNumber"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Upload ID (Front)</Label>
                            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                              <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                              <p className="mt-2 text-sm text-muted-foreground">
                                Click to upload
                              </p>
                              <input type="file" className="hidden" />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Upload ID (Back)</Label>
                            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                              <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                              <p className="mt-2 text-sm text-muted-foreground">
                                Click to upload
                              </p>
                              <input type="file" className="hidden" />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="driving_license" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="licenseNumber">License Number</Label>
                          <Input
                            id="licenseNumber"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Upload License (Front)</Label>
                            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                              <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                              <p className="mt-2 text-sm text-muted-foreground">
                                Click to upload
                              </p>
                              <input type="file" className="hidden" />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Upload License (Back)</Label>
                            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                              <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                              <p className="mt-2 text-sm text-muted-foreground">
                                Click to upload
                              </p>
                              <input type="file" className="hidden" />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Proof of Address</h3>
                    <div className="space-y-2">
                      <Label>Upload Address Verification Document</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                        <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Upload a utility bill, bank statement, or official letter
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Document must be less than 3 months old
                        </p>
                        <input type="file" className="hidden" />
                        <Button size="sm" className="mt-4" type="button">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Document
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Review Your Information</h3>
                    <div className="rounded-lg border p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Full Name</p>
                          <p className="font-medium">{formData.fullName || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date of Birth</p>
                          <p className="font-medium">{formData.dateOfBirth || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Nationality</p>
                          <p className="font-medium">{formData.nationality || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone Number</p>
                          <p className="font-medium">{formData.phoneNumber || "Not provided"}</p>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">{formData.address || "Not provided"}</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="text-sm text-muted-foreground">ID Type & Number</p>
                        <p className="font-medium">
                          {formData.idType && formData.idNumber
                            ? `${formData.idType.charAt(0).toUpperCase() + formData.idType.slice(1)}: ${formData.idNumber}`
                            : "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Important Notice</AlertTitle>
                    <AlertDescription>
                      By submitting this application, you confirm that all provided information is accurate and true.
                      Providing false information may result in account termination.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      required
                    />
                    <label htmlFor="terms" className="text-sm">
                      I confirm that all information provided is accurate and I agree to the
                      <a href="#" className="text-primary hover:underline"> Terms of Service</a> and
                      <a href="#" className="text-primary hover:underline"> Privacy Policy</a>.
                    </label>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {activeStep > 1 ? (
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <a href="/dashboard">Cancel</a>
              </Button>
            )}
            
            {activeStep < 3 ? (
              <Button onClick={nextStep}>
                Continue
              </Button>
            ) : (
              <Button 
                type="submit" 
                onClick={handleSubmit}
                disabled={updateKycMutation.isPending}
              >
                {updateKycMutation.isPending ? "Submitting..." : "Submit Verification"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default KycVerification;
