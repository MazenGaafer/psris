import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building,
  Users,
  Globe,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  AlertTriangle,
  Info
} from "lucide-react";
import { useState } from "react";
import emailjs from "emailjs-com";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import NavBar from "@/components/ui/navbar";

const Contact = () => {
  const contactInfo = [
    {
      title: "الهاتف الرئيسي",
      value: "047-1234567",
      icon: Phone,
      type: "phone",
      available: "8 ص - 2 م",
      description: "للاستفسارات العامة والخدمات"
    },
    {
      title: "هاتف الشكاوى",
      value: "047-1234568",
      icon: MessageSquare,
      type: "phone",
      available: "24 ساعة",
      description: "خط مخصص لتلقي الشكاوى"
    },
    {
      title: "البريد الإلكتروني",
      value: "info@paris-center.gov.eg",
      icon: Mail,
      type: "email",
      available: "24 ساعة",
      description: "للمراسلات الرسمية"
    },
    {
      title: "بريد الشكاوى",
      value: "complaints@paris-center.gov.eg",
      icon: Mail,
      type: "email",
      available: "24 ساعة",
      description: "لتقديم الشكاوى والمقترحات"
    }
  ];

  const officeHours = [
    { day: "الأحد - الخميس", hours: "8:00 ص - 2:00 م", status: "عمل رسمي" },
    { day: "الجمعة", hours: "مغلق", status: "إجازة" },
    { day: "السبت", hours: "مغلق", status: "إجازة" },
    { day: "الطوارئ", hours: "24 ساعة", status: "متاح" }
  ];

  const departments = [
    {
      name: "مكتب رئيس المركز",
      head: "الأستاذ / عبدالناصر صالح",
      phone: "047-1234567",
      extension: "101",
      description: "الإشراف العام على شؤون المركز"
    },
    {
      name: "قسم الشؤون المالية",
      head: "الأستاذة / فاطمة أحمد",
      phone: "047-1234567",
      extension: "102",
      description: "إدارة الشؤون المالية والمحاسبية"
    },
    {
      name: "قسم شؤون المواطنين",
      head: "الأستاذ / محمد حسن",
      phone: "047-1234567",
      extension: "103",
      description: "خدمات المواطنين والمعاملات"
    },
    {
      name: "قسم التنمية والمشاريع",
      head: "المهندس / سارة محمود",
      phone: "047-1234567",
      extension: "104",
      description: "متابعة مشاريع التنمية"
    }
  ];

  const emergencyNumbers = [
    { service: "الشرطة", number: "122", available: "24 ساعة" },
    { service: "الإسعاف", number: "123", available: "24 ساعة" },
    { service: "الإطفاء", number: "180", available: "24 ساعة" },
    { service: "خدمة المياه", number: "125", available: "24 ساعة" },
    { service: "انقطاع الكهرباء", number: "121", available: "24 ساعة" }
  ];

  const socialMedia = [
    { name: "فيسبوك", icon: Facebook, url: "#", color: "text-blue-600" },
    { name: "تويتر", icon: Twitter, url: "#", color: "text-blue-400" },
    { name: "يوتيوب", icon: Youtube, url: "#", color: "text-red-600" },
    { name: "إنستجرام", icon: Instagram, url: "#", color: "text-pink-600" }
  ];

  // حالة بيانات النموذج
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // دالة تغيير القيم
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // دالة الإرسال عبر EmailJS
  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSent(false);
    try {
      // ضع بياناتك هنا
      const serviceId = "service_3i01g6nS";
      const templateId = "__ejs-test-mail-service__";
      const userId = "5xaxXL52WHMEh-nzp";
      const templateParams = {
        from_name: form.name,
        from_phone: form.phone,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
        to_email: "mazengaafer8@gmail.com"
      };
      await emailjs.send(serviceId, templateId, templateParams, userId);
      setSent(true);
      setForm({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      {/* Header */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">تواصل معنا</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              نحن هنا لخدمتكم والإجابة على جميع استفساراتكم
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">معلومات التواصل</h2>
            <p className="text-base sm:text-lg text-muted-foreground">طرق متعددة للتواصل معنا</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center card-shadow hover:card-shadow-hover transition-all duration-300">
                  <CardHeader>
                    <contact.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
                    <CardTitle className="text-base sm:text-lg">{contact.title}</CardTitle>
                    <Badge variant="outline">{contact.available}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg sm:text-xl font-bold text-foreground mb-2">{contact.value}</p>
                    <CardDescription className="text-xs sm:text-sm">{contact.description}</CardDescription>
                    <Button className="w-full mt-4" variant="outline">
                      {contact.type === 'phone' ? 'اتصل الآن' : 'إرسال بريد'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Hours */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 card-shadow">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl text-foreground mb-4">أرسل رسالة</CardTitle>
                <CardDescription>اترك رسالتك وسنرد عليك في أقرب وقت</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <form className="space-y-4" onSubmit={handleSend}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input id="name" value={form.name} onChange={handleChange} placeholder="أدخل اسمك الكامل" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input id="phone" value={form.phone} onChange={handleChange} placeholder="رقم الهاتف" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="example@email.com" required />
                  </div>
                  <div>
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input id="subject" value={form.subject} onChange={handleChange} placeholder="موضوع الرسالة" required />
                  </div>
                  <div>
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea id="message" value={form.message} onChange={handleChange} placeholder="اكتب رسالتك هنا..." rows={5} required />
                  </div>
                  <Button className="w-full btn-primary" type="submit" disabled={sending}>
                    {sending ? "جاري الإرسال..." : "إرسال الرسالة"}
                    <Send className="w-4 h-4 mr-2" />
                  </Button>
                  {(sent || error) && (
                    <motion.div
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5 }}
                      className={`text-center rounded-lg py-3 px-4 mb-6 font-bold shadow-md ${sent ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}
                    >
                      {sent ? "تم إرسال رسالتك بنجاح! سنرد عليك قريباً." : error}
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Office Hours & Location */}
            <div className="space-y-6">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    ساعات العمل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <span className="font-medium text-foreground">{schedule.day}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{schedule.hours}</span>
                          <Badge
                            variant={schedule.status === "عمل رسمي" ? "default" :
                              schedule.status === "متاح" ? "default" : "secondary"}
                          >
                            {schedule.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    العنوان
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">الوحدة المحلية لمركز باريس</p>
                    <p className="text-muted-foreground">شارع الجمهورية الرئيسي</p>
                    <p className="text-muted-foreground">مركز باريس، محافظة الوادي الجديد</p>
                    <p className="text-muted-foreground">جمهورية مصر العربية</p>
                  </div>
                  
                  <a href="https://maps.app.goo.gl/WGbGXuhQAypw4BZt8" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full mt-4" variant="outline">
                    عرض على الخريطة
                    <MapPin className="w-4 h-4 mr-2" />
                  </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">الأقسام والإدارات</h2>
            <p className="text-lg text-muted-foreground">تواصل مباشرة مع الإدارة المختصة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card key={index} className="card-shadow hover:card-shadow-hover transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Building className="w-8 h-8 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{dept.name}</CardTitle>
                        <CardDescription>{dept.head}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{dept.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">تحويلة: {dept.extension}</span>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        اتصال
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Numbers */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">أرقام الطوارئ</h2>
            <p className="text-lg text-muted-foreground">أرقام مهمة للحالات الطارئة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {emergencyNumbers.map((emergency, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card key={index} className="text-center p-6 card-shadow hover:card-shadow-hover transition-all duration-300">
                  <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-3" />
                  <h3 className="font-bold text-foreground mb-2">{emergency.service}</h3>
                  <p className="text-2xl font-bold text-destructive mb-2">{emergency.number}</p>
                  <Badge variant="outline" className="text-xs">{emergency.available}</Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">تابعنا على وسائل التواصل</h2>
            <p className="text-lg text-muted-foreground">ابق على اطلاع بآخر الأخبار والتحديثات</p>
          </div>

          <div className="flex justify-center gap-6">
            {socialMedia.map((social, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card key={index} className="p-6 text-center card-shadow hover:card-shadow-hover transition-all duration-300 cursor-pointer group">
                  <social.icon className={`w-12 h-12 ${social.color} mx-auto mb-3 group-hover:animate-float`} />
                  <p className="font-medium text-foreground">{social.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Banner */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="p-8 text-center card-shadow bg-gradient-to-r from-primary/10 to-accent/10">
            <Info className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              هل لديك سؤال شائع؟
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              قد تجد إجابة سؤالك في قسم الأسئلة الشائعة
            </p>
            <Button size="lg" variant="outline">
              عرض الأسئلة الشائعة
            </Button>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white border-t mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">الأسئلة الشائعة</h2>
            <p className="text-base sm:text-lg text-muted-foreground">إجابات عن أكثر الأسئلة شيوعاً حول خدمات المركز</p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="q1">
                <AccordionTrigger className="font-bold text-right">كيف يمكنني تقديم شكوى أو مقترح؟</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-right">
                  يمكنك تقديم الشكاوى والمقترحات من خلال صفحة "تقديم شكوى" أو عبر البريد الإلكتروني المخصص للشكاوى أو الاتصال بالخط الساخن.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger className="font-bold text-right">ما هي مواعيد العمل الرسمية في المركز؟</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-right">
                  من الأحد إلى الخميس من 8 صباحاً حتى 2 ظهراً. الطوارئ متاحة 24 ساعة.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger className="font-bold text-right">كيف أحصل على شهادة ميلاد أو مستند رسمي؟</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-right">
                  يمكنك التوجه إلى قسم الخدمات المدنية أو استخدام الخدمات الإلكترونية عبر الموقع.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger className="font-bold text-right">هل يمكن متابعة حالة الطلبات إلكترونياً؟</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-right">
                  نعم، يمكنك متابعة حالة الطلبات من خلال صفحة "متابعة المعاملات" باستخدام رقم المعاملة.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5">
                <AccordionTrigger className="font-bold text-right">كيف أتواصل مع رئيس المركز أو الإدارة؟</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-right">
                  يمكنك التواصل عبر أرقام الهواتف الرسمية أو البريد الإلكتروني أو زيارة مقر المركز خلال ساعات العمل.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

// تعليمات:
// 1. ثبّت مكتبة emailjs-com: npm install emailjs-com
// 2. أنشئ حساب EmailJS وأضف service/template/public key
// 3. ضع القيم في المتغيرات أعلاه
// 4. الرسائل ستصل إلى mazengaafer8@gmail.com