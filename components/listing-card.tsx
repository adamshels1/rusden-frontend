'use client';

import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';
import { Chip } from '@heroui/chip';
import { useRouter } from 'next/navigation';
import type { Listing } from '@/types/listing';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const router = useRouter();

  const formattedDate = formatDistanceToNow(new Date(listing.posted_date), {
    addSuffix: true,
    locale: ru,
  });

  const handleClick = () => {
    router.push(`/listing/${listing.id}`);
  };

  return (
    <Card
      isPressable
      onPress={handleClick}
      className="w-full hover:scale-[1.02] transition-transform"
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        {listing.images && listing.images.length > 0 && (
          <Image
            alt={listing.title}
            className="object-cover rounded-xl w-full"
            src={listing.images[0]}
            width="100%"
            height={200}
          />
        )}
      </CardHeader>
      <CardBody className="overflow-visible py-2 px-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-large line-clamp-2 flex-1">{listing.title}</h4>
        </div>
        <div className="flex gap-2 mb-2">
          <Chip size="sm" color="primary" variant="flat">
            {listing.category}
          </Chip>
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
