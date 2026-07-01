import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../app/providers.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { Input } from '../../../components/ui/Input.jsx';

export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: 'demo@tradeflow.test', password: 'password' } });

  if (user) return <Navigate to="/app/dashboard" replace />;

  const onSubmit = (values) => {
    login(values);
    navigate('/app/dashboard');
  };

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 p-4 text-white">
      <Card className="w-full max-w-md border-white/10 bg-white p-6 text-slate-950 dark:bg-slate-900 dark:text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">TradeFlow POS</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Use the demo credentials to review the premium POS workflow.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
          <Input label="Password" type="password" error={errors.password?.message} {...register('password', { required: 'Password is required' })} />
          <Button type="submit" className="w-full">Sign in</Button>
        </form>
      </Card>
    </main>
  );
}
