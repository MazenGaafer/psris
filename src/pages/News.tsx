import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Search, 
  Eye, 
  Share2, 
  Bell,
  AlertTriangle,
  Info,
  Award,
  Building,
  Users,
  Megaphone,
  Clock,
  ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import NavBar from "@/components/ui/navbar";

const News = () => {
  const latestNews = [
    {
      id: 1,
      title: "افتتاح محطة طاقة شمسية جديدة بقرية درب الأربعين",
      summary: "تم افتتاح محطة طاقة شمسية حديثة لتوفير الكهرباء لقرى درب الأربعين ضمن خطة التنمية المستدامة.",
      content: "افتتح محافظ الوادي الجديد محطة طاقة شمسية جديدة بقرية درب الأربعين، بطاقة إنتاجية 1 ميجاوات، لتخدم أكثر من 500 منزل وتدعم مشروعات الشباب.",
      date: "2024-07-15",
      time: "10:00 ص",
      category: "مشاريع تنموية",
      urgent: false,
      views: 980,
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "بدء حملة تطعيم ضد الحمى القلاعية في جميع الوحدات البيطرية",
      summary: "أعلنت مديرية الطب البيطري عن بدء حملة تطعيم شاملة للماشية ضد الحمى القلاعية في مركز باريس.",
      content: "تستهدف الحملة تطعيم جميع رؤوس الماشية في قرى المركز، وتستمر حتى نهاية الشهر الجاري.",
      date: "2024-07-10",
      time: "9:00 ص",
      category: "الصحة العامة",
      urgent: false,
      views: 720,
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "إعلان هام: قطع المياه عن قرية بغداد للصيانة",
      summary: "سيتم قطع المياه عن قرية بغداد يوم الجمعة من الساعة 8 صباحاً حتى 2 ظهراً لأعمال الصيانة الدورية.",
      content: "تدعو الوحدة المحلية جميع المواطنين لتدبير احتياجاتهم من المياه خلال فترة الانقطاع.",
      date: "2024-07-08",
      time: "8:00 ص",
      category: "إعلانات هامة",
      urgent: true,
      views: 1100,
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "بدء التقديم لمشروعات الشباب الزراعية بقرية عدن",
      summary: "أعلنت الوحدة المحلية عن فتح باب التقديم لمشروعات استصلاح الأراضي للشباب بقرية عدن.",
      content: "تستقبل الطلبات بمقر الوحدة المحلية حتى نهاية الأسبوع القادم، مع أولوية لأبناء المركز.",
      date: "2024-07-05",
      time: "11:00 ص",
      category: "مناقصات",
      urgent: false,
      views: 540,
      image: "/api/placeholder/400/250"
    }
  ];

  const tenders = [
    {
      title: "مناقصة تطوير السوق التجاري",
      deadline: "2024-02-15",
      budget: "15 مليون جنيه",
      status: "جاري"
    },
    {
      title: "توريد معدات طبية للوحدة الصحية",
      deadline: "2024-02-10",
      budget: "3 مليون جنيه",
      status: "جاري"
    },
    {
      title: "مناقصة صيانة شبكة الإنارة",
      deadline: "2024-02-05",
      budget: "8 مليون جنيه",
      status: "منتهي"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "مشاريع تنموية": return Building;
      case "إعلانات هامة": return AlertTriangle;
      case "الصحة العامة": return Info;
      case "مناقصات": return Award;
      case "زيارات رسمية": return Users;
      default: return Bell;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "مشاريع تنموية": return "bg-paris-blue";
      case "إعلانات هامة": return "bg-destructive";
      case "الصحة العامة": return "bg-paris-green";
      case "مناقصات": return "bg-paris-gold";
      case "زيارات رسمية": return "bg-primary";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      {/* Header */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">أخبار وإعلانات المركز</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              تابع آخر الأخبار والفعاليات والإعلانات الهامة في مركز باريس
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="ابحث في الأخبار..." 
                className="pr-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                اشتراك في التنبيهات
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">آخر الأخبار</h2>
            <p className="text-base sm:text-lg text-muted-foreground">أحدث الأخبار والفعاليات في مركز باريس</p>
          </div>

          <div className="space-y-6">
            {latestNews.map((article, index) => {
              const CategoryIcon = getCategoryIcon(article.category);
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="card-shadow hover:card-shadow-hover transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-1/3">
                        <div className="h-48 lg:h-full bg-muted rounded-lg lg:rounded-r-none flex items-center justify-center">
                          <CategoryIcon className="w-16 h-16 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="lg:w-2/3 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {article.urgent && (
                            <Badge variant="destructive" className="animate-pulse">
                              عاجل
                            </Badge>
                          )}
                          <Badge 
                            variant="outline" 
                            className={`${getCategoryColor(article.category)} text-white border-none`}
                          >
                            <CategoryIcon className="w-3 h-3 ml-1" />
                            {article.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                          </div>
                        </div>
                        <CardTitle className="text-base sm:text-lg leading-relaxed mb-2">{article.title}</CardTitle>
                        <CardDescription className="leading-relaxed text-xs sm:text-sm mb-2">{article.summary}</CardDescription>
                        <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" /> {article.views} مشاهدة
                          <Clock className="w-4 h-4" /> {article.time}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              تحميل المزيد من الأخبار
            </Button>
          </div>
        </div>
      </section>

      {/* Tenders Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">المناقصات والمزايدات</h2>
            <p className="text-lg text-muted-foreground">المناقصات الحكومية المتاحة والجارية</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tenders.map((tender, index) => (
              <Card key={index} className="card-shadow hover:card-shadow-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Award className="w-8 h-8 text-paris-gold" />
                    <Badge variant={tender.status === "جاري" ? "default" : "secondary"}>
                      {tender.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-relaxed">{tender.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">آخر موعد:</span>
                      <span className="font-medium">{tender.deadline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الميزانية:</span>
                      <span className="font-medium text-paris-green">{tender.budget}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant={tender.status === "جاري" ? "default" : "outline"}
                    disabled={tender.status !== "جاري"}
                  >
                    {tender.status === "جاري" ? "عرض التفاصيل" : "منتهي"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="p-8 text-center card-shadow bg-gradient-to-r from-primary/10 to-accent/10">
            <Megaphone className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              اشترك في النشرة الإخبارية
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              احصل على آخر الأخبار والإعلانات مباشرة في بريدك الإلكتروني
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1"
              />
              <Button className="btn-primary">
                اشتراك
                <Bell className="w-4 h-4 mr-2" />
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default News;