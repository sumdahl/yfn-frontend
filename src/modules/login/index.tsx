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
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const { onSubmit, loading, ...form } = useLoginForm();
  return (
    <div>
      <Card className="bg-muted flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center justify-center mx-auto w-11/12 sm:w-4/5 md:min-w-4xl max-w-6xl">
          <div className="w-full">
            <div className="flex flex-col lg:flex-row lg:items-stretch shadow-xl rounded-xl overflow-hidden">
              {/* Red section with logo and title */}
              <div className="bg-primary text-white text-center p-6 sm:p-8 w-full lg:w-1/2 flex flex-col items-center justify-center md:py-16">
                <div className="max-w-md mx-auto">
                  <img
                    src="/logo.png"
                    alt="Nepal Government Emblem"
                    width={120}
                    height={120}
                    className="mx-auto mb-4"
                  />
                  <h1 className="text-2xl font-medium mb-2">नेपाल सरकार</h1>
                  <div className="border-t border-gray-300/30 max-w-full my-6" />
                  <h2 className="text-xl font-bold mb-2">
                    एकिकृत हाजिरी व्यवस्थापन प्रणाली
                  </h2>
                  <p className="text-xl">मा तपाईलाई स्वागत छ</p>

                  <div className="hidden lg:block mt-auto pt-16">
                    <p className="text-sm">© सूचना प्रविधि विभाग</p>
                  </div>
                </div>
              </div>

              {/* White section with form */}
              <div className="bg-white p-8 w-full lg:w-1/2 flex items-center justify-center">
                <Form {...form}>
                  <form onSubmit={onSubmit} className="w-full space-y-8">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>पिआईएस कोड</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="प्रयोगकर्तानाम/ कर्मचारी संकेत नं"
                              className="border-gray-300 focus:ring-primary focus:border-primary"
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
                          <FormLabel>पिआईएस कोड</FormLabel>
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
                      className="w-full bg-primary text-white py-3 rounded-md"
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
