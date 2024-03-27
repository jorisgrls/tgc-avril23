import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLoginMutation, useProfileQuery } from '@/graphql/generated/schema';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

interface LoginFormProps {
  setAuthAction: (action: 'login' | 'register') => void;
}

export const LoginForm = ({ setAuthAction }: LoginFormProps) => {
  const router = useRouter();
  const [loginUser, { loading }] = useLoginMutation();
  const { data, client } = useProfileQuery({
    errorPolicy: 'ignore',
    onCompleted: () => router.push('/'),
  });
  const formSchema = z.object({
    email: z.string().email({ message: "L'email n'est pas valide" }),
    password: z
      .string()
      .min(5, 'Le mot de passe doit contenir au moins 5 caractères'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await loginUser({
      variables: { data: { email: values.email, password: values.password } },
      onCompleted: () => {
        console.log('login success');
        router.push('/');
      },
      onError: (error) => {
        toast.error('Les informations de connexion sont incorrectes');
        form.reset();
      },
    });
    client.resetStore();
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-semibold">Connectez-vous !</h2>
        <p className="text-center text-sm text-muted-foreground">
          Entrez vos identifiants pour vous connecter à l'application
        </p>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center gap-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Mot de passe"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="mt-4 w-full" disabled={loading}>
              Se connecter
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex cursor-pointer justify-center">
        <p className="text-sm" onClick={() => setAuthAction('register')}>
          Pas encore de compte ?{' '}
          <button data-testid="button-signup" className="text-blue-800">
            Inscrivez-vous.
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
