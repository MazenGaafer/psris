import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaHome, FaRegBuilding, FaExchangeAlt, FaTools, FaMapMarkedAlt, FaGavel } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const realEstateServices = [
  {
    title: "تسجيل العقارات",
    icon: <FaRegBuilding className="inline-block text-blue-600 mr-2" size={20} />,
    description: "تسجيل العقارات والأراضي في الشهر العقاري لضمان الملكية القانونية.",
    documents: [
      "عقد الملكية الأصلي",
      "بطاقة الرقم القومي للمالك",
      "رسم مساحي معتمد"
    ],
    steps: [
      "تقديم طلب التسجيل في الشهر العقاري",
      "تسليم المستندات المطلوبة",
      "سداد الرسوم المقررة",
      "استلام سند الملكية بعد التسجيل"
    ],
    fees: "تختلف حسب قيمة العقار ومساحته (تبدأ من 500 جنيه تقريبًا)"
  },
  {
    title: "نقل الملكية",
    icon: <FaExchangeAlt className="inline-block text-green-600 mr-2" size={20} />,
    description: "نقل ملكية العقار من شخص لآخر عبر الشهر العقاري.",
    documents: [
      "عقد البيع أو الهبة",
      "بطاقة الرقم القومي للطرفين",
      "رسم مساحي معتمد"
    ],
    steps: [
      "تقديم طلب نقل الملكية في الشهر العقاري",
      "تسليم المستندات المطلوبة",
      "سداد الرسوم",
      "استلام سند الملكية الجديد"
    ],
    fees: "تختلف حسب قيمة العقار (نسبة مئوية من قيمة البيع)"
  },
  {
    title: "رخص البناء",
    icon: <FaTools className="inline-block text-yellow-600 mr-2" size={20} />,
    description: "الحصول على رخصة بناء جديدة أو تجديد رخصة قائمة.",
    documents: [
      "عقد الملكية",
      "رسومات هندسية معتمدة",
      "بطاقة الرقم القومي للمالك"
    ],
    steps: [
      "تقديم طلب الرخصة في الوحدة المحلية",
      "تسليم المستندات المطلوبة",
      "معاينة الموقع من اللجنة المختصة",
      "سداد الرسوم واستلام الرخصة"
    ],
    fees: "تختلف حسب مساحة العقار ونوع البناء"
  },
  {
    title: "تقسيم الأراضي",
    icon: <FaMapMarkedAlt className="inline-block text-purple-600 mr-2" size={20} />,
    description: "تقسيم الأراضي الزراعية أو السكنية وفق اللوائح المحلية.",
    documents: [
      "عقد الملكية",
      "مخطط تقسيم معتمد",
      "بطاقة الرقم القومي"
    ],
    steps: [
      "تقديم طلب التقسيم في الوحدة المحلية",
      "تسليم المستندات المطلوبة",
      "معاينة الموقع",
      "سداد الرسوم واستلام الموافقة"
    ],
    fees: "تختلف حسب مساحة الأرض وعدد القطع"
  },
  {
    title: "حل النزاعات العقارية",
    icon: <FaGavel className="inline-block text-red-600 mr-2" size={20} />,
    description: "خدمات حل النزاعات العقارية عبر لجان فض المنازعات أو القضاء.",
    documents: [
      "عقد الملكية أو النزاع",
      "بطاقة الرقم القومي للأطراف",
      "مستندات القضية (إن وجدت)"
    ],
    steps: [
      "تقديم طلب حل النزاع في المركز أو المحكمة",
      "تقديم المستندات المطلوبة",
      "دراسة الحالة واتخاذ القرار"
    ],
    fees: "قد تفرض رسوم حسب نوع النزاع وإجراءاته"
  }
];

const RealEstateServices = () => {
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
            <FaHome className="text-2xl text-blue-700 ml-1" />
            <CardTitle>الخدمات العقارية</CardTitle>
          </div>
          <CardDescription>
            جميع الخدمات العقارية المتاحة في مركز باريس مع تفاصيل المستندات المطلوبة، الخطوات، والرسوم.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {realEstateServices.map((service, idx) => (
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
              {idx < realEstateServices.length - 1 && (
                <div className="border-t mt-6 pt-4 border-dashed border-gray-200" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RealEstateServices; 