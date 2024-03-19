import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useLoginMutation,
  useSignupMutation,
} from "@/graphql/generated/schema";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const SignUp = () => {
  const [loginUser] = useLoginMutation();
  const router = useRouter();
  const [signupUser] = useSignupMutation();

  const formSchema = z.object({
    email: z.string().email({ message: "L'email n'est pas valide" }),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    firstname: z
      .string()
      .min(3, "Le prénom doit contenir au moins 3 caractères"),
    lastname: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signupUser({
      variables: {
        data: {
          email: values.email,
          password: values.password,
          firstname: values.firstname,
          lastname: values.lastname,
        },
      },
      onCompleted: () => toast.success("Votre compte a bien été créé"),
      onError: (error) => {
        toast.error(
          "Une erreur est survenue lors de la création de votre compte"
        );
        console.log(error);
      },
    });
    await loginUser({
      variables: {
        data: { email: values.email, password: values.password },
      },
      onCompleted: () => {
        router.push("/");
      },
      onError: () => {
        toast.error("Les informations de connexion sont incorrectes");
        form.reset();
      },
    });
  };

  return (
    <div>
      <h1 className="pb-2 text-2xl font-semibold border-b mb-6">Inscription</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Joris" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nom de famille</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Grilleres" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="joris@gmail.com"
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
                <FormItem className="w-full">
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="mt-4 w-fit">
            Créer mon compte
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
