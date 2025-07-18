import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Users, 
  Building, 
  Calendar,
  Award,
  Landmark,
  TreePine,
  Factory,
  GraduationCap,
  Heart
} from "lucide-react";

const About = () => {
  const villages = [
    "قرية باريس", "كوم الدهب", "كفر الدوار", "الحاجة فاطمة", "كوم الخليج",
    "بني عامر", "كفر المعصرة", "دمرو", "كفر الحاجة زينب", "ميت فارس",
    "الوادي الجديد", "كفر العم محمود", "عزبة البرلس", "كوم السنانير", "الرملة",
    "كفر النحاس", "عزبة المعصرة", "كوم البراري", "كفر الشريف", "البرامون",
    "عزبة الأحراش", "كوم الحجر", "الغريبة"
  ];

  const features = [
    {
      title: "الموقع الاستراتيجي",
      description: "يقع مركز باريس في موقع متميز بمحافظة كفر الشيخ مما يجعله نقطة وصل مهمة",
      icon: MapPin,
      color: "text-paris-blue"
    },
    {
      title: "التنوع الزراعي",
      description: "أراضي زراعية خصبة تنتج محاصيل متنوعة تساهم في الاقتصاد المحلي",
      icon: TreePine,
      color: "text-paris-green"
    },
    {
      title: "التراث الثقافي",
      description: "تاريخ عريق وتراث ثقافي غني يعكس هوية المنطقة الأصيلة",
      icon: Landmark,
      color: "text-paris-gold"
    },
    {
      title: "التطوير المستمر",
      description: "خطط تطوير شاملة لتحسين الخدمات والبنية التحتية",
      icon: Award,
      color: "text-primary"
    }
  ];

  const services = [
    "الوحدة الصحية المجهزة", "مدارس تعليمية متطورة", "مكتب البريد", 
    "الجمعية الزراعية", "محطة الشرطة", "مركز الشباب", "المسجد الجامع",
    "السوق التجاري", "محطة المياه", "شبكة الكهرباء"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">عن مركز باريس</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              تعرف على تاريخ وحاضر ومستقبل مركز باريس - قلب النماء في محافظة كفر الشيخ
            </p>
          </div>
        </div>
      </section>

      {/* General Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">معلومات عامة عن المركز</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  يعد مركز باريس أحد أهم المراكز الإدارية في محافظة كفر الشيخ، ويقع في الجزء الشمالي من المحافظة.
                  تأسس المركز عام ١٩٧٢ ومنذ ذلك الحين شهد نمواً مستمراً في جميع المجالات.
                </p>
                <p>
                  يضم المركز ٢٣ قرية ونجع، ويبلغ إجمالي مساحته حوالي ٤٢٠ كيلومتر مربع، 
                  ويسكنه أكثر من ٨٥ ألف نسمة يعملون بشكل أساسي في الزراعة والتجارة والحرف المختلفة.
                </p>
                <p>
                  يتميز المركز بموقعه الاستراتيجي الذي يربط بين المحافظات المجاورة، 
                  مما جعله مركزاً تجارياً وإدارياً مهماً في المنطقة.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-6 card-shadow">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground">٨٥,٠٠٠+</h3>
                <p className="text-muted-foreground">نسمة</p>
              </Card>
              <Card className="text-center p-6 card-shadow">
                <MapPin className="w-12 h-12 text-paris-green mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground">٢٣</h3>
                <p className="text-muted-foreground">قرية ونجع</p>
              </Card>
              <Card className="text-center p-6 card-shadow">
                <Building className="w-12 h-12 text-paris-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground">٤٢٠</h3>
                <p className="text-muted-foreground">كم²</p>
              </Card>
              <Card className="text-center p-6 card-shadow">
                <Calendar className="w-12 h-12 text-paris-light-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground">١٩٧٢</h3>
                <p className="text-muted-foreground">سنة التأسيس</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">مميزات المركز</h2>
            <p className="text-lg text-muted-foreground">ما يميز مركز باريس عن غيره من المراكز</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-shadow hover:card-shadow-hover transition-all duration-300 text-center">
                <CardHeader>
                  <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Villages List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">دليل القرى التابعة</h2>
            <p className="text-lg text-muted-foreground">جميع القرى والنجوع التابعة لمركز باريس</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {villages.map((village, index) => (
              <Card key={index} className="p-4 text-center card-shadow hover:card-shadow-hover transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-paris-blue group-hover:text-primary transition-colors" />
                  <span className="font-medium text-foreground">{village}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="btn-primary">
              عرض الخريطة التفاعلية
              <MapPin className="w-5 h-5 mr-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">الخدمات المتاحة</h2>
            <p className="text-lg text-muted-foreground">الخدمات والمرافق المتوفرة في المركز</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg card-shadow">
                <div className="w-3 h-3 bg-paris-green rounded-full"></div>
                <span className="text-foreground font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 card-shadow bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="text-center">
                <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">رؤيتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  أن نكون مركزاً نموذجياً في تقديم الخدمات الحكومية الرقمية المتطورة، 
                  ونساهم في بناء مجتمع محلي مزدهر ومستدام يحافظ على تراثه ويواكب التطور.
                </p>
              </div>
            </Card>

            <Card className="p-8 card-shadow bg-gradient-to-br from-accent/5 to-accent/10">
              <div className="text-center">
                <Award className="w-16 h-16 text-accent mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">رسالتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  نلتزم بتقديم خدمات عالية الجودة للمواطنين من خلال الاستفادة من التكنولوجيا الحديثة، 
                  وتطوير البنية التحتية، ودعم التنمية الاقتصادية والاجتماعية المستدامة.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;