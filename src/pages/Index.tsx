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
import { motion } from "framer-motion";
import NavBar from "@/components/ui/navbar";

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
    population: "حوالي 12,000",
    villages: "8",
    area: "59664",
    established: "غير محدد بدقة"
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              مرحباً بكم في مركز باريس
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl mb-8 opacity-95"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              خدمات متميزة وإدارة حديثة لخدمة المواطنين وتطوير المجتمع المحلي
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link to="/services">
                <Button size="lg" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3">
                  الخدمات الإلكترونية
                  <ExternalLink className="w-5 h-5 mr-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  تعرف على المركز
                  <ChevronLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Quick Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">الخدمات السريعة</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              احصل على الخدمات التي تحتاجها بسهولة وسرعة
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {quickServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={service.href}>
                  <Card className="card-shadow hover:card-shadow-hover transition-all duration-300 hover:scale-105 cursor-pointer group h-full">
                    <CardHeader className="text-center pb-4">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:animate-float`}>
                        <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <CardTitle className="text-base sm:text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-xs sm:text-sm">{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Paris Center */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">نبذة عن مركز باريس</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                مركز باريس هو أحد مراكز محافظة الوادي الجديد، يقع على مسافة 90 كم جنوب مدينة الخارجة، وتبلغ مساحته حوالي 59664 كم² (13.5% من مساحة المحافظة). يضم المركز مدينة باريس و8 وحدات محلية قروية، ويبلغ عدد سكانه حوالي 12 ألف نسمة.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-card rounded-lg card-shadow">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-1 sm:mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-foreground">{parisInfo.population}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">نسمة تقريباً</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-card rounded-lg card-shadow">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-paris-green mx-auto mb-1 sm:mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-foreground">{parisInfo.villages}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">وحدة قروية</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-card rounded-lg card-shadow">
                  <Building className="w-6 h-6 sm:w-8 sm:h-8 text-paris-gold mx-auto mb-1 sm:mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-foreground">{parisInfo.area}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">كم²</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-card rounded-lg card-shadow">
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-paris-light-blue mx-auto mb-1 sm:mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-foreground">{parisInfo.established}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">سنة التأسيس</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 sm:p-8 card-shadow"
            >
              <div className="text-center">
                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-2 sm:mb-4 animate-float" />
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-4">رؤيتنا</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                  نسعى لجعل مركز باريس نموذجاً في الخدمات الحكومية الرقمية وتطوير المجتمع المحلي
                </p>
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 text-paris-gold fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">آخر الأخبار والإعلانات</h2>
            <p className="text-base sm:text-lg text-muted-foreground">تابع أحدث الأخبار والفعاليات في مركز باريس</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {news.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-shadow hover:card-shadow-hover transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={item.urgent ? "destructive" : "secondary"}>
                        {item.urgent ? "عاجل" : "إعلان"}
                      </Badge>
                      <span className="text-xs sm:text-sm text-muted-foreground">{item.date}</span>
                    </div>
                    <CardTitle className="text-base sm:text-lg leading-relaxed">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed text-xs sm:text-sm">{item.summary}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
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
                <p className="text-muted-foreground">محافظة الوادي الجديد، مصر</p>
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
                  <p className="text-sm opacity-80">محافظة الوادي الجديد</p>
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
            <p>&copy; ٢٠٢٤ مركز باريس - محافظة الوادي الجديد. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
