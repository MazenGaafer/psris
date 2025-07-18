import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaBriefcase, FaStore, FaUserTie, FaBuilding, FaChartLine, FaRocket } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const businessServices = [
  {
    title: "تراخيص المحلات التجارية",
    icon: <FaStore className="inline-block text-green-600 mr-2" size={20} />,
    description: "الحصول على ترخيص فتح محل تجاري جديد أو تجديد ترخيص قائم.",
    documents: [
      "عقد إيجار أو ملكية المحل",
      "بطاقة الرقم القومي لصاحب المحل",
      "رخصة سابقة (في حالة التجديد)",
      "سجل تجاري وبطاقة ضريبية"
    ],
    steps: [
      "تقديم طلب الترخيص في الوحدة المحلية",
      "تسليم المستندات المطلوبة",
      "معاينة المحل من قبل اللجنة المختصة",
      "سداد الرسوم واستلام الترخيص"
    ],
    fees: "تختلف حسب نوع النشاط ومساحة المحل (تبدأ من 500 جنيه تقريبًا)"
  },
  {
    title: "تراخيص المهن الحرة",
    icon: <FaUserTie className="inline-block text-blue-600 mr-2" size={20} />,
    description: "الحصول على ترخيص مزاولة مهنة حرة (محاماة، هندسة، طب، ...).",
    documents: [
      "شهادة المؤهل الدراسي",
      "بطاقة الرقم القومي",
      "سجل نقابي (إن وجد)"
    ],
    steps: [
      "تقديم طلب الترخيص في الوحدة المحلية أو النقابة المختصة",
      "تسليم المستندات المطلوبة",
      "سداد الرسوم واستلام الترخيص"
    ],
    fees: "تختلف حسب نوع المهنة (تبدأ من 300 جنيه تقريبًا)"
  },
  {
    title: "تسجيل الشركات الصغيرة",
    icon: <FaBuilding className="inline-block text-yellow-600 mr-2" size={20} />,
    description: "تسجيل الشركات الصغيرة والمتوسطة في السجل التجاري.",
    documents: [
      "عقد تأسيس الشركة",
      "بطاقة الرقم القومي للشركاء",
      "سجل تجاري وبطاقة ضريبية"
    ],
    steps: [
      "تقديم طلب التسجيل في السجل التجاري",
      "تسليم المستندات المطلوبة",
      "سداد الرسوم واستلام السجل التجاري"
    ],
    fees: "تبدأ من 1000 جنيه تقريبًا حسب رأس المال"
  },
  {
    title: "خدمات الاستثمار",
    icon: <FaChartLine className="inline-block text-purple-600 mr-2" size={20} />,
    description: "خدمات دعم وتسهيل الاستثمار للمشروعات الجديدة.",
    documents: [
      "دراسة جدوى المشروع",
      "بطاقة الرقم القومي",
      "مستندات الملكية أو الإيجار"
    ],
    steps: [
      "تقديم طلب الدعم في الهيئة العامة للاستثمار",
      "تسليم المستندات المطلوبة",
      "دراسة المشروع وتقديم التسهيلات"
    ],
    fees: "تختلف حسب نوع الخدمة وحجم المشروع"
  },
  {
    title: "دعم المشاريع الناشئة",
    icon: <FaRocket className="inline-block text-red-600 mr-2" size={20} />,
    description: "تقديم دعم مالي وفني للمشروعات الناشئة والصغيرة.",
    documents: [
      "دراسة جدوى",
      "بطاقة الرقم القومي",
      "مستندات المشروع"
    ],
    steps: [
      "تقديم طلب الدعم في جهاز تنمية المشروعات",
      "تسليم المستندات المطلوبة",
      "دراسة المشروع وتقديم الدعم"
    ],
    fees: "تختلف حسب نوع الدعم وحجم المشروع"
  }
];

const BusinessServices = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12">
      <Card className="max-w-3xl w-full card-shadow relative">
        <CardHeader className="flex flex-row items-center justify-between p-6 pb-2 mb-2">
          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-1 rounded-full bg-muted hover:bg-accent shadow-sm px-3 py-1 text-paris-blue hover:text-primary transition-colors text-sm font-medium"
            style={{ minWidth: 0 }}
          >
            <ArrowRight className="w-5 h-5" />
            <span className="hidden sm:inline">رجوع</span>
          </button>
          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <FaBriefcase className="text-2xl text-blue-700 ml-1" />
            <CardTitle>الخدمات التجارية</CardTitle>
          </div>
          <CardDescription>
            جميع الخدمات التجارية المتاحة في مركز باريس مع تفاصيل المستندات المطلوبة، الخطوات، والرسوم.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {businessServices.map((service, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-6 bg-white shadow-md transition-transform hover:scale-[1.025] hover:shadow-lg relative"
            >
              <div className="flex items-center mb-2">
                {service.icon}
                <h2 className="text-lg font-semibold">{service.title}</h2>
              </div>
              <p className="mb-3 text-gray-700">{service.description}</p>
              <div className="mb-2">
                <span className="font-semibold">المستندات المطلوبة:</span>
                <ul className="list-disc list-inside mr-4 mt-1">
                  {service.documents.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">الخطوات:</span>
                <ol className="list-decimal list-inside mr-4 mt-1">
                  {service.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
              <div>
                <span className="font-semibold">الرسوم:</span> {service.fees}
              </div>
              {idx < businessServices.length - 1 && (
                <div className="border-t mt-6 pt-4 border-dashed border-gray-200" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessServices; 