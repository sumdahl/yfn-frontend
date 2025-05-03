import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import FormHeader from "./components/form-header";
import {
  Calendar,
  FileImage,
  Loader2,
  Phone,
  Upload,
  User,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import { useCommonForm } from "./use-common-form";
import NepaliDatePicker from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";

export default function Forms() {
  const { onSubmit, loading, ...form } = useCommonForm(); //send userId here

  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handle image preview
  const handleImagePreview = (
    file: File | null,
    setPreview: typeof setPassportPreview
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper function to render required asterisk for required fields
  const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div>
      <div className="flex h-full flex-col gap-4 md:overflow-hidden p-8 lg:max-w-4/5 xl:max-w-3/5 mx-auto">
        <Card className="shadow-lg p-6">
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className="">
                {/*Form header */}
                <FormHeader />

                {/* Profile Picture Section */}
                <div className="flex flex-col items-center mb-6">
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({
                      field: { value: _, onChange, ref, ...fieldProps },
                    }) => (
                      <FormItem className="w-full flex flex-col items-center">
                        <div
                          className="relative inline-block"
                          onClick={() => inputRef.current?.click()}
                        >
                          <Avatar className="w-32 h-32 border-2 border-primary">
                            <AvatarImage
                              src={passportPreview || undefined}
                              alt="Profile preview"
                            />
                            <AvatarFallback className="bg-muted flex flex-col space-y-1 items-center justify-center">
                              <User className="h-16 w-16 text-muted-foreground" />
                              <span className="text-sm text-gray-500">
                                अप्लोड गर्नुहोस्
                              </span>
                              <Upload className="text-gray-500 w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <Input
                            type="file"
                            accept=".jpg,.jpeg"
                            className="hidden"
                            ref={(el) => {
                              ref(el); // for RHF
                              inputRef.current = el; // for manual click
                            }}
                            {...fieldProps}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                onChange(file);
                                handleImagePreview(file, setPassportPreview);
                              }
                            }}
                            disabled={loading}
                          />
                        </div>
                        <FormLabel className="mt-2 text-center">
                          प्रोफाइल फोटो
                          <RequiredAsterisk />
                        </FormLabel>
                        <FormDescription className="text-center text-sm max-w-xs">
                          भर्खरै खिच्नु भएको पासपोर्ट साइज फोटो (JPG/JPEG) मात्र
                        </FormDescription>
                        <FormMessage className="text-center" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  {/*Nepali name field */}

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          पूरा नाम
                          <RequiredAsterisk />
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="size-9 absolute inset-y-0 left-0 flex justify-center items-center">
                              <User className=" h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              placeholder=" पूरा नाम नेपालीमा "
                              className="pl-10"
                              {...field}
                              disabled={loading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name_en"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Full Name
                          <RequiredAsterisk />
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="size-9 absolute inset-y-0 left-0 flex justify-center items-center">
                              <User className=" h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              placeholder=" Full Name in English "
                              className="pl-10 uppercase"
                              {...field}
                              disabled={loading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date of Birth Field */}
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          जन्म मिति
                          <RequiredAsterisk />
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="size-9 absolute inset-y-0 left-0 flex justify-center items-center">
                              <Calendar className=" h-4 w-4 text-gray-500" />
                            </div>
                            <NepaliDatePicker
                              // {...field}
                              value={field.value}
                              onChange={(e) => {
                                const val = e?.toADasDate();
                                field.onChange(val);
                              }}
                              placeholder="Select date"
                              className={cn(
                                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                "pl-10"
                              )}
                              disabled={loading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone Number Field */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          मोबाइल नं.
                          <RequiredAsterisk />
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="size-9 absolute inset-y-0 left-0 flex justify-center items-center">
                              <Phone className=" h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              type="text"
                              inputMode="numeric"
                              pattern="\d*"
                              placeholder="मोबाइल नं."
                              className="pl-10"
                              maxLength={10}
                              {...field}
                              onChange={(e) => {
                                const digitsOnly = e.target.value.replace(
                                  /\D/g,
                                  ""
                                );
                                field.onChange(digitsOnly); // Only allow digits
                              }}
                              disabled={loading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Party Number Field */}
                  <FormField
                    control={form.control}
                    name="party_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>पार्टी सदस्यता नं.</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="size-9 absolute inset-y-0 left-0 flex justify-center items-center">
                              <Users className=" h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              placeholder="पार्टी सदस्यता नं. (वैकल्पिक)" //optional
                              className="pl-10"
                              {...field}
                              disabled={loading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="citizenship_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          नागरिकता नं.
                          <RequiredAsterisk />
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="size-9 absolute inset-y-0 left-0 flex justify-center items-center">
                              <Phone className=" h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              placeholder="नागरिकता  नं."
                              className="pl-10"
                              {...field}
                              disabled={loading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Uploads Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* Citizenship Front Upload */}
                  <FormField
                    control={form.control}
                    name="citizenship_front"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>
                          नागरिकता अगाडी
                          <RequiredAsterisk />
                        </FormLabel>
                        <FormControl>
                          <div className="flex flex-col gap-2">
                            <div className="relative">
                              <div className="size-9 absolute inset-y-0 left-0 flex justify-center items-center">
                                <FileImage className=" h-4 w-4 text-gray-500" />
                              </div>
                              <Input
                                type="file"
                                accept=".jpg,.jpeg"
                                className="pl-10"
                                {...fieldProps}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    onChange(file);
                                    handleImagePreview(file, setFrontPreview);
                                  }
                                }}
                                disabled={loading}
                              />
                            </div>
                            {frontPreview && (
                              <div className="mt-2">
                                <p className="mb-1 text-sm">Preview:</p>
                                <img
                                  src={frontPreview}
                                  alt="Citizenship front preview"
                                  className="max-h-40 rounded-md border"
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          नागरिकता को अगाडिको भाग (JPG/JPEG) मात्र
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Citizenship Back Upload */}
                  <FormField
                    control={form.control}
                    name="citizenship_back"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>
                          नागरिकता पछाडी
                          <RequiredAsterisk />
                        </FormLabel>
                        <FormControl>
                          <div className="flex flex-col gap-2">
                            <div className="relative">
                              <FileImage className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input
                                type="file"
                                accept=".jpg,.jpeg"
                                className="pl-10"
                                {...fieldProps}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    onChange(file);
                                    handleImagePreview(file, setBackPreview);
                                  }
                                }}
                                disabled={loading}
                              />
                            </div>
                            {backPreview && (
                              <div className="mt-2">
                                <p className="mb-1 text-sm">Preview:</p>
                                <img
                                  src={backPreview}
                                  alt="Citizenship back preview"
                                  className="max-h-40 rounded-md border"
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          नागरिकताको पछाडिको भाग(JPG/JPEG) मात्र
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="w-full mt-2 hover:bg-secondary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  ) : (
                    "फारम बुझाउनुहोस्  "
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
