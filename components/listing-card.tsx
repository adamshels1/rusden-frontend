'use client';

import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';
import { Chip } from '@heroui/chip';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Listing } from '@/types/listing';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ListingCardProps {
  listing: Listing;
  currentPage?: number;
}

export function ListingCard({ listing, currentPage }: ListingCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formattedDate = formatDistanceToNow(new Date(listing.posted_date), {
    addSuffix: true,
    locale: ru,
  });

  const handleClick = () => {
    // Сохраняем текущие параметры URL для возврата назад
    const params = new URLSearchParams(searchParams.toString());
    if (currentPage && currentPage > 1) {
      params.set('page', currentPage.toString());
    }

    // Сохраняем параметры в sessionStorage для возврата
    sessionStorage.setItem('lastListingParams', params.toString());

    router.push(`/listing/${listing.id}`);
  };

  const categoryLabels: Record<string, string> = {
    realty: 'Недвижимость',
    job: 'Работа',
    service: 'Услуги',
    goods: 'Товары',
    auto: 'Авто',
    event: 'Мероприятия',
  };

  const subcategoryLabels: Record<string, string> = {
    rent: 'Аренда',
    sale: 'Продажа',
    'Аренда': 'Аренда',
    'Продажа': 'Продажа',
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams();
    params.append('category', listing.category);
    if (listing.subcategory) {
      params.append('subcategory', listing.subcategory);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <Card
      isPressable
      onPress={handleClick}
      className="w-full hover:scale-[1.02] transition-transform"
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-default-100 flex items-center justify-center">
          <Image
            alt={listing.title}
            className="object-cover w-full h-full"
            src={listing.images && listing.images.length > 0 ? listing.images[0] : '/no-image.jpg'}
          />
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2 px-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-large line-clamp-2 flex-1">{listing.title}</h4>
        </div>
        <div className="flex gap-2 mb-2">
          <Chip
            size="sm"
            color="primary"
            variant="flat"
            onClick={handleCategoryClick}
            className="cursor-pointer hover:opacity-80"
          >
            {categoryLabels[listing.category] || listing.category}
          </Chip>
          {listing.subcategory && (
            <Chip
              size="sm"
              color="secondary"
              variant="flat"
              onClick={handleCategoryClick}
              className="cursor-pointer hover:opacity-80"
            >
              {subcategoryLabels[listing.subcategory] || listing.subcategory}
            </Chip>
          )}
          {listing.location && (
            <Chip size="sm" color="default" variant="flat">
              {listing.location}
            </Chip>
          )}
        </div>
        <p className="text-small text-default-500 line-clamp-2">{listing.description}</p>
        <p className="text-tiny text-default-400 mt-2">{formattedDate}</p>
      </CardBody>
      <CardFooter className="pt-0">
        {listing.price && listing.currency ? (
          <span className="text-2xl font-bold text-primary">
            {listing.price.toLocaleString('ru-RU')} {listing.currency}
          </span>
        ) : (
          <span className="text-small text-default-400">Цена не указана</span>
        )}
      </CardFooter>
    </Card>
  );
}
