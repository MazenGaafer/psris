import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  MessageSquare, 
  Shield, 
  Users,
  Building,
  Heart,
  GraduationCap,
  Car,
  Home,
  Briefcase,
  Phone,
  Clock,
  CheckCircle,
  ArrowLeft
} from "lucide-react";

const Services = () => {
  const digitalServices = [
    {
      title: "تقديم الشكاوى والمقترحات",
      description: "قدم شكواك أو اقتراحك إلكترونياً وتابع حالة المعالجة",
      icon: MessageSquare,
      color: "bg-paris-blue",
      status: "متاح",
      time: "فوري"
    },
    {
      title: "طلب شهادات وإفادات",
      description: "احصل على الشهادات والإفادات الرسمية بسهولة",
      icon: FileText,
      color: "bg-paris-green",
      status: "متاح",
      time: "٢٤ ساعة"
    },
    {
      title: "متابعة المعاملات",
      description: "تابع حالة معاملاتك الإدارية خطوة بخطوة",
      icon: CheckCircle,
      color: "bg-paris-gold",
      status: "متاح",
      time: "فوري"
    },
    {
      title: "حجز المواعيد",
      description: "احجز موعدك مسبقاً لتجنب الانتظار",
      icon: Clock,
      color: "bg-paris-light-blue",
      status: "قريباً",
      time: "فوري"
    }
  ];

  const governmentServices = [
    {
      category: "الخدمات المدنية",
      icon: Users,
      services: [
        "استخراج شهادة ميلاد",
        "استخراج شهادة وفاة", 
        "تسجيل المواليد",
        "توثيق الأوراق الرسمية",
        "شهادات الإقامة"
      ]
    },
    {
      category: "الخدمات الاجتماعية",
      icon: Heart,
      services: [
        "برامج المساعدات الاجتماعية",
        "رعاية الأيتام والمسنين",
        "برامج التأهيل المهني",
        "دعم الأسر المحتاجة",
        "خدمات ذوي الاحتياجات الخاصة"
      ]
    },
    {
      category: "الخدمات التعليمية",
      icon: GraduationCap,
      services: [
        "التسجيل في المدارس",
        "برامج محو الأمية",
        "دورات تدريبية مهنية",
        "خدمات المكتبة العامة",
        "برامج التعليم المستمر"
      ]
    },
    {
      category: "الخدمات الصحية",
      icon: Heart,
      services: [
        "التطعيمات الإجبارية",
        "الفحوصات الطبية المجانية",
        "حملات التوعية الصحية",
        "خدمات الإسعاف",
        "متابعة الحالات المزمنة"
      ]
    },
    {
      category: "الخدمات العقارية",
      icon: Home,
      services: [
        "تسجيل العقارات",
        "نقل الملكية",
        "رخص البناء",
        "تقسيم الأراضي",
        "حل النزاعات العقارية"
      ]
    },
    {
      category: "الخدمات التجارية",
      icon: Briefcase,
      services: [
        "تراخيص المحلات التجارية",
        "تراخيص المهن الحرة",
        "تسجيل الشركات الصغيرة",
        "خدمات الاستثمار",
        "دعم المشاريع الناشئة"
      ]
    }
  ];

  const emergencyServices = [
    { name: "الشرطة", number: "122", available: "٢٤ ساعة" },
    { name: "الإسعاف", number: "123", available: "٢٤ ساعة" },
    { name: "الإطفاء", number: "180", available: "٢٤ ساعة" },
    { name: "مركز باريس", number: "047-1234567", available: "٨ص - ٢م" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">خدمات المواطنين</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              جميع الخدمات الحكومية والإلكترونية المتاحة لخدمة المواطنين في مركز باريس
            </p>
          </div>
        </div>
      </section>

      {/* Digital Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">الخدمات الإلكترونية</h2>
            <p className="text-lg text-muted-foreground">خدمات رقمية سريعة ومتاحة ٢٤/٧</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalServices.map((service, index) => (
              <Card key={index} className="card-shadow hover:card-shadow-hover transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-float`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Badge variant={service.status === "متاح" ? "default" : "secondary"}>
                      {service.status}
                    </Badge>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 ml-1" />
                      {service.time}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">{service.description}</CardDescription>
                  <Button className="w-full" disabled={service.status !== "متاح"}>
                    {service.status === "متاح" ? "استخدم الخدمة" : "قريباً"}
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Government Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">الخدمات الحكومية</h2>
            <p className="text-lg text-muted-foreground">خدمات متنوعة تغطي جميع احتياجات المواطنين</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governmentServices.map((category, index) => (
              <Card key={index} className="card-shadow hover:card-shadow-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-paris-green rounded-full"></div>
                        {service}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    المزيد من التفاصيل
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">كيفية الحصول على الخدمة</h2>
            <p className="text-lg text-muted-foreground">خطوات بسيطة للحصول على الخدمة التي تحتاجها</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center p-6 card-shadow">
              <div className="w-16 h-16 bg-paris-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">١</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">اختر الخدمة</h3>
              <p className="text-sm text-muted-foreground">حدد الخدمة التي تحتاجها من القائمة</p>
            </Card>

            <Card className="text-center p-6 card-shadow">
              <div className="w-16 h-16 bg-paris-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">٢</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">املأ البيانات</h3>
              <p className="text-sm text-muted-foreground">أدخل المعلومات المطلوبة بدقة</p>
            </Card>

            <Card className="text-center p-6 card-shadow">
              <div className="w-16 h-16 bg-paris-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">٣</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">أرفق المستندات</h3>
              <p className="text-sm text-muted-foreground">قم بتحميل المستندات المطلوبة</p>
            </Card>

            <Card className="text-center p-6 card-shadow">
              <div className="w-16 h-16 bg-paris-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">٤</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">تابع الطلب</h3>
              <p className="text-sm text-muted-foreground">راقب حالة طلبك حتى الانتهاء</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">أرقام الطوارئ</h2>
            <p className="text-lg text-muted-foreground">أرقام مهمة للحالات الطارئة والخدمات العاجلة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyServices.map((service, index) => (
              <Card key={index} className="text-center p-6 card-shadow hover:card-shadow-hover transition-all duration-300">
                <Phone className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h3 className="font-bold text-foreground text-lg mb-2">{service.name}</h3>
                <p className="text-2xl font-bold text-destructive mb-2">{service.number}</p>
                <Badge variant="outline">{service.available}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="p-8 text-center card-shadow bg-gradient-to-r from-primary/10 to-accent/10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              هل تحتاج مساعدة في استخدام الخدمات؟
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              فريقنا متاح لمساعدتك في الحصول على الخدمة التي تحتاجها
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary">
                تواصل معنا
                <Phone className="w-5 h-5 mr-2" />
              </Button>
              <Button variant="outline" size="lg">
                دليل المستخدم
                <FileText className="w-5 h-5 mr-2" />
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Services;