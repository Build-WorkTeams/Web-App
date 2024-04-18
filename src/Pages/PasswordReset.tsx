import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RegisterImg from "@/assets/RegisterImg.png";
import { Link, useNavigate } from "react-router-dom";
import { MailOpen } from "lucide-react";
import apiClient from "@/services/api-client";
import { Loader2 } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  email: z.string().email().min(2).max(50),
});

type formData = z.infer<typeof schema>;

const PasswordReset = () => {
  //Hooks
  const navigate = useNavigate();

  //States
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const handleRegister = (values: formData) => {
    setIsLoading(true);
    apiClient
      .post("/noendpoint", {
        email: values.email,
      })
      .then(() => {
        navigate("/verify");
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="w-full lg:grid h-dvh lg:grid-cols-2 font-poppinsFont">
      <div className="flex items-center justify-center py-12 lg:py-0">
        <div className="grid mx-4 lg:mx-7 xl:mx-20 xl:w-auto gap-4">
          <div className="text-left text-sm leading-normal text-custom-gray_300">
            <Link to="/login">
              <Button variant="link" className="p-0 font-poppinsFont font-bold">
                <ChevronLeft /> Back to login
              </Button>
            </Link>
          </div>
          <div className="grid gap-2 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-custom-gray_300">
              Forgot your password?
            </h1>
            <p className="text-sm text-custom-blue_100 leading-normal md:text-[15.4px]">
              Don’t worry, happens to all of us. Enter your email below to
              recover your password
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegister)}
              className="grid gap-4"
            >
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="font-body text-custom-gray_300 px-[24px] py-[20px] rounded-[20px] md:px-[28px] md:py-[24px] md:rounded-[40px] lg:px-[30px] lg:py-[26px] lg:rounded-[60px] xl:px-[34px] xl:py-[30px] xl:rounded-[80px] xl:text-lg"
                          placeholder="Email"
                          icon={<MailOpen />}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="pl-2 xl:pl-4" />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full py-[20px] md:py-[24px] lg:py-[26px] xl:py-[30px] bg-custom-purple_300 rounded-[80px]"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block ">
        <img
          src={RegisterImg}
          className="lg:h-min-screen xl:h-screen w-full dark:brightness-[0.2] dark:grayscale"
          alt=""
        />
      </div>
    </div>
  );
};

export default PasswordReset;
