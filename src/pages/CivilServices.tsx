import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaUsers, FaIdCard, FaUserPlus, FaFileSignature, FaHome, FaUserCheck } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const civilServices = [
  {
    title: "استخراج شهادة ميلاد",
    icon: <FaIdCard className="inline-block text-blue-600 mr-2" size={20} />,
    description: "خدمة استخراج شهادة ميلاد مميكنة من السجل المدني بالمركز.",
    documents: [
      "صورة بطاقة الرقم القومي للأب أو الأم",
      "صورة من وثيقة الزواج أو الطلاق (إن وجدت)",
      "إثبات شخصية مقدم الطلب"
    ],
    steps: [
      "تقديم الطلب في السجل المدني أو عبر الموقع الإلكتروني (إن وجد)",
      "تسليم المستندات المطلوبة للموظف المختص",
      "سداد الرسوم المقررة",
      "استلام الشهادة في نفس اليوم أو في اليوم التالي"
    ],
    fees: "50 جنيه تقريبًا للشهادة المميكنة (قد تختلف حسب التحديثات الحكومية)"
  },
  {
    title: "استخراج شهادة وفاة",
    icon: <FaUserPlus className="inline-block text-red-600 mr-2" size={20} />,
    description: "خدمة استخراج شهادة وفاة رسمية من السجل المدني.",
    documents: [
      "صورة بطاقة الرقم القومي لمقدم الطلب",
      "صورة من شهادة الوفاة (إن وجدت)",
      "إثبات صلة القرابة"
    ],
    steps: [
      "تقديم الطلب في السجل المدني",
      "تسليم المستندات المطلوبة",
      "سداد الرسوم",
      "استلام الشهادة"
    ],
    fees: "50 جنيه تقريبًا للشهادة المميكنة"
  },
  {
    title: "تسجيل المواليد",
    icon: <FaUserCheck className="inline-block text-green-600 mr-2" size={20} />,
    description: "تسجيل المواليد الجدد في السجل المدني.",
    documents: [
      "شهادة الميلاد الأصلية",
      "صورة بطاقة الأب أو الأم",
      "وثيقة الزواج"
    ],
    steps: [
      "تقديم الطلب في السجل المدني",
      "تسليم المستندات المطلوبة",
      "سداد الرسوم",
      "استلام شهادة الميلاد"
    ],
    fees: "بدون رسوم لأول مرة"
  },
  {
    title: "توثيق الأوراق الرسمية",
    icon: <FaFileSignature className="inline-block text-yellow-600 mr-2" size={20} />,
    description: "توثيق الأوراق الرسمية في المركز أو السجل المدني.",
    documents: [
      "الأصل وصورة من الورقة الرسمية",
      "صورة بطاقة الرقم القومي"
    ],
    steps: [
      "تقديم الطلب في المركز",
      "تسليم المستندات المطلوبة",
      "سداد الرسوم",
      "استلام الورقة الموثقة"
    ],
    fees: "20 جنيه تقريبًا لكل ورقة"
  },
  {
    title: "شهادات الإقامة",
    icon: <FaHome className="inline-block text-purple-600 mr-2" size={20} />,
    description: "استخراج شهادة إقامة رسمية لإثبات محل السكن.",
    documents: [
      "صورة بطاقة الرقم القومي",
      "إيصال مرافق حديث (كهرباء/مياه/غاز)",
      "عقد إيجار أو ملكية (إن وجد)"
    ],
    steps: [
      "تقديم الطلب في المركز",
      "تسليم المستندات المطلوبة",
      "سداد الرسوم",
      "استلام الشهادة"
    ],
    fees: "30 جنيه تقريبًا"
  }
];

const CivilServices = () => {
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
            <FaUsers className="text-2xl text-blue-700 ml-1" />
            <CardTitle>الخدمات المدنية</CardTitle>
          </div>
          <CardDescription>
            تعرف على جميع الخدمات المدنية المتاحة في مركز باريس، مع تفاصيل المستندات المطلوبة، الخطوات، والرسوم.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {civilServices.map((service, idx) => (
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
              {idx < civilServices.length - 1 && (
                <div className="border-t mt-6 pt-4 border-dashed border-gray-200" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CivilServices; 