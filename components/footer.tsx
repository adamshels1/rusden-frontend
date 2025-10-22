"use client";

import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { Logo } from "@/components/icons";
import NextLink from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-default-100 dark:bg-default-50 mt-auto">
      <div className="container mx-auto px-6 py-4">
        {/* Основной контент футера */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Юридические ссылки */}
          <div className="flex gap-4 text-sm">
            <Link
              as={NextLink}
              href="/terms"
              className="text-default-600 hover:text-primary"
            >
              Условия использования
            </Link>
            <span className="text-default-400">•</span>
            <Link
              as={NextLink}
              href="/privacy"
              className="text-default-600 hover:text-primary"
            >
              Политика конфиденциальности
            </Link>
          </div>

          {/* Контактная информация */}
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="mailto:support@rusden.tr"
              className="text-default-600 hover:text-primary"
            >
              support@rusden.tr
            </Link>
          </div>
        </div>

        <Divider className="my-4" />

        {/* Предупреждение и копирайт */}
        <div className="text-center space-y-2">
          {/* Важное предупреждение */}
          <div className="inline-block p-2 bg-warning-50 dark:bg-warning-900/20 rounded border border-warning-200">
            <p className="text-warning-800 dark:text-warning-200 text-xs">
              ⚠️ Не переводите деньги до получения товара. Проверяйте продавцов внимательно.
            </p>
          </div>

          {/* Копирайт и дисклеймер */}
          <div className="space-y-1">
            <p className="text-default-500 text-xs">
              © {currentYear} Rusden. Все права защищены.
            </p>
            <p className="text-default-400 text-xs">
              Платформа не несет ответственности за сделки между пользователями.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};