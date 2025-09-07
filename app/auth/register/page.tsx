import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const t = useTranslations();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", { name, email, password });
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.error || t('register'));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('register')}</h2>
        <input
          type="text"
          placeholder={t('name')}
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="email"
          placeholder={t('email')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">{t('register')}</button>
        <div className="mt-4 text-center">
          <a href="/auth/login" className="text-blue-600 hover:underline">{t('alreadyAccount')}</a>
        </div>
      </form>
    </div>
  );
}
