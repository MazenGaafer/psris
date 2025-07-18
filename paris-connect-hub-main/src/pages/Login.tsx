import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Building, 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  Shield,
  UserPlus,
  LogIn,
  Phone,
  IdCard
} from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("citizen");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Login fields
    email: "",
    password: "",
    employeeId: "",
    // Registration fields
    firstName: "",
    lastName: "",
    nationalId: "",
    phone: "",
    confirmPassword: ""
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkSession();
  }, [navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCitizenLogin = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال البريد الإلكتروني وكلمة المرور",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في مركز باريس"
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCitizenRegister = async () => {
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.nationalId || 
        !formData.email || !formData.phone || !formData.password) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمة المرور وتأكيد كلمة المرور غير متطابقان",
        variant: "destructive"
      });
      return;
    }

    if (formData.nationalId.length !== 14) {
      toast({
        title: "خطأ",
        description: "رقم الهوية القومية يجب أن يكون 14 رقم",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            national_id: formData.nationalId,
            phone: formData.phone,
            user_type: 'citizen'
          }
        }
      });

      if (error) {
        toast({
          title: "خطأ في التسجيل",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: "يرجى تفعيل حسابك من خلال الرابط المرسل على بريدك الإلكتروني"
        });
        // Clear form
        setFormData({
          email: "", password: "", employeeId: "", firstName: "",
          lastName: "", nationalId: "", phone: "", confirmPassword: ""
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeLogin = async () => {
    if (!formData.employeeId || !formData.password) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال الرقم الوظيفي وكلمة المرور",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // For employee login, we'll use the employee ID as email format
      const employeeEmail = `${formData.employeeId}@employee.local`;
      
      const { error } = await supabase.auth.signInWithPassword({
        email: employeeEmail,
        password: formData.password
      });

      if (error) {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "الرقم الوظيفي أو كلمة المرور غير صحيحة",
          variant: "destructive"
        });
      } else {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في بوابة الموظفين"
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const userTypes = [
    {
      id: "citizen",
      title: "المواطنين",
      description: "تسجيل دخول للمواطنين للوصول للخدمات",
      icon: User,
      color: "text-paris-blue"
    },
    {
      id: "employee",
      title: "الموظفين",
      description: "تسجيل دخول للموظفين والإدارة",
      icon: Shield,
      color: "text-paris-green"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">مركز باريس</h1>
            <p className="text-muted-foreground">تسجيل الدخول إلى النظام</p>
          </div>

          <Tabs value={loginType} onValueChange={setLoginType} className="space-y-6">
            {/* User Type Selection */}
            <TabsList className="grid w-full grid-cols-2">
              {userTypes.map((type) => (
                <TabsTrigger key={type.id} value={type.id} className="text-sm">
                  <type.icon className="w-4 h-4 ml-2" />
                  {type.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Citizens Login */}
            <TabsContent value="citizen">
              <Card className="card-shadow">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">تسجيل دخول المواطنين</CardTitle>
                  <CardDescription>
                    قم بتسجيل الدخول للوصول إلى الخدمات الإلكترونية
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">
                        <LogIn className="w-4 h-4 ml-2" />
                        دخول
                      </TabsTrigger>
                      <TabsTrigger value="register">
                        <UserPlus className="w-4 h-4 ml-2" />
                        تسجيل جديد
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="citizen-email">البريد الإلكتروني أو رقم الهوية</Label>
                         <div className="relative">
                           <Input
                             id="citizen-email"
                             type="text"
                             placeholder="example@email.com أو 29912345678901"
                             className="pr-10"
                             value={formData.email}
                             onChange={(e) => handleInputChange("email", e.target.value)}
                           />
                           <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                         </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="citizen-password">كلمة المرور</Label>
                         <div className="relative">
                           <Input
                             id="citizen-password"
                             type={showPassword ? "text" : "password"}
                             placeholder="كلمة المرور"
                             className="pr-10 pl-10"
                             value={formData.password}
                             onChange={(e) => handleInputChange("password", e.target.value)}
                           />
                           <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                           <button
                             type="button"
                             onClick={() => setShowPassword(!showPassword)}
                             className="absolute left-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                           >
                             {showPassword ? <EyeOff /> : <Eye />}
                           </button>
                         </div>
                      </div>

                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember" className="text-sm">تذكرني</Label>
                      </div>

                       <Button 
                         className="w-full btn-primary" 
                         onClick={handleCitizenLogin}
                         disabled={loading}
                       >
                         {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                         <LogIn className="w-4 h-4 mr-2" />
                       </Button>

                      <div className="text-center">
                        <Button variant="link" className="text-sm">
                          نسيت كلمة المرور؟
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="register" className="space-y-4 mt-6">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <Label htmlFor="first-name">الاسم الأول</Label>
                           <Input 
                             id="first-name" 
                             placeholder="الاسم الأول"
                             value={formData.firstName}
                             onChange={(e) => handleInputChange("firstName", e.target.value)}
                           />
                         </div>
                         <div className="space-y-2">
                           <Label htmlFor="last-name">الاسم الأخير</Label>
                           <Input 
                             id="last-name" 
                             placeholder="الاسم الأخير"
                             value={formData.lastName}
                             onChange={(e) => handleInputChange("lastName", e.target.value)}
                           />
                         </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="national-id">رقم الهوية القومية</Label>
                         <div className="relative">
                           <Input
                             id="national-id"
                             placeholder="رقم الهوية المكون من 14 رقم"
                             className="pr-10"
                             value={formData.nationalId}
                             onChange={(e) => handleInputChange("nationalId", e.target.value)}
                             maxLength={14}
                           />
                           <IdCard className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                         </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reg-email">البريد الإلكتروني</Label>
                         <div className="relative">
                           <Input
                             id="reg-email"
                             type="email"
                             placeholder="example@email.com"
                             className="pr-10"
                             value={formData.email}
                             onChange={(e) => handleInputChange("email", e.target.value)}
                           />
                           <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                         </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف</Label>
                         <div className="relative">
                           <Input
                             id="phone"
                             placeholder="01xxxxxxxxx"
                             className="pr-10"
                             value={formData.phone}
                             onChange={(e) => handleInputChange("phone", e.target.value)}
                           />
                           <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                         </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reg-password">كلمة المرور</Label>
                         <div className="relative">
                           <Input
                             id="reg-password"
                             type={showPassword ? "text" : "password"}
                             placeholder="كلمة المرور"
                             className="pr-10 pl-10"
                             value={formData.password}
                             onChange={(e) => handleInputChange("password", e.target.value)}
                           />
                           <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                           <button
                             type="button"
                             onClick={() => setShowPassword(!showPassword)}
                             className="absolute left-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                           >
                             {showPassword ? <EyeOff /> : <Eye />}
                           </button>
                         </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                         <div className="relative">
                           <Input
                             id="confirm-password"
                             type="password"
                             placeholder="تأكيد كلمة المرور"
                             className="pr-10"
                             value={formData.confirmPassword}
                             onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                           />
                           <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                         </div>
                      </div>

                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          أوافق على <Button variant="link" className="p-0 h-auto text-sm">الشروط والأحكام</Button>
                        </Label>
                      </div>

                       <Button 
                         className="w-full btn-secondary"
                         onClick={handleCitizenRegister}
                         disabled={loading}
                       >
                         {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب جديد"}
                         <UserPlus className="w-4 h-4 mr-2" />
                       </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Employee Login */}
            <TabsContent value="employee">
              <Card className="card-shadow">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">بوابة الموظفين</CardTitle>
                  <CardDescription>
                    تسجيل دخول خاص بموظفي مركز باريس
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee-id">الرقم الوظيفي</Label>
                     <div className="relative">
                       <Input
                         id="employee-id"
                         placeholder="الرقم الوظيفي"
                         className="pr-10"
                         value={formData.employeeId}
                         onChange={(e) => handleInputChange("employeeId", e.target.value)}
                       />
                       <IdCard className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                     </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employee-password">كلمة المرور</Label>
                     <div className="relative">
                       <Input
                         id="employee-password"
                         type={showPassword ? "text" : "password"}
                         placeholder="كلمة المرور"
                         className="pr-10 pl-10"
                         value={formData.password}
                         onChange={(e) => handleInputChange("password", e.target.value)}
                       />
                       <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                       <button
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute left-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                       >
                         {showPassword ? <EyeOff /> : <Eye />}
                       </button>
                     </div>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox id="employee-remember" />
                    <Label htmlFor="employee-remember" className="text-sm">تذكر جهاز العمل</Label>
                  </div>

                   <Button 
                     className="w-full" 
                     style={{background: "var(--gradient-primary)"}}
                     onClick={handleEmployeeLogin}
                     disabled={loading}
                   >
                     {loading ? "جاري تسجيل الدخول..." : "دخول بوابة الموظفين"}
                     <Shield className="w-4 h-4 mr-2" />
                   </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>لمشاكل تسجيل الدخول تواصل مع قسم تقنية المعلومات</p>
                    <p>تحويلة: 105</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>© ٢٠٢٤ مركز باريس - محافظة كفر الشيخ</p>
            <p>جميع الحقوق محفوظة</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;