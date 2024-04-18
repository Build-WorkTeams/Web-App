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
import { LockKeyholeOpen } from "lucide-react";
import Google from "@/assets/google.svg";
import apiClient from "@/services/api-client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import capitalize from "@/utils/capitize";

const schema = z.object({
  email: z.string().email().min(2).max(50),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

type formData = z.infer<typeof schema>;

const RegisterPage = () => {
  //Hooks
  const navigate = useNavigate();
  const { toast } = useToast();

  //States
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleRegister = (values: formData) => {
    setIsLoading(true);
    apiClient
      .post("/api/accounts/login/", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/");
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: `${capitalize(err.response.data.message)}`,
        });
      });
  };
  return (
    <div className="w-full lg:grid h-dvh lg:grid-cols-[400px_1fr] xl:grid-cols-[550px_1fr] font-poppinsFont">
      <div className="hidden bg-muted lg:block ">
        <img
          src={RegisterImg}
          className="lg:h-min-screen xl:h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
          alt=""
        />
      </div>
      <div className="flex items-center justify-center py-12 lg:py-0">
        <div className="grid mx-4 lg:mx-7 xl:mx-20 xl:w-auto gap-4">
          <Toaster />
          <div className="text-right text-sm leading-normal text-custom-gray_300">
            Don&apos;t have an account?
            <Link to="/register">
              <Button
                variant="link"
                className="underline p-0 px-1 font-openSansFont text-custom-purple_300 font-bold"
              >
                Sign up
              </Button>
            </Link>
          </div>
          <div className="grid gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-custom-gray_300">
              Welcome back!
            </h1>
            <p className="text-sm text-custom-blue_100 leading-normal md:text-[15.4px]">
              Follow the instructions to make it easier to login and you will be
              able to explore more.
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
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="font-body text-custom-gray_300 px-[24px] py-[20px] rounded-[20px] md:px-[28px] md:py-[24px] md:rounded-[40px] lg:px-[30px] lg:py-[26px] lg:rounded-[60px] xl:px-[34px] xl:py-[30px] xl:rounded-[80px] xl:text-lg"
                          placeholder="Password"
                          type="password"
                          icon={<LockKeyholeOpen />}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="pl-2 xl:pl-4" />
                    </FormItem>
                  )}
                />
                <Link className="flex justify-end" to="/reset">
                  <Button
                    variant="link"
                    className="text-sm text-custom-purple_300 h-6"
                  >
                    Forgot Password?
                  </Button>
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full py-[20px] md:py-[24px] lg:py-[26px] xl:py-[30px] bg-custom-purple_300 rounded-[80px]"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
          </Form>
          <Button
            variant="outline"
            className="w-full flex gap-2 items-center justify-center  py-[20px] md:py-[24px] lg:py-[26px] xl:py-[30px] rounded-[80px] bg-custom-white_300"
          >
            <img src={Google} className="w-[22px] h-[22px]" alt="Google Icon" />
            Sign up with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
