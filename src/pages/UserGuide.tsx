import React from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { FaRegQuestionCircle, FaUserCheck, FaSearch, FaEnvelopeOpenText, FaFileAlt, FaSignInAlt } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch className="text-blue-600 text-2xl mb-2 mx-auto" />,
    title: "تصفح الخدمات",
    description: "ابدأ من صفحة الخدمات لاستعراض جميع الخدمات الحكومية والإلكترونية المتاحة في مركز باريس. يمكنك تصفح التصنيفات أو البحث عن خدمة محددة."
  },
  {
    icon: <FaFileAlt className="text-green-600 text-2xl mb-2 mx-auto" />,
    title: "قراءة تفاصيل الخدمة",
    description: "اضغط على أي خدمة لعرض تفاصيلها: المستندات المطلوبة، الخطوات، والرسوم. ستجد شرحًا وافيًا لكل خدمة."
  },
  {
    icon: <FaUserCheck className="text-purple-600 text-2xl mb-2 mx-auto" />,
    title: "تسجيل الدخول أو إنشاء حساب",
    description: "لبعض الخدمات ستحتاج إلى تسجيل الدخول أو إنشاء حساب جديد. استخدم زر تسجيل الدخول في أعلى الصفحة واتبع التعليمات."
  },
  {
    icon: <FaEnvelopeOpenText className="text-pink-600 text-2xl mb-2 mx-auto" />,
    title: "تقديم الطلب أو الشكوى",
    description: "املأ النموذج الخاص بالخدمة (مثل تقديم شكوى أو طلب شهادة) وأرسل البيانات. ستظهر لك رسالة تأكيد عند نجاح العملية."
  },
  {
    icon: <FaRegQuestionCircle className="text-yellow-600 text-2xl mb-2 mx-auto" />,
    title: "الحصول على الدعم والمساعدة",
    description: "إذا واجهت أي مشكلة أو لديك استفسار، استخدم زر 'تواصل معنا' للاتصال بفريق الدعم، أو راجع الأسئلة الشائعة في أسفل الصفحة."
  }
];

const UserGuide: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
        رجوع
      </Button>
      <h1 className="text-3xl font-bold text-center mb-4 text-paris-blue">دليل استخدام الموقع</h1>
      <p className="text-center text-gray-700 mb-8">
        هذا الدليل يوضح لك كيفية الاستفادة من جميع الخدمات الإلكترونية والحكومية المتاحة على موقع مركز باريس خطوة بخطوة.
      </p>
      <div className="space-y-8">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center border hover:shadow-lg transition">
            {step.icon}
            <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
            <p className="text-gray-700 text-center">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-2">لم تجد ما تبحث عنه؟</p>
        <Button onClick={() => navigate("/contact")}>تواصل مع فريق الدعم</Button>
      </div>
    </div>
  );
};

export default UserGuide; 