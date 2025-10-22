import { Metadata } from "next";
import { Card, CardBody, CardHeader } from "@heroui/card";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | RUSDEN",
  description: "Политика конфиденциальности и обработки персональных данных сайта RUSDEN",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Политика конфиденциальности
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Сбор информации</h2>
          </CardHeader>
          <CardBody>
            <p className="text-default-700 mb-4">
              Мы собираем только ту информацию, которая необходима для обеспечения функционирования нашего сервиса объявлений:
            </p>
            <ul className="list-disc list-inside space-y-2 text-default-600">
              <li>Данные, предоставленные пользователями при регистрации и размещении объявлений</li>
              <li>Информация о устройствах и браузерах для технических целей</li>
              <li>Данные об использовании сайта для улучшения наших услуг</li>
              <li>Сообщения между пользователями системы</li>
            </ul>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Использование информации</h2>
          </CardHeader>
          <CardBody>
            <p className="text-default-700 mb-4">
              Собранная информация используется для:
            </p>
            <ul className="list-disc list-inside space-y-2 text-default-600">
              <li>Предоставления услуг по размещению и поиску объявлений</li>
              <li>Обеспечения безопасности платформы и prevention мошенничества</li>
              <li>Связи с пользователями по вопросам обслуживания</li>
              <li>Улучшения функционала и пользовательского опыта</li>
            </ul>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">⚠️ Важное предупреждение об объявлениях</h2>
          </CardHeader>
          <CardBody>
            <div className="bg-warning-50 dark:bg-warning-900/20 border-l-4 border-warning-500 p-4 rounded">
              <p className="text-default-700 font-semibold mb-3">
                Критически важная информация о безопасности:
              </p>
              <ul className="list-disc list-inside space-y-2 text-default-600">
                <li>
                  <strong>Сайт RUSDEN не является посредником</strong> и не несет ответственности за достоверность размещенных объявлений
                </li>
                <li>
                  <strong>Никогда не переводите деньги</strong> незнакомым лицам до получения товара или услуги
                </li>
                <li>
                  <strong>Всегда проверяйте продавцов и товары</strong> лично или через надежные сервисы эскроу
                </li>
                <li>
                  <strong>Будьте осторожны</strong> с предложениями, которые кажутся слишком хорошими, чтобы быть правдой
                </li>
                <li>
                  <strong>Сообщайте о мошенничестве</strong> через нашу систему поддержки
                </li>
              </ul>
              <p className="text-default-700 font-semibold mt-4">
                Вся ответственность за сделки между пользователями лежит на самих пользователях.
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Защита данных</h2>
          </CardHeader>
          <CardBody>
            <p className="text-default-700 mb-4">
              Мы принимаем следующие меры для защиты вашей информации:
            </p>
            <ul className="list-disc list-inside space-y-2 text-default-600">
              <li>Использование HTTPS-шифрования для всех передач данных</li>
              <li>Регулярное обновление систем безопасности</li>
              <li>Ограниченный доступ к персональным данным сотрудников</li>
              <li>Мониторинг безопасности на постоянной основе</li>
            </ul>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Ваши права</h2>
          </CardHeader>
          <CardBody>
            <p className="text-default-700 mb-4">
              Вы имеете право на:
            </p>
            <ul className="list-disc list-inside space-y-2 text-default-600">
              <li>Доступ к своим персональным данным</li>
              <li>Корректировку или удаление информации</li>
              <li>Отказ от получения маркетинговых сообщений</li>
              <li>Удаление своего аккаунта и всех связанных данных</li>
            </ul>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Контакты</h2>
          </CardHeader>
          <CardBody>
            <p className="text-default-700">
              По вопросам, связанным с политикой конфиденциальности, пожалуйста, свяжитесь с нами:
            </p>
            <p className="text-default-600 mt-2">
              Email: privacy@rusden.tr
            </p>
          </CardBody>
        </Card>

        <div className="text-center text-default-500 text-sm mt-8">
          <p>Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
        </div>
      </div>
    </div>
  );
}