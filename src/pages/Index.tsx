import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const apartments = [
  {
    id: 1,
    title: 'Пентхаус "Панорама"',
    area: 250,
    rooms: 4,
    price: 150000,
    image: 'https://cdn.poehali.dev/projects/58d4410a-e871-439a-bcd6-3f36eed8de52/files/baf9db56-6a65-4f7c-9a39-89239b3435ae.jpg',
    description: 'Роскошный пентхаус с панорамным видом на город'
  },
  {
    id: 2,
    title: 'Апартаменты "Элегия"',
    area: 180,
    rooms: 3,
    price: 95000,
    image: 'https://cdn.poehali.dev/projects/58d4410a-e871-439a-bcd6-3f36eed8de52/files/802470ec-6549-49b5-a0b7-0714335d6b28.jpg',
    description: 'Изысканные апартаменты с дизайнерским интерьером'
  },
  {
    id: 3,
    title: 'Люкс "Сияние"',
    area: 200,
    rooms: 3,
    price: 120000,
    image: 'https://cdn.poehali.dev/projects/58d4410a-e871-439a-bcd6-3f36eed8de52/files/9a63ac02-af80-4e09-9949-365de09c3590.jpg',
    description: 'Эксклюзивные апартаменты премиум-класса'
  }
];

const reviews = [
  {
    id: 1,
    name: 'Александр Волков',
    rating: 5,
    text: 'Невероятный уровень комфорта и сервиса! Апартаменты превзошли все ожидания.',
    date: '15 декабря 2025'
  },
  {
    id: 2,
    name: 'Екатерина Соколова',
    rating: 5,
    text: 'Потрясающий вид из окна и безупречный интерьер. Обязательно вернёмся снова.',
    date: '8 января 2026'
  },
  {
    id: 3,
    name: 'Дмитрий Петров',
    rating: 5,
    text: 'Идеальное место для деловых встреч и отдыха. Высочайший уровень обслуживания.',
    date: '3 января 2026'
  }
];

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-cormorant font-bold text-gold">ÉLITE RESIDENCE</h1>
            <div className="hidden md:flex items-center gap-8">
              {['home', 'catalog', 'gallery', 'reviews', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-montserrat transition-colors hover:text-gold ${
                    activeSection === section ? 'text-gold' : 'text-foreground/80'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'about' && 'О нас'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-6 min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-6xl md:text-8xl font-cormorant font-bold mb-6 text-gold">
              Роскошь без компромиссов
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80 mb-12 font-light">
              Эксклюзивная аренда апартаментов премиум-класса<br />в самом сердце города
            </p>
            <Button
              onClick={() => scrollToSection('catalog')}
              size="lg"
              className="bg-gold text-primary hover:bg-gold/90 text-lg px-8 py-6"
            >
              Выбрать апартаменты
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-6 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-5xl font-cormorant font-bold text-center mb-4 text-gold">
            Каталог апартаментов
          </h2>
          <p className="text-center text-foreground/60 mb-16 text-lg">
            Каждый апартамент — произведение искусства
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {apartments.map((apt, index) => (
              <Card
                key={apt.id}
                className="overflow-hidden group hover:shadow-2xl transition-all duration-500 bg-card border-border animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={apt.image}
                    alt={apt.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-cormorant font-semibold mb-2 text-gold">
                    {apt.title}
                  </h3>
                  <p className="text-foreground/60 mb-4">{apt.description}</p>
                  <div className="flex items-center gap-4 mb-4 text-sm text-foreground/80">
                    <div className="flex items-center gap-1">
                      <Icon name="Home" size={16} />
                      <span>{apt.area} м²</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="BedDouble" size={16} />
                      <span>{apt.rooms} комнаты</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-cormorant font-bold text-gold">
                      {apt.price.toLocaleString('ru-RU')} ₽
                      <span className="text-sm text-foreground/60 font-montserrat">/ночь</span>
                    </span>
                    <Button
                      onClick={() => scrollToSection('booking')}
                      className="bg-gold text-primary hover:bg-gold/90"
                    >
                      Забронировать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-5xl font-cormorant font-bold text-center mb-4 text-gold">
            Галерея
          </h2>
          <p className="text-center text-foreground/60 mb-16 text-lg">
            Взгляните на наши интерьеры
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {apartments.map((apt, index) => (
              <div
                key={apt.id}
                className="relative overflow-hidden rounded-lg cursor-pointer group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedImage(apt.image)}
              >
                <img
                  src={apt.image}
                  alt={`Gallery ${apt.id}`}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <Icon name="ZoomIn" size={48} className="text-gold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-0">
          <img
            src={selectedImage || ''}
            alt="Full view"
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>

      <section id="reviews" className="py-20 px-6 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-5xl font-cormorant font-bold text-center mb-4 text-gold">
            Отзывы гостей
          </h2>
          <p className="text-center text-foreground/60 mb-16 text-lg">
            Что говорят наши клиенты
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {reviews.map((review, index) => (
              <Card
                key={review.id}
                className="p-8 bg-card border-border animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 text-lg leading-relaxed">{review.text}</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-gold">{review.name}</p>
                  <p className="text-sm text-foreground/60">{review.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-cormorant font-bold text-center mb-4 text-gold">
            О нас
          </h2>
          <p className="text-center text-foreground/60 mb-16 text-lg">
            История премиального гостеприимства
          </p>
          <div className="space-y-8 text-lg leading-relaxed text-foreground/80">
            <p className="animate-fade-in">
              ÉLITE RESIDENCE — это не просто аренда апартаментов. Это искусство создавать
              незабываемые впечатления для самых взыскательных гостей.
            </p>
            <p className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              Каждый наш апартамент спроектирован ведущими дизайнерами и оснащён всем необходимым
              для комфортного пребывания. Мы предлагаем не просто жильё, а стиль жизни, где каждая
              деталь продумана до совершенства.
            </p>
            <p className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              Наша команда работает круглосуточно, чтобы обеспечить вам безупречный сервис и
              полную конфиденциальность. Доверьтесь нашему опыту и откройте для себя новый
              уровень комфорта.
            </p>
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-5xl font-cormorant font-bold text-center mb-4 text-gold">
            Бронирование
          </h2>
          <p className="text-center text-foreground/60 mb-16 text-lg">
            Оставьте заявку, и мы свяжемся с вами
          </p>
          <Card className="p-8 bg-card border-border">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Имя</label>
                <Input placeholder="Введите ваше имя" className="bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Телефон</label>
                <Input placeholder="+7 (999) 123-45-67" className="bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" placeholder="example@mail.ru" className="bg-background" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Дата заезда</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-background"
                      >
                        <Icon name="Calendar" className="mr-2" size={16} />
                        {checkIn ? format(checkIn, 'PPP', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Дата выезда</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-background"
                      >
                        <Icon name="Calendar" className="mr-2" size={16} />
                        {checkOut ? format(checkOut, 'PPP', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Комментарий</label>
                <Textarea
                  placeholder="Расскажите о ваших пожеланиях"
                  className="bg-background min-h-24"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gold text-primary hover:bg-gold/90 text-lg py-6"
              >
                Отправить заявку
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-cormorant font-bold text-center mb-4 text-gold">
            Контакты
          </h2>
          <p className="text-center text-foreground/60 mb-16 text-lg">
            Свяжитесь с нами удобным способом
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card border-border text-center">
              <Icon name="Phone" size={32} className="mx-auto mb-4 text-gold" />
              <h3 className="font-semibold mb-2 text-lg">Телефон</h3>
              <p className="text-foreground/80">+7 (495) 123-45-67</p>
            </Card>
            <Card className="p-8 bg-card border-border text-center">
              <Icon name="Mail" size={32} className="mx-auto mb-4 text-gold" />
              <h3 className="font-semibold mb-2 text-lg">Email</h3>
              <p className="text-foreground/80">info@elite-residence.ru</p>
            </Card>
            <Card className="p-8 bg-card border-border text-center">
              <Icon name="MapPin" size={32} className="mx-auto mb-4 text-gold" />
              <h3 className="font-semibold mb-2 text-lg">Адрес</h3>
              <p className="text-foreground/80">Москва, Пресненская наб., 12</p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto text-center text-foreground/60">
          <p className="font-cormorant text-xl mb-2">ÉLITE RESIDENCE</p>
          <p className="text-sm">© 2026 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
