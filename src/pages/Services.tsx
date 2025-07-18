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
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "@/components/ui/navbar";

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
      status: "متاح",
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
      <NavBar />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {digitalServices.map((service, index) => {
              let link = "#";
              if (service.title === "تقديم الشكاوى والمقترحات") link = "/submit-complaint";
              else if (service.title === "طلب شهادات وإفادات") link = "/request-certificate";
              else if (service.title === "متابعة المعاملات") link = "/track-transactions";
              else if (service.title === "حجز المواعيد") link = "/book-appointment";
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="card-shadow hover:card-shadow-hover transition-all duration-300 cursor-pointer group">
                    <CardHeader className="text-center">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:animate-float`}>
                        <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <CardTitle className="text-base sm:text-lg">{service.title}</CardTitle>
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
                      <CardDescription className="mb-3 sm:mb-4 text-sm sm:text-base">{service.description}</CardDescription>
                      <Link to={link}>
                        <Button className="w-full text-sm sm:text-base">
                          استخدم الخدمة
                          <ArrowLeft className="w-4 h-4 mr-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {governmentServices.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-shadow hover:card-shadow-hover transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <CardTitle className="text-base sm:text-lg">{category.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 sm:space-y-2">
                      {category.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-paris-green rounded-full"></div>
                          {service}
                        </li>
                      ))}
                    </ul>
                    {category.category === "الخدمات المدنية" ? (
                      <Link to="/services/civil">
                        <Button variant="outline" className="w-full mt-4 text-sm sm:text-base">
                          المزيد من التفاصيل
                        </Button>
                      </Link>
                    ) : category.category === "الخدمات الاجتماعية" ? (
                      <Link to="/services/social">
                        <Button variant="outline" className="w-full mt-4 text-sm sm:text-base">
                          المزيد من التفاصيل
                        </Button>
                      </Link>
                    ) : category.category === "الخدمات التعليمية" ? (
                      <Link to="/services/education">
                        <Button variant="outline" className="w-full mt-4 text-sm sm:text-base">
                          المزيد من التفاصيل
                        </Button>
                      </Link>
                    ) : category.category === "الخدمات الصحية" ? (
                      <Link to="/services/health">
                        <Button variant="outline" className="w-full mt-4 text-sm sm:text-base">
                          المزيد من التفاصيل
                        </Button>
                      </Link>
                    ) : category.category === "الخدمات العقارية" ? (
                      <Link to="/services/real-estate">
                        <Button variant="outline" className="w-full mt-4 text-sm sm:text-base">
                          المزيد من التفاصيل
                        </Button>
                      </Link>
                    ) : category.category === "الخدمات التجارية" ? (
                      <Link to="/services/business">
                        <Button variant="outline" className="w-full mt-4 text-sm sm:text-base">
                          المزيد من التفاصيل
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" className="w-full mt-4 text-sm sm:text-base">
                        المزيد من التفاصيل
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            {[1,2,3,4].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center p-4 sm:p-6 card-shadow">
                  <div className="w-16 h-16 bg-paris-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">١</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">اختر الخدمة</h3>
                  <p className="text-sm text-muted-foreground">حدد الخدمة التي تحتاجها من القائمة</p>
                </Card>
              </motion.div>
            ))}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {emergencyServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center p-4 sm:p-6 card-shadow hover:card-shadow-hover transition-all duration-300">
                  <Phone className="w-10 h-10 sm:w-12 sm:h-12 text-destructive mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-bold text-foreground text-base sm:text-lg mb-1 sm:mb-2">{service.name}</h3>
                  <p className="text-xl sm:text-2xl font-bold text-destructive mb-1 sm:mb-2">{service.number}</p>
                  <Badge variant="outline">{service.available}</Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-white border-t mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2 text-paris-blue">هل تحتاج مساعدة في استخدام الخدمات؟</h3>
          <p className="mb-6 text-gray-700">فريقنا متاح لمساعدتك في الحصول على الخدمة التي تحتاجها</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="px-8 py-3">تواصل معنا</Button>
            </Link>
            <Link to="/user-guide">
              <Button variant="outline" size="lg" className="px-8 py-3">دليل المستخدم</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;