import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const { data: session } = useSession();
  const t = useTranslations();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-bold mb-4">{t('dashboard')}</h2>
        <p>{t('login')} {t('dashboard')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">{t('dashboard')}</h2>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
        <p><strong>{t('name')}:</strong> {session.user?.name}</p>
        <p><strong>{t('email')}:</strong> {session.user?.email}</p>
        <p><strong>Role:</strong> {session.user?.role}</p>
      </div>
      {/* Add analytics, moderation tools, etc. here */}
    </div>
  );
}
