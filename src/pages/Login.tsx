
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Apple, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "@/lib/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const Login = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // In a real application, you would call your API here
      // For demo purposes, we'll simulate a successful login
      console.log("Login attempt with:", values);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful sign-in (in a real app, the token would come from the server)
      const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTIzIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huZG9lQGdtYWlsLmNvbSJ9LCJleHAiOjE5MTYyMzkwMjJ9.fVd9kw4jyhMUQ-My_1m5YGGuHPrfEzeAK0ye4QlxqCk";
      signIn(mockToken);
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    // In a real application, this would redirect to the OAuth provider
    console.log(`Logging in with ${provider}`);
    toast({
      title: `${provider} login`,
      description: `${provider} authentication would happen here.`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="container max-w-md mx-auto flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full">
          <div className="mb-8 flex flex-col items-center justify-center">
            <img src="/lovable-uploads/a7f4a8a3-c829-4ea3-96e2-9c1c3e03265a.png" alt="Logo" className="h-12 mb-6" />
            <h1 className="text-4xl font-bold tracking-tight mb-2">Sign In</h1>
            <p className="text-gray-600">Happy to see you again!</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="johndoe@gmail.com" 
                        type="email" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Password</FormLabel>
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-blue-500 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="Enter your password" 
                        type="password" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-full"
              >
                Sign In
              </Button>
            </form>
          </Form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center gap-2 border rounded-lg py-2.5"
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path
                    d="M19.999 10.2217C19.999 9.61842 19.9532 9.04789 19.8656 8.49891H10.2002V12.2276H15.7195C15.4925 13.4766 14.7435 14.5365 13.6151 15.2313V17.7341H16.8613C18.7501 15.9933 19.999 13.3474 19.999 10.2217Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.2002 20.0001C12.9519 20.0001 15.2653 19.1142 16.8615 17.7341L13.6153 15.2313C12.7089 15.8458 11.5682 16.2048 10.2002 16.2048C7.54302 16.2048 5.28301 14.4299 4.49824 12.0001H1.15479V14.5713C2.7416 17.7645 6.21868 20.0001 10.2002 20.0001Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.49823 12.0001C4.29723 11.3886 4.18506 10.7361 4.18506 10.0001C4.18506 9.26413 4.29723 8.61163 4.49823 8.00007V5.42871H1.15479C0.420234 6.76683 0.000244141 8.33087 0.000244141 10.0001C0.000244141 11.6693 0.420234 13.2334 1.15479 14.5714L4.49823 12.0001Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.2002 3.79558C11.7002 3.79558 13.0438 4.29409 14.1042 5.30486L16.9695 2.4395C15.2657 0.898464 12.9519 0 10.2002 0C6.21868 0 2.7416 2.23554 1.15479 5.42872L4.49824 8.00008C5.28301 5.57018 7.54302 3.79558 10.2002 3.79558Z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Twitter")}
                className="flex items-center justify-center gap-2 border rounded-lg py-2.5"
              >
                <Twitter size={20} className="text-[#1DA1F2]" />
                <span>Twitter</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Apple")}
                className="flex items-center justify-center gap-2 border rounded-lg py-2.5 col-span-2"
              >
                <Apple size={20} />
                <span>Apple</span>
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
