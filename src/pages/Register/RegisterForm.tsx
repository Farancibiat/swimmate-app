import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import  Button  from "@/components/ui/Button";
import Input  from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
// import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useSwimStore } from "@/store/useSwimStore";



interface CredentialResponse {
    credential?: string; // The JWT ID token returned by Google
    select_by?: string; // How the user selected the account (e.g., 'btn', 'auto')
    clientId?: string;  // The client ID used for authentication
    // [key: string]: any; // Allow for additional properties
  }
export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();
  const navigate = useNavigate();
  const setUser = useSwimStore((state) => state.setUser); // Zustand store hook

  const handleTraditionalRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        console.log('Passwords do not match.')
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Passwords do not match.",
    //   });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      setUser(data.user); // Store user data in Zustand
    //   toast({
    //     title: "Success",
    //     description: "Registration successful! Redirecting to dashboard...",
    console.log( "Registration successful! Redirecting to dashboard...");
    //   });
      navigate("/dashboard");
    } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Failed to register. Please try again.",
    //   });
    console.log("Failed to register. Please try again.", error)
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      if (!response.ok) {
        throw new Error("Google authentication failed");
      }

      const data = await response.json();
      setUser(data.user); // Store user data in Zustand
    //   toast({
    //     title: "Success",
    //     description: "Google login successful! Redirecting to dashboard...",
    //   });
    console.log("Google login successful! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Failed to authenticate with Google. Please try again.",
    //   });
    console.log("Failed to authenticate with Google. Please try again. : ", error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details or use Google to register.
        </p>
      </div>
      <form onSubmit={handleTraditionalRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e:{target:{value:string}}) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e:{target:{value:string}}) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e:{target:{value:string}}) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            // toast({
            //   variant: "destructive",
            //   title: "Error",
            //   description: "Google authentication failed. Please try again.",
            // });
            console.log("Google authentication failed. Please try again.")
          }}
          text="signup_with"
          theme="filled_blue"
          width="300px"
        />
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a href="/login" className="underline hover:text-primary">
          Sign in
        </a>
      </p>
    </div>
  );
}