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
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, FileImage, Phone, Upload, User, Users } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NepaliDatePicker } from "react-nepali-datepicker-bs";
import "react-nepali-datepicker-bs/dist/index.css";

import { MinuteUpload } from "./components/minute-upload";
import { CommonFormSchema } from "./schemas/common";

export default function Forms() {
  const form = useForm<CommonFormSchema>({
    resolver: zodResolver(CommonFormSchema),
    // mode: "onChange",
  });

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

  const onSubmit = (data: CommonFormSchema) => {
    console.log("Form data:", data);
    // Here you would typically send the data to your API
    alert("Form submitted successfully!");
  };

  // Helper function to render required asterisk for required fields
  const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="flex h-full flex-col gap-4 md:overflow-hidden p-8 lg:max-w-4/5 xl:max-w-3/5 mx-auto">
      <MinuteUpload />
      <Card className="shadow-lg p-6">
        <Form {...form}>
          <div onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <span className="mr-2 text-red-500">*</span>
              <span className="text-gray-500 text-sm">
                [Mark गरेको छेत्रहरु अनिवार्य भर्नुहोला ]
              </span>
            </div>
            <div className="flex flex-col space-y-2 justify-center items-center">
              <h1 className="font-semibold text-4xl text-primary">
                केन्द्रीय कमिटी{" "}
              </h1>{" "}
              <h2 className="text-primary/70">something similar</h2>
              {/*import header component and replace with backend data  */}
            </div>
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-6">
              <FormField
                control={form.control}
                name="passport_photo"
                render={({
                  field: { value, onChange, ref, ...fieldProps },
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
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name_ne"
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
                          className="pl-10"
                          {...field}
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
                          {...field}
                          options={{ calenderLocale: "ne" }}
                          placeholder="Select date"
                          todayIfEmpty={false}
                          onChange={(val) => {
                            console.log("DOB selected: ", val);
                          }}
                          inputClassName={cn(
                            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                            "pl-10"
                          )}
                          weekDayLabelSize="md"
                          className={cn("size-full")}
                          theme="light"
                          formatOptions={{
                            separator: "-",
                            format: "YYYY-MM-DD",
                          }}
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
                name="phone_number"
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
                          placeholder="मोबाइल नं."
                          className="pl-10"
                          {...field}
                          maxLength={10}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) e.preventDefault();
                          }}
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
                name="party_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>पार्टी नं.</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="size-9 absolute inset-y-0 left-0 flex justify-center items-center">
                          <Users className=" h-4 w-4 text-gray-500" />
                        </div>
                        <Input
                          placeholder="पार्टी नं. छ भने हल्नुहोला (अतिरिक्त)"
                          className="pl-10"
                          {...field}
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
                          {/* <FileImage className="absolute left-3 top-3 h-4 w-4 text-gray-500" /> */}
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

            {/* Submit Button */}
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              className="w-full"
              // disabled={!form.formState.isValid}
            >
              Submit Registration
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
