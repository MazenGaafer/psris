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

const News = () => {
  const latestNews = [
    {
      id: 1,
      title: "افتتاح مشروع تطوير شبكة الطرق الجديدة في مركز باريس",
      summary: "تم افتتاح المرحلة الأولى من مشروع تطوير شبكة الطرق بحضور محافظ كفر الشيخ ورئيس المركز",
      content: "في إطار خطة التطوير الشاملة للمحافظة، تم افتتاح المرحلة الأولى من مشروع تطوير شبكة الطرق في مركز باريس بتكلفة إجمالية 50 مليون جنيه...",
      date: "2024-01-15",
      time: "10:30 ص",
      category: "مشاريع تنموية",
      urgent: false,
      views: 1250,
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "إعلان هام: انقطاع مؤقت في خدمة المياه",
      summary: "انقطاع مؤقت في خدمة المياه يوم الجمعة من الساعة 8 صباحاً حتى 2 ظهراً لأعمال الصيانة",
      content: "تعلن شركة مياه الشرب والصرف الصحي عن انقطاع مؤقت في خدمة المياه في القرى التالية...",
      date: "2024-01-14",
      time: "2:15 م",
      category: "إعلانات هامة",
      urgent: true,
      views: 2100,
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "بدء حملة التطعيم الموسمية في جميع الوحدات الصحية",
      summary: "انطلاق حملة التطعيم الموسمية ضد الأنفلونزا والأمراض المعدية في جميع الوحدات الصحية بالمركز",
      content: "أعلنت مديرية الصحة ببدء حملة التطعيم الموسمية في جميع الوحدات الصحية بمركز باريس اعتباراً من اليوم...",
      date: "2024-01-13",
      time: "9:45 ص",
      category: "الصحة العامة",
      urgent: false,
      views: 875,
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "فتح باب التقدم للمناقصة العمومية لتطوير السوق التجاري",
      summary: "دعوة للشركات المتخصصة للتقدم للمناقصة العمومية لتطوير وتحديث السوق التجاري بمركز باريس",
      content: "تعلن الوحدة المحلية لمركز باريس عن فتح باب التقدم للمناقصة العمومية لتطوير السوق التجاري...",
      date: "2024-01-12",
      time: "11:20 ص",
      category: "مناقصات",
      urgent: false,
      views: 950,
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "زيارة تفقدية لمحافظ كفر الشيخ لمتابعة مشاريع التطوير",
      summary: "قام محافظ كفر الشيخ بزيارة تفقدية للمركز لمتابعة سير العمل في مشاريع التطوير الجارية",
      content: "في إطار المتابعة المستمرة لمشاريع التطوير، قام محافظ كفر الشيخ بزيارة تفقدية لمركز باريس...",
      date: "2024-01-11",
      time: "3:30 م",
      category: "زيارات رسمية",
      urgent: false,
      views: 1580,
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">آخر الأخبار</h2>
            <p className="text-lg text-muted-foreground">أحدث الأخبار والفعاليات في مركز باريس</p>
          </div>

          <div className="space-y-6">
            {latestNews.map((article) => {
              const CategoryIcon = getCategoryIcon(article.category);
              
              return (
                <Card key={article.id} className="card-shadow hover:card-shadow-hover transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/3">
                      <div className="h-48 lg:h-full bg-muted rounded-lg lg:rounded-r-none flex items-center justify-center">
                        <Building className="w-16 h-16 text-muted-foreground" />
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
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {article.date}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {article.time}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-3 leading-relaxed">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {article.summary}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {article.views} مشاهدة
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4 mr-2" />
                            مشاركة
                          </Button>
                          <Button size="sm">
                            اقرأ المزيد
                            <ArrowLeft className="w-4 h-4 mr-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
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