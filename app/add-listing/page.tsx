'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import { Select, SelectItem } from '@heroui/select';
import { Spinner } from '@heroui/spinner';
import { FiUpload, FiX } from 'react-icons/fi';

const CATEGORIES = [
  { value: 'realty', label: 'Недвижимость' },
  { value: 'job', label: 'Работа' },
  { value: 'service', label: 'Услуги' },
  { value: 'goods', label: 'Товары' },
  { value: 'auto', label: 'Авто' },
];

const SUBCATEGORIES: Record<string, string[]> = {
  realty: ['Аренда', 'Продажа'],
  auto: ['Аренда', 'Продажа'],
  goods: ['Мебель', 'Техника', 'Одежда', 'Другое'],
  service: ['Ремонт', 'Обучение', 'Красота', 'Юридические', 'Другое'],
  job: ['Официант', 'Повар', 'Водитель', 'Строитель', 'Другое'],
};

const CURRENCIES = [
  { value: 'TRY', label: '₺ TRY' },
  { value: 'EUR', label: '€ EUR' },
  { value: 'USD', label: '$ USD' },
];

const CITIES = [
  'Аланья',
  'Анталья',
  'Стамбул',
  'Бодрум',
  'Измир',
  'Анкара',
  'Мармарис',
  'Фетхие',
  'Кемер',
];

export default function AddListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    currency: 'TRY',
    location: '',
    contact_phone: '',
    contact_telegram: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (images.length + files.length > 4) {
      setError('Максимум 4 изображения');
      return;
    }

    const newImages = [...images, ...files].slice(0, 4);
    setImages(newImages);

    // Создаем превью
    const previews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Валидация
      if (!formData.contact_phone && !formData.contact_telegram) {
        throw new Error('Укажите хотя бы один контакт (телефон или Telegram)');
      }

      const formDataToSend = new FormData();

      // Добавляем данные
      const data = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        subcategory: formData.subcategory || undefined,
        price: formData.price ? parseFloat(formData.price) : undefined,
        currency: formData.price ? formData.currency : undefined,
        location: formData.location || undefined,
        contact_phone: formData.contact_phone || undefined,
        contact_telegram: formData.contact_telegram || undefined,
      };

      formDataToSend.append('data', JSON.stringify(data));

      // Добавляем изображения
      images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings`, {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка при создании объявления');
      }

      // Успех - перенаправляем на страницу объявления
      router.push(`/listing/${result.data.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10 px-4 md:px-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Добавить объявление</h1>
        <p className="text-default-500">
          Заполните форму ниже. Все объявления проходят автоматическую модерацию.
        </p>
      </div>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="bg-danger-50 text-danger border border-danger-200 rounded-lg p-3">
                {error}
              </div>
            )}

            <Input
              label="Заголовок"
              placeholder="Например: Аренда квартиры 1+1"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              minLength={5}
            />

            <Textarea
              label="Описание"
              placeholder="Подробное описание объявления..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              minLength={10}
              minRows={4}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Категория"
                placeholder="Выберите категорию"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
                required
              >
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </Select>

              {formData.category && SUBCATEGORIES[formData.category] && (
                <Select
                  label="Подкатегория"
                  placeholder="Выберите подкатегорию"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                >
                  {SUBCATEGORIES[formData.category].map((sub) => (
                    <SelectItem key={sub} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
                </Select>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Цена (необязательно)"
                type="number"
                placeholder="1000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />

              <Select
                label="Валюта"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                isDisabled={!formData.price}
              >
                {CURRENCIES.map((curr) => (
                  <SelectItem key={curr.value} value={curr.value}>
                    {curr.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Select
              label="Город (необязательно)"
              placeholder="Выберите город"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            >
              {CITIES.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </Select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Телефон"
                type="tel"
                placeholder="+90 555 123 4567"
                value={formData.contact_phone}
                onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
              />

              <Input
                label="Telegram (без @)"
                placeholder="username"
                value={formData.contact_telegram}
                onChange={(e) => setFormData({ ...formData, contact_telegram: e.target.value.replace('@', '') })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Фотографии (максимум 4)
              </label>

              <div className="flex flex-wrap gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative w-32 h-32">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-danger text-white rounded-full p-1"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ))}

                {images.length < 4 && (
                  <label className="w-32 h-32 border-2 border-dashed border-default-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="text-center">
                      <FiUpload className="mx-auto mb-2" size={24} />
                      <span className="text-sm text-default-500">Добавить</span>
                    </div>
                  </label>
                )}
              </div>
            </div>

            <div className="flex gap-4 justify-end mt-4">
              <Button
                variant="flat"
                onPress={() => router.back()}
                isDisabled={loading}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                color="primary"
                isLoading={loading}
                isDisabled={loading}
              >
                {loading ? 'Публикация...' : 'Опубликовать'}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}
