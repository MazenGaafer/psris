import React from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaExchangeAlt, FaFileAlt, FaCertificate, FaGavel, FaChild, FaHandsHelping, FaUniversalAccess } from "react-icons/fa";
import { MdOutlineSupport } from "react-icons/md";

const services = [
  {
    title: "التحويل بين المدارس",
    icon: <FaExchangeAlt className="inline-block text-blue-600 mr-2" size={22} />,
    description: "طلب تحويل طالب من مدرسة إلى أخرى داخل أو خارج المحافظة.",
    documents: [
      "صورة بطاقة ولي الأمر",
      "بيان قيد من المدرسة الحالية",
      "إثبات محل السكن (إيصال مرافق أو عقد إيجار)"
    ],
    steps: [
      "تقديم طلب التحويل في الإدارة التعليمية أو عبر الموقع الإلكتروني",
      "تقديم المستندات المطلوبة",
      "مراجعة الطلب من الإدارة التعليمية",
      "استلام خطاب التحويل وتقديمه للمدرسة الجديدة"
    ],
    fees: "بدون رسوم"
  },
  {
    title: "استخراج بيان نجاح/رسوب",
    icon: <FaFileAlt className="inline-block text-green-600 mr-2" size={22} />,
    description: "خدمة استخراج بيان نجاح أو رسوب للطلاب من المدارس الحكومية.",
    documents: [
      "صورة بطاقة الطالب أو ولي الأمر",
      "إيصال سداد الرسوم (إن وجدت)"
    ],
    steps: [
      "تقديم طلب في شؤون الطلاب بالمدرسة أو الإدارة التعليمية",
      "تقديم المستندات المطلوبة",
      "استلام بيان النجاح أو الرسوب"
    ],
    fees: "رسوم رمزية تحددها الإدارة التعليمية"
  },
  {
    title: "استخراج بدل فاقد لشهادة الثانوية العامة",
    icon: <FaCertificate className="inline-block text-yellow-600 mr-2" size={22} />,
    description: "خدمة استخراج بدل فاقد أو تالف لشهادة الثانوية العامة.",
    documents: [
      "صورة بطاقة الرقم القومي",
      "محضر فقد في قسم الشرطة",
      "إيصال سداد الرسوم"
    ],
    steps: [
      "تقديم طلب في الإدارة التعليمية أو المديرية",
      "تقديم المستندات المطلوبة",
      "استلام الشهادة الجديدة بعد المراجعة"
    ],
    fees: "حوالي 50 جنيه مصري (تتغير حسب اللوائح)"
  },
  {
    title: "تقديم تظلم على نتيجة الامتحان",
    icon: <FaGavel className="inline-block text-red-600 mr-2" size={22} />,
    description: "تقديم تظلم رسمي على نتيجة الامتحانات للطلاب.",
    documents: [
      "صورة بطاقة الطالب",
      "إيصال سداد رسوم التظلم"
    ],
    steps: [
      "تقديم طلب التظلم في الإدارة التعليمية أو عبر الموقع",
      "سداد الرسوم",
      "تحديد موعد للاطلاع على ورقة الإجابة",
      "استلام نتيجة التظلم"
    ],
    fees: "100 جنيه لكل مادة (قابلة للتغيير)"
  },
  {
    title: "التقديم للمدارس الحكومية لأول مرة",
    icon: <FaChild className="inline-block text-pink-600 mr-2" size={22} />,
    description: "تقديم طلب التحاق طفل بالصف الأول الابتدائي أو رياض الأطفال في المدارس الحكومية.",
    documents: [
      "شهادة ميلاد الطفل",
      "صورة بطاقة ولي الأمر",
      "إثبات محل السكن"
    ],
    steps: [
      "تقديم الطلب إلكترونيًا أو في المدرسة",
      "تقديم المستندات المطلوبة",
      "إعلان نتيجة القبول",
      "استكمال إجراءات القيد في المدرسة"
    ],
    fees: "بدون رسوم"
  },
  {
    title: "دعم الطلاب ذوي الاحتياجات الخاصة",
    icon: <FaUniversalAccess className="inline-block text-purple-600 mr-2" size={22} />,
    description: "توفير دعم تعليمي وأجهزة مساعدة وتسهيلات في الامتحانات للطلاب ذوي الإعاقة.",
    documents: [
      "صورة بطاقة الطالب أو ولي الأمر",
      "شهادة الإعاقة أو تقرير طبي"
    ],
    steps: [
      "تقديم طلب الدعم في الإدارة التعليمية",
      "تقديم المستندات المطلوبة",
      "دراسة الحالة وتوفير الدعم المناسب"
    ],
    fees: "قد تفرض رسوم رمزية على بعض الأجهزة أو الخدمات"
  }
];

const EducationServices: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-8">
      {/* زر رجوع */}
      <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
        رجوع
      </Button>
      <div className="flex items-center justify-center mb-4">
        <FaGraduationCap className="text-3xl text-blue-700 ml-2" />
        <h1 className="text-2xl font-bold text-center">الخدمات التعليمية</h1>
      </div>
      <p className="mb-8 text-center text-gray-700">
        جميع الخدمات التعليمية المتاحة في مركز باريس مع تفاصيل المستندات المطلوبة، الخطوات، والرسوم.
      </p>
      <div className="space-y-8">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-6 bg-white shadow-md transition-transform hover:scale-[1.025] hover:shadow-lg relative"
          >
            <div className="flex items-center mb-2">
              {service.icon}
              <h2 className="text-xl font-semibold">{service.title}</h2>
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
            {idx < services.length - 1 && (
              <div className="border-t mt-6 pt-4 border-dashed border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationServices; 