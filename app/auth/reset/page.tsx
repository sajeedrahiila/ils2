import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ResetPage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/reset", { email });
      setMessage(t('sendResetLink'));
    } catch (err: any) {
      setError(err.response?.data?.error || t('reset'));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('reset')}</h2>
        <input
          type="email"
          placeholder={t('email')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {message && <div className="text-green-500 mb-4">{message}</div>}
        <button type="submit" className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700">{t('sendResetLink')}</button>
        <div className="mt-4 text-center">
          <a href="/auth/login" className="text-blue-600 hover:underline">{t('backToLogin')}</a>
        </div>
      </form>
    </div>
  );
}
