
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { createToken } from "@/lib/api";
import { Coins, HelpCircle, FileText, Upload, ArrowRight, AlertTriangle } from "lucide-react";

const TokenIssuance = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [tokenType, setTokenType] = useState("real_estate");
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    supply: "",
    chain: "EVM",
    description: "",
    assetValue: "",
    assetLocation: "",
    assetDetails: "",
    legalDocumentation: null,
    valueDocumentation: null,
    issuerDetails: {
      companyName: "",
      registrationNumber: "",
      jurisdiction: "",
    },
  });

  // Create token mutation
  const createTokenMutation = useMutation({
    mutationFn: (tokenData: any) => {
      const numericSupply = BigInt(parseInt(tokenData.supply));
      return createToken({
        name: tokenData.name,
        symbol: tokenData.symbol,
        supply: numericSupply,
        issuerId: session?.user?.id || "",
        chain: tokenData.chain,
        contractAddress: "", // This would be set after blockchain deployment
        ipfsHash: "", // This would be set after IPFS upload
      });
    },
    onSuccess: () => {
      toast({
        title: "Token created successfully",
        description: "Your asset has been tokenized.",
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Token creation failed",
        description: "There was an error creating your token. Please try again.",
        variant: "destructive",
      });
      console.error("Token creation error:", error);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIssuerDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      issuerDetails: {
        ...prev.issuerDetails,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTokenMutation.mutate(formData);
  };

  const nextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  // Check if user can create tokens based on KYC status
  const canCreateTokens = session?.user?.kycStatus === "approved";

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Token Issuance</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage tokenized real-world assets
          </p>
        </div>

        {!canCreateTokens && (
          <Alert className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertTitle>KYC Required</AlertTitle>
            <AlertDescription>
              You need to complete KYC verification before you can create tokens.
              <div className="mt-2">
                <Button size="sm" asChild>
                  <a href="/kyc">Complete KYC</a>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Create New Token</CardTitle>
            <CardDescription>
              Tokenize your real-world asset on the blockchain
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
                    <span className="ml-2 text-sm font-medium">Asset Selection</span>
                  </div>
                </div>
                <div className={`flex-1 border-b-2 pb-2 ${activeStep >= 2 ? "border-primary" : "border-muted"}`}>
                  <div className="flex items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${activeStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      2
                    </div>
                    <span className="ml-2 text-sm font-medium">Token Details</span>
                  </div>
                </div>
                <div className={`flex-1 border-b-2 pb-2 ${activeStep >= 3 ? "border-primary" : "border-muted"}`}>
                  <div className="flex items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${activeStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      3
                    </div>
                    <span className="ml-2 text-sm font-medium">Documentation</span>
                  </div>
                </div>
                <div className={`flex-1 border-b-2 pb-2 ${activeStep >= 4 ? "border-primary" : "border-muted"}`}>
                  <div className="flex items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${activeStep >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      4
                    </div>
                    <span className="ml-2 text-sm font-medium">Review & Deploy</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Select Asset Type</h3>
                    <Tabs 
                      defaultValue={tokenType} 
                      className="w-full"
                      onValueChange={setTokenType}
                    >
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="real_estate">Real Estate</TabsTrigger>
                        <TabsTrigger value="art">Art & Collectibles</TabsTrigger>
                        <TabsTrigger value="commodity">Commodities</TabsTrigger>
                        <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                      </TabsList>

                      <TabsContent value="real_estate" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Real Estate Tokenization</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="list-disc pl-5 space-y-2 text-sm">
                                <li>Commercial & residential properties</li>
                                <li>Fractional ownership of buildings</li>
                                <li>Land and development projects</li>
                                <li>REITs and property funds</li>
                              </ul>
                            </CardContent>
                          </Card>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="assetLocation">Property Location</Label>
                              <Input
                                id="assetLocation"
                                name="assetLocation"
                                placeholder="City, Country"
                                value={formData.assetLocation}
                                onChange={handleInputChange}
                                disabled={!canCreateTokens}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="assetValue">Estimated Value (USD)</Label>
                              <Input
                                id="assetValue"
                                name="assetValue"
                                placeholder="e.g. 1,000,000"
                                value={formData.assetValue}
                                onChange={handleInputChange}
                                disabled={!canCreateTokens}
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="art" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Art & Collectibles</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="list-disc pl-5 space-y-2 text-sm">
                                <li>Fine art and paintings</li>
                                <li>Sculptures and installations</li>
                                <li>Rare collectibles and memorabilia</li>
                                <li>Digital art with physical components</li>
                              </ul>
                            </CardContent>
                          </Card>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="assetDetails">Art Details</Label>
                              <Input
                                id="assetDetails"
                                name="assetDetails"
                                placeholder="Artist, Title, Year"
                                value={formData.assetDetails}
                                onChange={handleInputChange}
                                disabled={!canCreateTokens}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="assetValue">Appraised Value (USD)</Label>
                              <Input
                                id="assetValue"
                                name="assetValue"
                                placeholder="e.g. 250,000"
                                value={formData.assetValue}
                                onChange={handleInputChange}
                                disabled={!canCreateTokens}
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="commodity" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Commodities</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="list-disc pl-5 space-y-2 text-sm">
                                <li>Precious metals (gold, silver, platinum)</li>
                                <li>Agricultural products and harvests</li>
                                <li>Energy resources</li>
                                <li>Industrial metals and materials</li>
                              </ul>
                            </CardContent>
                          </Card>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="assetDetails">Commodity Type</Label>
                              <Input
                                id="assetDetails"
                                name="assetDetails"
                                placeholder="e.g. Gold, Coffee, Natural Gas"
                                value={formData.assetDetails}
                                onChange={handleInputChange}
                                disabled={!canCreateTokens}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="assetValue">Total Value (USD)</Label>
                              <Input
                                id="assetValue"
                                name="assetValue"
                                placeholder="e.g. 500,000"
                                value={formData.assetValue}
                                onChange={handleInputChange}
                                disabled={!canCreateTokens}
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="infrastructure" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Infrastructure</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="list-disc pl-5 space-y-2 text-sm">
                                <li>Roads, bridges, and transportation</li>
                                <li>Energy generation facilities</li>
                                <li>Telecommunications networks</li>
                                <li>Public utilities and service structures</li>
                              </ul>
                            </CardContent>
                          </Card>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="assetDetails">Project Details</Label>
                              <Input
                                id="assetDetails"
                                name="assetDetails"
                                placeholder="Project name and type"
                                value={formData.assetDetails}
                                onChange={handleInputChange}
                                disabled={!canCreateTokens}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="assetLocation">Location</Label>
                              <Input
                                id="assetLocation"
                                name="assetLocation"
                                placeholder="City, Country"
                                value={formData.assetLocation}
                                onChange={handleInputChange}
                                disabled={!canCreateTokens}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="assetValue">Project Value (USD)</Label>
                              <Input
                                id="assetValue"
                                name="assetValue"
                                placeholder="e.g. 10,000,000"
                                value={formData.assetValue}
                                onChange={handleInputChange}
                                disabled={!canCreateTokens}
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Asset Description</Label>
                    <Input
                      id="description"
                      name="description"
                      placeholder="Detailed description of the asset"
                      value={formData.description}
                      onChange={handleInputChange}
                      disabled={!canCreateTokens}
                    />
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Token Configuration</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Token Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="e.g. Manhattan Real Estate Token"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            disabled={!canCreateTokens}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="symbol">Token Symbol</Label>
                          <Input
                            id="symbol"
                            name="symbol"
                            placeholder="e.g. MRET"
                            value={formData.symbol}
                            onChange={handleInputChange}
                            required
                            disabled={!canCreateTokens}
                          />
                          <p className="text-xs text-muted-foreground">
                            Usually 3-5 characters, all caps
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="supply">Token Supply</Label>
                          <Input
                            id="supply"
                            name="supply"
                            type="number"
                            min="1"
                            placeholder="e.g. 1000000"
                            value={formData.supply}
                            onChange={handleInputChange}
                            required
                            disabled={!canCreateTokens}
                          />
                          <p className="text-xs text-muted-foreground">
                            Total number of tokens to be created
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="chain">Blockchain</Label>
                          <Select 
                            defaultValue={formData.chain}
                            onValueChange={(value) => handleSelectChange("chain", value)}
                            disabled={!canCreateTokens}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select blockchain" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="EVM">Ethereum (ERC-20)</SelectItem>
                              <SelectItem value="BSC">Binance Smart Chain (BEP-20)</SelectItem>
                              <SelectItem value="Polygon">Polygon</SelectItem>
                              <SelectItem value="Solana">Solana</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Issuer Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company/Entity Name</Label>
                          <Input
                            id="companyName"
                            name="companyName"
                            placeholder="Legal entity name"
                            value={formData.issuerDetails.companyName}
                            onChange={handleIssuerDetailsChange}
                            disabled={!canCreateTokens}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="registrationNumber">Registration Number</Label>
                          <Input
                            id="registrationNumber"
                            name="registrationNumber"
                            placeholder="Business registration number"
                            value={formData.issuerDetails.registrationNumber}
                            onChange={handleIssuerDetailsChange}
                            disabled={!canCreateTokens}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jurisdiction">Jurisdiction</Label>
                        <Input
                          id="jurisdiction"
                          name="jurisdiction"
                          placeholder="Country of registration"
                          value={formData.issuerDetails.jurisdiction}
                          onChange={handleIssuerDetailsChange}
                          disabled={!canCreateTokens}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Legal Documentation</h3>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Title Deed / Ownership Proof</Label>
                            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                              <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                              <p className="mt-2 text-sm text-muted-foreground">
                                Upload legal documentation proving ownership
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PDF, PNG, JPG (max. 10MB)
                              </p>
                              <input type="file" className="hidden" disabled={!canCreateTokens} />
                              <Button size="sm" className="mt-4" type="button" disabled={!canCreateTokens}>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Document
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Valuation Report</Label>
                            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                              <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                              <p className="mt-2 text-sm text-muted-foreground">
                                Upload recent valuation report for the asset
                              </p>
                              <input type="file" className="hidden" disabled={!canCreateTokens} />
                              <Button size="sm" className="mt-4" type="button" disabled={!canCreateTokens}>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Document
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Additional Documentation</Label>
                            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                              <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                              <p className="mt-2 text-sm text-muted-foreground">
                                Any additional documents (optional)
                              </p>
                              <input type="file" className="hidden" disabled={!canCreateTokens} />
                              <Button size="sm" className="mt-4" type="button" disabled={!canCreateTokens}>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Documents
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Alert>
                    <HelpCircle className="h-4 w-4" />
                    <AlertTitle>Documentation Requirements</AlertTitle>
                    <AlertDescription>
                      All documents will be reviewed by our compliance team before token deployment.
                      This process typically takes 1-3 business days.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {activeStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Review Token Details</h3>
                    <div className="rounded-lg border p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-primary mb-2">Token Information</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-muted-foreground">Name:</span>
                              <span className="font-medium">{formData.name || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-muted-foreground">Symbol:</span>
                              <span className="font-medium">{formData.symbol || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-muted-foreground">Supply:</span>
                              <span className="font-medium">{formData.supply || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-muted-foreground">Blockchain:</span>
                              <span className="font-medium">{formData.chain || "EVM"}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-primary mb-2">Asset Information</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-muted-foreground">Type:</span>
                              <span className="font-medium">{tokenType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-muted-foreground">Value:</span>
                              <span className="font-medium">{formData.assetValue ? `$${formData.assetValue}` : "Not provided"}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-muted-foreground">Location:</span>
                              <span className="font-medium">{formData.assetLocation || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-muted-foreground">Documentation:</span>
                              <span className="font-medium">{formData.legalDocumentation ? "Uploaded" : "Not uploaded"}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium text-primary mb-2">Fees & Deployment</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between border-b pb-1">
                            <span className="text-muted-foreground">Platform Fee:</span>
                            <span className="font-medium">1.5% of asset value</span>
                          </div>
                          <div className="flex justify-between border-b pb-1">
                            <span className="text-muted-foreground">Gas Fee (est.):</span>
                            <span className="font-medium">$50 - $150 USD</span>
                          </div>
                          <div className="flex justify-between border-b pb-1">
                            <span className="text-muted-foreground">Deployment Time:</span>
                            <span className="font-medium">3-5 business days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Important Legal Notice</AlertTitle>
                    <AlertDescription>
                      By issuing this token, you confirm that you have legal ownership of the underlying asset
                      and the right to tokenize it. False claims may result in legal consequences and account termination.
                    </AlertDescription>
                  </Alert>

                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      required
                      disabled={!canCreateTokens}
                    />
                    <label htmlFor="terms" className="text-sm">
                      I confirm that all information provided is accurate and I agree to the
                      <a href="#" className="text-primary hover:underline"> Token Issuance Agreement</a> and
                      <a href="#" className="text-primary hover:underline"> Terms of Service</a>.
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
            
            {activeStep < 4 ? (
              <Button onClick={nextStep} disabled={!canCreateTokens}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                onClick={handleSubmit}
                disabled={createTokenMutation.isPending || !canCreateTokens}
              >
                {createTokenMutation.isPending ? "Processing..." : "Create Token"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TokenIssuance;
