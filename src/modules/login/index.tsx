import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginForm } from "./use-login-form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Card } from "@/components/ui/card";
import { Loader2, User, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOGO } from "@/constants/logo";

export default function LoginForm() {
  const { onSubmit, loading, ...form } = useLoginForm();
  return (
    <div>
      <Card className="bg-muted shadow-lg flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center justify-center mx-auto w-11/12 sm:w-4/5 md:min-w-4xl max-w-6xl h-full">
          <div className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-stretch shadow-xl rounded-xl overflow-hidden h-full">
              {/* Blue section with logo and title */}
              <div
                className="bg-primary text-white text-center p-6 sm:p-8 w-full h-1/2 
                lg:h-auto lg:w-1/2 flex flex-col items-center justify-center  md:py-16"
              >
                <div className="max-w-md mx-auto">
                  {/*logo */}
                  <img
                    src={LOGO}
                    alt="National Youth Federation Nepal"
                    className="mx-auto mb-4 w-40 sm:w-60 md:w-72 lg:w-[540px]"
                  />
                  <h1 className="text-2xl md:text-3xl font-medium mb-2">
                    राष्ट्रिय युवा संघ नेपाल
                  </h1>
                  {/*divider */}
                  <div className="border-t border-white max-w-full my-6" />
                  <h2 className="text-xl font-bold mb-2">
                    १०औं राष्ट्रिय महाधिवेशन
                  </h2>
                  <p className="opacity-90">मा तपाईलाई स्वागत छ</p>

                  <div className="hidden lg:block mt-auto pt-16">
                    <p className="text-sm opacity-80">© युवा संघ नेपाल</p>
                  </div>
                </div>
              </div>

              {/* White section with form */}

              <div className="bg-white p-8 w-full h-1/2 lg:h-auto lg:w-1/2 flex items-center justify-center">
                <Form {...form}>
                  <form onSubmit={onSubmit} className="w-full space-y-8">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="flex items-center gap-3">
                              <User className="w-4 h-4 text-primary" />
                              प्रयोगकर्तानाम
                            </div>
                          </FormLabel>

                          <FormControl>
                            <Input
                              {...field}
                              placeholder="name@yfn.com"
                              disabled={loading}
                              className={cn(
                                loading
                                  ? "cursor-not-allowed"
                                  : "border-gray-300 focus:ring-primary focus:border-primary"
                              )}
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
                          <FormLabel>
                            <div className="flex items-center gap-3">
                              <Lock className="w-4 h-4 text-primary" /> पासवर्ड
                            </div>
                          </FormLabel>
                          <FormControl>
                            <PasswordInput
                              {...field}
                              className="border-gray-300 focus:ring-primary focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-md"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      ) : (
                        "लग-इन"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
