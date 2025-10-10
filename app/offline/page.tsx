import { Metadata } from 'next';
import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Icon } from '@heroui/icon';

export const metadata: Metadata = {
  title: 'Офлайн режим - Rusden',
  description: 'Вы в офлайн режиме. Некоторые функции могут быть недоступны.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center pb-0">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-gray-500" name="wifi-off" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Офлайн режим
          </h1>
        </CardHeader>
        <CardBody className="text-center pt-2">
          <p className="text-gray-600 mb-6">
            Вы сейчас не подключены к интернету. Некоторые функции могут быть недоступны.
          </p>

          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h3 className="font-semibold text-blue-900 mb-1">Доступно офлайн:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Просмотр сохраненных объявлений</li>
                <li>• Чтение загруженных статей</li>
                <li>• Базовый поиск в кэше</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <h3 className="font-semibold text-gray-900 mb-1">Недоступно офлайн:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Добавление новых объявлений</li>
                <li>• Связь с продавцами</li>
                <li>• Актуальные данные</li>
              </ul>
            </div>
          </div>

          <Button
            color="primary"
            className="w-full mt-6"
            onClick={() => window.location.reload()}
          >
            Попробовать снова
          </Button>

          <p className="text-xs text-gray-500 mt-4">
            При подключении к интернету все функции станут доступны.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}