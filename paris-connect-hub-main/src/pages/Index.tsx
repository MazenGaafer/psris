import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  MapPin, 
  Users, 
  Building, 
  Phone, 
  Mail, 
  Calendar,
  FileText,
  MessageSquare,
  Shield,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Menu,
  User,
  LogOut,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
          fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        await fetchProfile(user.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح",
      });
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الخروج",
        variant: "destructive",
      });
    }
  };
  const quickServices = [
    {
      title: "تقديم شكوى",
      description: "قدم شكواك أو اقتراحك بسهولة",
      icon: MessageSquare,
      color: "bg-paris-blue",
      href: "/submit-complaint"
    },
    {
      title: "خدمات المواطنين",
      description: "الحصول على الخدمات الحكومية",
      icon: Shield,
      color: "bg-paris-green",
      href: "/services"
    },
    {
      title: "التقارير والبيانات",
      description: "تصفح التقارير والإحصائيات",
      icon: FileText,
      color: "bg-paris-gold",
      href: "/reports"
    },
    {
      title: "الوحدة المحلية",
      description: "معلومات الإدارة المحلية",
      icon: Building,
      color: "bg-paris-light-blue",
      href: "/dashboard"
    }
  ];

  const news = [
    {
      title: "افتتاح مشروع تطوير الطرق الجديد",
      date: "2024-01-15",
      summary: "تم افتتاح مشروع تطوير شبكة الطرق الرئيسية في مركز باريس بحضور المسؤولين",
      urgent: false
    },
    {
      title: "إعلان هام: انقطاع المياه المؤقت",
      date: "2024-01-14",
      summary: "انقطاع مؤقت في خدمة المياه يوم الجمعة من الساعة 8 صباحاً حتى 2 ظهراً",
      urgent: true
    },
    {
      title: "حملة التطعيم الموسمية",
      date: "2024-01-13",
      summary: "بدء حملة التطعيم الموسمية في جميع الوحدات الصحية بالمركز",
      urgent: false
    }
  ];

  const parisInfo = {
    population: "٨٥,٠٠٠",
    villages: "٢٣",
    area: "٤٢٠",
    established: "١٩٧٢"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 hero-gradient rounded-full flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">مركز باريس</h1>
                <p className="text-sm text-muted-foreground">محافظة كفر الشيخ</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">الرئيسية</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">عن المركز</Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">الخدمات</Link>
              <Link to="/news" className="text-muted-foreground hover:text-primary transition-colors">الأخبار</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">تواصل معنا</Link>
              
              {loading ? (
                <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {profile?.first_name || 'المستخدم'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {profile?.first_name} {profile?.last_name}
                    </div>
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">
                      {user.email}
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/submit-complaint" className="cursor-pointer">
                        <MessageSquare className="w-4 h-4 ml-2" />
                        تقديم شكوى
                      </Link>
                    </DropdownMenuItem>
                    {profile?.user_type === 'employee' && (
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="cursor-pointer">
                          <Settings className="w-4 h-4 ml-2" />
                          لوحة التحكم
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                      <LogOut className="w-4 h-4 ml-2" />
                      تسجيل خروج
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm">تسجيل الدخول</Button>
                </Link>
              )}
            </nav>
            <Button variant="outline" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              مرحباً بكم في مركز باريس
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 animate-slide-in-right">
              خدمات متميزة وإدارة حديثة لخدمة المواطنين وتطوير المجتمع المحلي
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/services">
                <Button size="lg" className="btn-secondary text-lg px-8 py-3">
                  الخدمات الإلكترونية
                  <ExternalLink className="w-5 h-5 mr-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  تعرف على المركز
                  <ChevronLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Quick Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">الخدمات السريعة</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              احصل على الخدمات التي تحتاجها بسهولة وسرعة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickServices.map((service, index) => (
              <Link key={index} to={service.href}>
                <Card className="card-shadow hover:card-shadow-hover transition-all duration-300 hover:scale-105 cursor-pointer group h-full">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-float`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-sm">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Paris Center */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">نبذة عن مركز باريس</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                يعد مركز باريس أحد أهم المراكز الإدارية في محافظة كفر الشيخ، ويضم العديد من القرى والتجمعات السكانية. 
                يتميز المركز بموقعه الاستراتيجي وخدماته المتنوعة التي تهدف إلى خدمة المواطنين وتطوير المنطقة.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-card rounded-lg card-shadow">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{parisInfo.population}</div>
                  <div className="text-sm text-muted-foreground">نسمة</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg card-shadow">
                  <MapPin className="w-8 h-8 text-paris-green mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{parisInfo.villages}</div>
                  <div className="text-sm text-muted-foreground">قرية</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg card-shadow">
                  <Building className="w-8 h-8 text-paris-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{parisInfo.area}</div>
                  <div className="text-sm text-muted-foreground">كم²</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg card-shadow">
                  <Calendar className="w-8 h-8 text-paris-light-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{parisInfo.established}</div>
                  <div className="text-sm text-muted-foreground">تأسس</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 card-shadow">
              <div className="text-center">
                <Heart className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
                <h3 className="text-2xl font-bold text-foreground mb-4">رؤيتنا</h3>
                <p className="text-muted-foreground mb-6">
                  نسعى لجعل مركز باريس نموذجاً في الخدمات الحكومية الرقمية وتطوير المجتمع المحلي
                </p>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-paris-gold fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">آخر الأخبار والإعلانات</h2>
            <p className="text-lg text-muted-foreground">تابع أحدث الأخبار والفعاليات في مركز باريس</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <Card key={index} className="card-shadow hover:card-shadow-hover transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={item.urgent ? "destructive" : "secondary"}>
                      {item.urgent ? "عاجل" : "إعلان"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  <CardTitle className="text-lg leading-relaxed">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">{item.summary}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/news">
              <Button variant="outline" size="lg">
                عرض جميع الأخبار
                <ChevronLeft className="w-5 h-5 mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">تواصل معنا</h2>
            <p className="text-lg text-muted-foreground">نحن هنا لخدمتكم</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center card-shadow">
              <CardContent className="pt-6">
                <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">الهاتف</h3>
                <p className="text-muted-foreground">047-1234567</p>
                <p className="text-muted-foreground">047-1234568</p>
              </CardContent>
            </Card>
            
            <Card className="text-center card-shadow">
              <CardContent className="pt-6">
                <Mail className="w-12 h-12 text-paris-green mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">البريد الإلكتروني</h3>
                <p className="text-muted-foreground">info@paris-center.gov.eg</p>
                <p className="text-muted-foreground">complaints@paris-center.gov.eg</p>
              </CardContent>
            </Card>
            
            <Card className="text-center card-shadow">
              <CardContent className="pt-6">
                <MapPin className="w-12 h-12 text-paris-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">العنوان</h3>
                <p className="text-muted-foreground">مركز باريس</p>
                <p className="text-muted-foreground">محافظة كفر الشيخ، مصر</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">مركز باريس</h3>
                  <p className="text-sm opacity-80">محافظة كفر الشيخ</p>
                </div>
              </div>
              <p className="text-sm opacity-80 leading-relaxed">
                نسعى لتقديم أفضل الخدمات للمواطنين وتطوير المجتمع المحلي
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/about" className="hover:opacity-100 transition-opacity">عن المركز</Link></li>
                <li><Link to="/services" className="hover:opacity-100 transition-opacity">الخدمات</Link></li>
                <li><Link to="/news" className="hover:opacity-100 transition-opacity">الأخبار</Link></li>
                <li><Link to="/submit-complaint" className="hover:opacity-100 transition-opacity">الشكاوى</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">الخدمات</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/submit-complaint" className="hover:opacity-100 transition-opacity">تقديم شكوى</Link></li>
                <li><Link to="/services" className="hover:opacity-100 transition-opacity">خدمات المواطنين</Link></li>
                <li><Link to="/services" className="hover:opacity-100 transition-opacity">التقارير</Link></li>
                <li><Link to="/dashboard" className="hover:opacity-100 transition-opacity">الوحدة المحلية</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">معلومات التواصل</h4>
              <div className="space-y-2 text-sm opacity-80">
                <p>📞 047-1234567</p>
                <p>✉️ info@paris-center.gov.eg</p>
                <p>📍 مركز باريس، كفر الشيخ</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-80">
            <p>&copy; ٢٠٢٤ مركز باريس - محافظة كفر الشيخ. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
