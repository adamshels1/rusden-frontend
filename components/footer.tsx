"use client";

import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { Logo } from "@/components/icons";
import NextLink from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-default-100 dark:bg-default-50 mt-auto">
      <div className="container mx-auto px-6 py-8">
        {/* Правовая информация и предупреждения */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Юридические ссылки */}
          <div className="space-y-4">
            <h3 className="font-semibold text-default-800">Правовая информация</h3>
            <div className="space-y-2">
              <Link
                as={NextLink}
                href="/terms"
                className="text-default-600 hover:text-primary text-sm"
              >
                Условия использования
              </Link>
              <br />
              <Link
                as={NextLink}
                href="/privacy"
                className="text-default-600 hover:text-primary text-sm"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>

          {/* Предупреждение о безопасности */}
          <div className="flex-1 max-w-md">
            <div className="p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg border border-warning-200">
              <p className="text-warning-800 dark:text-warning-200 text-sm font-semibold mb-2">
                ⚠️ Важное предупреждение о безопасности
              </p>
              <ul className="text-warning-700 dark:text-warning-300 text-xs space-y-1">
                <li>• Не переводите деньги до получения товара</li>
                <li>• Проверяйте продавцов и товары внимательно</li>
                <li>• Встречайтесь в безопасных местах</li>
                <li>• Сообщайте о подозрительной активности</li>
              </ul>
            </div>
          </div>
        </div>

        <Divider className="my-6" />

        {/* Нижняя часть футера */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-default-500 text-sm">
            © {currentYear} Rusden. Все права защищены.
          </div>

          <div className="flex items-center gap-6">
            <div className="text-warning-600 dark:text-warning-400 text-sm font-medium">
              🔒 Используйте безопасные способы оплаты
            </div>
            <Link
              href="mailto:support@rusden.tr"
              className="text-default-600 hover:text-primary text-sm"
            >
              support@rusden.tr
            </Link>
          </div>
        </div>

        {/* Дополнительное предупреждение */}
        <div className="mt-6 p-4 bg-default-200 dark:bg-default-800 rounded-lg">
          <p className="text-default-600 text-xs text-center">
            <strong>Дисклеймер:</strong> RUSDEN является лишь платформой для размещения объявлений и не несет ответственности
            за достоверность информации и качество товаров/услуг. Все сделки осуществляются на свой страх и риск.
            Будьте бдительны и проверяйте всех участников сделок.
          </p>
        </div>
      </div>
    </footer>
  );
};