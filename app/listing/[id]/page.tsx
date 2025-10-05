'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Image } from '@heroui/image';
import { Chip } from '@heroui/chip';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import { Divider } from '@heroui/divider';
import { getListing } from '@/lib/api';
import type { Listing } from '@/types/listing';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { FiArrowLeft, FiMapPin, FiCalendar } from 'react-icons/fi';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const handleCategoryClick = () => {
    if (!listing) return;
    const params = new URLSearchParams();
    params.append('category', listing.category);
    if (listing.subcategory) {
      params.append('subcategory', listing.subcategory);
    }
    router.push(`/?${params.toString()}`);
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListing(params.id as string);
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing:', error);
        setListing(null);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-default-500">Объявление не найдено</p>
        <Button color="primary" onPress={() => router.push('/')}>
          На главную
        </Button>
      </div>
    );
  }

  const formattedDate = formatDistanceToNow(new Date(listing.posted_date), {
    addSuffix: true,
    locale: ru,
  });

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10 px-4 md:px-6 max-w-5xl mx-auto">
      <Button
        startContent={<FiArrowLeft />}
        variant="light"
        onPress={() => router.back()}
        className="w-fit"
      >
        Назад
      </Button>

      <Card className="w-full">
        <CardHeader className="flex-col items-start gap-4 p-6">
          <div className="flex justify-between w-full items-start">
            <h1 className="text-3xl font-bold">{listing.title}</h1>
            {listing.price && listing.currency && (
              <Chip color="primary" size="lg" variant="flat" className="text-xl font-bold">
                {listing.price.toLocaleString('ru-RU')} {listing.currency}
              </Chip>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip
              size="sm"
              color="primary"
              onClick={handleCategoryClick}
              className="cursor-pointer hover:opacity-80"
            >
              {categoryLabels[listing.category] || listing.category}
            </Chip>
            {listing.subcategory && (
              <Chip
                size="sm"
                color="secondary"
                onClick={handleCategoryClick}
                className="cursor-pointer hover:opacity-80"
              >
                {subcategoryLabels[listing.subcategory] || listing.subcategory}
              </Chip>
            )}
            {listing.location && (
              <Chip size="sm" startContent={<FiMapPin size={14} />}>
                {listing.location}
              </Chip>
            )}
            <Chip size="sm" startContent={<FiCalendar size={14} />}>
              {formattedDate}
            </Chip>
          </div>
        </CardHeader>

        <Divider />

        <CardBody className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column for images */}
            <div className="md:w-1/2">
              <div className="flex flex-col gap-4">
                <div
                  className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-default-100 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => {
                    setLightboxIndex(selectedImage);
                    setLightboxOpen(true);
                  }}
                >
                  <Image
                    src={listing.images && listing.images.length > 0 ? listing.images[selectedImage] : '/no-image.jpg'}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {listing.images && listing.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {listing.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`${listing.title} ${index + 1}`}
                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                          selectedImage === index ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedImage(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right column for details */}
            <div className="md:w-1/2 flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Описание</h2>
                <p className="text-default-700 whitespace-pre-wrap">{listing.description}</p>
              </div>

              {(listing.contact_info?.phone || listing.contact_info?.telegram) && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Контакты</h2>
                  <div className="flex flex-col gap-2">
                    {listing.contact_info.phone && (
                      <Button
                        startContent={<FaWhatsapp />}
                        as="a"
                        href={`https://wa.me/${listing.contact_info.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#20BA5A]"
                      >
                        {listing.contact_info.phone}
                      </Button>
                    )}
                    {listing.contact_info.telegram && (
                      <Button
                        startContent={<FaTelegram />}
                        as="a"
                        href={`https://t.me/${listing.contact_info.telegram.replace('@', '')}`}
                        target="_blank"
                        className="w-full sm:w-auto bg-[#0088cc] text-white hover:bg-[#006699]"
                      >
                        {listing.contact_info.telegram}
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <Divider />

              <div className="flex flex-col gap-2 text-small text-default-500">
                {listing.ai_confidence && (
                  <p>Точность категоризации: {Math.round(listing.ai_confidence * 100)}%</p>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {listing.images && listing.images.length > 0 && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={listing.images.map((image) => ({ src: image }))}
          plugins={[Zoom, Fullscreen, Thumbnails]}
          zoom={{
            maxZoomPixelRatio: 3,
            scrollToZoom: true,
          }}
        />
      )}
    </section>
  );
}
