import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaHeart, FaSyringe, FaStethoscope, FaHeartbeat, FaAmbulance, FaNotesMedical } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const healthServices = [
  {
    title: "التطعيمات الإجبارية",
    icon: <FaSyringe className="inline-block text-green-600 mr-2" size={20} />,
    description: "توفير جميع التطعيمات الإجبارية للأطفال وفقًا لجدول وزارة الصحة.",
    documents: [
      "شهادة ميلاد الطفل",
      "بطاقة الرقم القومي لولي الأمر"
    ],
    steps: [
      "تقديم الطفل في الوحدة الصحية أو المركز الطبي",
      "تسليم المستندات المطلوبة",
      "الحصول على التطعيم وتسجيله في الدفتر الصحي"
    ],
    fees: "بدون رسوم"
  },
  {
    title: "الفحوصات الطبية المجانية",
    icon: <FaStethoscope className="inline-block text-blue-600 mr-2" size={20} />,
    description: "إجراء فحوصات طبية مجانية للمواطنين (ضغط، سكر، كشف مبكر عن الأمراض).",
    documents: [
      "بطاقة الرقم القومي"
    ],
    steps: [
      "زيارة الوحدة الصحية أو المركز الطبي",
      "تقديم بطاقة الرقم القومي",
      "إجراء الفحص المطلوب"
    ],
    fees: "بدون رسوم"
  },
  {
    title: "حملات التوعية الصحية",
    icon: <FaHeartbeat className="inline-block text-red-600 mr-2" size={20} />,
    description: "تنظيم حملات توعية صحية حول الأمراض المزمنة، التغذية، النظافة الشخصية، وغيرها.",
    documents: [
      "لا يوجد مستندات مطلوبة"
    ],
    steps: [
      "متابعة إعلانات المركز أو الوحدة الصحية عن الحملات",
      "المشاركة في الحملة"
    ],
    fees: "بدون رسوم"
  },
  {
    title: "خدمات الإسعاف",
    icon: <FaAmbulance className="inline-block text-yellow-600 mr-2" size={20} />,
    description: "توفير خدمات الإسعاف السريع للحالات الطارئة.",
    documents: [
      "لا يوجد مستندات مطلوبة"
    ],
    steps: [
      "الاتصال برقم الإسعاف 123",
      "تحديد موقع الحالة بدقة",
      "انتظار وصول سيارة الإسعاف"
    ],
    fees: "بدون رسوم"
  },
  {
    title: "متابعة الحالات المزمنة",
    icon: <FaNotesMedical className="inline-block text-purple-600 mr-2" size={20} />,
    description: "متابعة طبية دورية للحالات المزمنة (ضغط، سكر، قلب، ...).",
    documents: [
      "بطاقة الرقم القومي",
      "تقرير طبي حديث (إن وجد)"
    ],
    steps: [
      "زيارة الوحدة الصحية أو المركز الطبي",
      "تقديم المستندات المطلوبة",
      "تحديد خطة المتابعة مع الطبيب"
    ],
    fees: "بدون رسوم"
  }
];

const HealthServices = () => {
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
            <FaHeart className="text-2xl text-red-600 ml-1" />
            <CardTitle>الخدمات الصحية</CardTitle>
          </div>
          <CardDescription>
            جميع الخدمات الصحية المتاحة في مركز باريس مع تفاصيل المستندات المطلوبة، الخطوات، والرسوم.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {healthServices.map((service, idx) => (
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
              {idx < healthServices.length - 1 && (
                <div className="border-t mt-6 pt-4 border-dashed border-gray-200" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthServices; 