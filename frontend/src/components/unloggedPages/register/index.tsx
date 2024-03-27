import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  useLoginMutation,
  useSignupMutation,
} from '@/graphql/generated/schema';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

interface RegisterFormProps {
  setAuthAction: (action: 'login' | 'register') => void;
}
export const RegisterForm = ({ setAuthAction }: RegisterFormProps) => {
  const [loginUser] = useLoginMutation();
  const router = useRouter();
  const [signupUser] = useSignupMutation();

  const formSchema = z.object({
    email: z.string().email({ message: "L'email n'est pas valide" }),
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    firstname: z
      .string()
      .min(3, 'Le prénom doit contenir au moins 3 caractères'),
    lastname: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
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
      onCompleted: () => toast.success('Votre compte a bien été créé'),
      onError: (error) => {
        toast.error(
          'Une erreur est survenue lors de la création de votre compte'
        );
        console.log(error);
      },
    });
    await loginUser({
      variables: {
        data: { email: values.email, password: values.password },
      },
      onCompleted: () => {
        router.push('/');
      },
      onError: () => {
        toast.error('Les informations de connexion sont incorrectes');
        form.reset();
      },
    });
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-semibold">Inscrivez-vous !</h2>
        <p className="text-sm text-muted-foreground">
          Renseignez vos informations afin de pouvoir vous inscrire
        </p>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Prénom"
                      data-testid="signup-firstname"
                    />
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
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Nom"
                      data-testid="signup-lastname"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="Email"
                      data-testid="signup-email"
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
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Mot de passe"
                      data-testid="signup-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4 w-full">
              Créer mon compte
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex cursor-pointer justify-center">
        <p className="text-sm" onClick={() => setAuthAction('login')}>
          Vous posséder un compte ?{' '}
          <span className="text-blue-800">Connectez-vous.</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
