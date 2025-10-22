import { Metadata } from "next";
import { Card, CardBody, CardHeader } from "@heroui/card";

export const metadata: Metadata = {
  title: "Условия использования | RUSDEN",
  description: "Условия использования сайта объявлений RUSDEN и правила для пользователей",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Условия использования
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Принятие условий</h2>
          </CardHeader>
          <CardBody>
            <p className="text-default-700">
              Используя сайт RUSDEN, вы подтверждаете, что прочитали, поняли и согласны соблюдать эти условия использования.
              Если вы не согласны с этими условиями, пожалуйста, не используйте наш сервис.
            </p>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Описание сервиса</h2>
          </CardHeader>
          <CardBody>
            <p className="text-default-700 mb-4">
              RUSDEN — это онлайн-платформа для размещения и поиска частных объявлений. Мы предоставляем техническую
              возможность для связи между продавцами и покупателями, но не являемся участником сделок.
            </p>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">🚨 КРИТИЧЕСКИ ВАЖНЫЕ ПРАВИЛА БЕЗОПАСНОСТИ</h2>
          </CardHeader>
          <CardBody>
            <div className="bg-danger-50 dark:bg-danger-900/20 border-l-4 border-danger-500 p-4 rounded">
              <p className="text-default-700 font-semibold mb-3">
                ВАЖНО: ПРАВИЛА БЕЗОПАСНОСТИ ПРИ СДЕЛКАХ
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-default-800">ЗАПРЕЩЕНО:</h4>
                  <ul className="list-disc list-inside space-y-1 text-default-600 mt-2">
                    <li>Переводить деньги до получения товара или услуги</li>
                    <li>Передавать персональные данные банковских карт</li>
                    <li>Отправлять копии документов незнакомым лицам</li>
                    <li>Платить за &quot;доставку&quot; или &quot;комиссию&quot; заранее</li>
                    <li>Переходить по подозрительным ссылкам из сообщений</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-default-800">ОБЯЗАТЕЛЬНО:</h4>
                  <ul className="list-disc list-inside space-y-1 text-default-600 mt-2">
                    <li>Проверять товар лично при встрече</li>
                    <li>Использовать надежные способы оплаты</li>
                    <li>Проверять репутацию продавца</li>
                    <li>Договариваться о встрече в общественных местах</li>
                    <li>Сохранять всю переписку с продавцом</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-3 bg-default-100 dark:bg-default-800 rounded">
                <p className="text-default-700 font-semibold text-center">
                  ⚠️ САЙТ RUSDEN НЕ НЕСЕТ ОТВЕТСТВЕННОСТИ ЗА ФИНАНСОВЫЕ ПОТЕРИ ПОЛЬЗОВАТЕЛЕЙ
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Обязательства пользователей</h2>
          </CardHeader>
          <CardBody>
            <p className="text-default-700 mb-4">
              Пользователи обязуются:
            </p>
            <ul className="list-disc list-inside space-y-2 text-default-600">
              <li>Предоставлять только достоверную информацию в объявлениях</li>
              <li>Не размещать информацию о товарах/услугах, запрещенных законодательством</li>
              <li>Не использовать платформу для мошеннических целей</li>
              <li>Уважать других пользователей и не нарушать их права</li>
              <li>Немедленно сообщать о подозрительной активности</li>
            </ul>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Запрещенная деятельность</h2>
          </CardHeader>
          <CardBody>
            <p className="text-default-700 mb-4">
              На сайте запрещено размещать объявления о:
            </p>
            <ul className="list-disc list-inside space-y-2 text-default-600">
              <li>Наркотических веществах и психотропных препаратах</li>
              <li>Оружии и боеприпасах</li>
              <li>Поддельных документах и фальшивых деньгах</li>
              <li>Краденых товарах</li>
              <li>Услугах незаконного характера</li>
              <li>Товарах, нарушающих авторские права</li>
              <li>Любой другой деятельности, нарушающей законодательство</li>
            </ul>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Ограничение ответственности</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3 text-default-700">
              <p>
                <strong>Критически важно понимать:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-default-600">
                <li>
                  RUSDEN является только технической платформой и не гарантирует достоверность объявлений
                </li>
                <li>
                  Мы не несем ответственности за качество товаров, достоверность информации и действия пользователей
                </li>
                <li>
                  Все финансовые риски при сделках полностью лежат на участниках сделки
                </li>
                <li>
                  Мы не являемся гарантом сделки и не возвращаем деньги в случае мошенничества
                </li>
                <li>
                  Пользователи взаимодействуют на свой страх и риск
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Интеллектуальная собственность</h2>
          </CardHeader>
          <CardBody>
            <p className="text-default-700">
              Все материалы на сайте (тексты, изображения, дизайн) защищены авторским правом.
              Запрещается использование материалов сайта без письменного разрешения правообладателя.
            </p>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Изменение условий</h2>
          </CardHeader>
          <CardBody>
            <p className="text-default-700">
              Мы оставляем за собой право изменять эти условия использования в любое время.
              О значительных изменениях пользователи будут уведомлены через сайт или по email.
            </p>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Контакты для связи</h2>
          </CardHeader>
          <CardBody>
            <p className="text-default-700">
              По вопросам, связанным с условиями использования:
            </p>
            <p className="text-default-600 mt-2">
              Email: legal@rusden.tr
            </p>
          </CardBody>
        </Card>

        <div className="text-center text-default-500 text-sm mt-8">
          <p>Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}</p>
        </div>
      </div>
    </div>
  );
}