import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Plus, Trash2, Users, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  employee_id: string;
  national_id: string;
  phone: string;
  created_at: string;
}

interface EmployeeForm {
  first_name: string;
  last_name: string;
  employee_id: string;
  national_id: string;
  phone: string;
  password: string;
  email: string;
  employee_role: string;
}

const ManageEmployees = () => {
  const [user, setUser] = useState<any>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<EmployeeForm>({
    first_name: '',
    last_name: '',
    employee_id: '',
    national_id: '',
    phone: '',
    password: '',
    email: '',
    employee_role: ''
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      setUser(user);

      // Check if user is an admin
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError || !profileData || profileData.user_type !== 'admin') {
        toast({
          title: "غير مصرح",
          description: "هذه الصفحة للمسؤول فقط",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      await fetchEmployees();
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'employee')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات الموظفين",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof EmployeeForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.first_name.trim() || !formData.last_name.trim() || !formData.employee_id.trim() || 
        !formData.national_id.trim() || !formData.phone.trim() || !formData.password.trim()) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // Validate national ID length
    if (formData.national_id.length !== 14) {
      toast({
        title: "رقم قومي غير صحيح",
        description: "الرقم القومي يجب أن يكون 14 رقم",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number
    if (formData.phone.length !== 11) {
      toast({
        title: "رقم الهاتف غير صحيح",
        description: "رقم الهاتف يجب أن يكون 11 رقم",
        variant: "destructive",
      });
      return;
    }

    // Check if employee ID already exists
    const { data: existingEmployee } = await supabase
      .from('profiles')
      .select('employee_id')
      .eq('employee_id', formData.employee_id.trim())
      .single();

    if (existingEmployee) {
      toast({
        title: "رقم وظيفي مكرر",
        description: "هذا الرقم الوظيفي مستخدم بالفعل",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);

      // Create employee email from employee ID
      const email = `${formData.employee_id.trim()}@paris-center.gov.eg`;

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
            national_id: formData.national_id.trim(),
            phone: formData.phone.trim(),
            user_type: 'employee',
            employee_id: formData.employee_id.trim(),
            employee_role: formData.employee_role.trim()
          }
        }
      });

      if (authError) {
        throw authError;
      }

      toast({
        title: "تم إنشاء الحساب",
        description: `تم إنشاء حساب الموظف بنجاح. الإيميل: ${email}`,
      });

      // Reset form
      setFormData({
        first_name: '',
        last_name: '',
        employee_id: '',
        national_id: '',
        phone: '',
        password: '',
        email: '',
        employee_role: ''
      });

      setIsDialogOpen(false);
      await fetchEmployees();
    } catch (error: any) {
      console.error('Error creating employee:', error);
      toast({
        title: "خطأ في الإنشاء",
        description: error.message || "حدث خطأ أثناء إنشاء حساب الموظف",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const deleteEmployee = async (employeeId: string, userId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
      return;
    }

    try {
      // Delete from auth (this will cascade to profiles table)
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) {
        throw error;
      }

      toast({
        title: "تم الحذف",
        description: "تم حذف الموظف بنجاح",
      });

      await fetchEmployees();
    } catch (error: any) {
      console.error('Error deleting employee:', error);
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف الموظف",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="ml-4"
            >
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة للوحة التحكم
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Users className="h-6 w-6 ml-2" />
                إدارة الموظفين
              </h1>
              <p className="text-gray-600">
                إضافة وإدارة حسابات الموظفين
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Employee Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>إضافة موظف جديد</CardTitle>
            <CardDescription>
              إنشاء حساب جديد لموظف في المركز
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة موظف جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إضافة موظف جديد</DialogTitle>
                  <DialogDescription>
                    أدخل بيانات الموظف الجديد لإنشاء حسابه
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">الاسم الأول *</Label>
                      <Input
                        id="first_name"
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">الاسم الأخير *</Label>
                      <Input
                        id="last_name"
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employee_id">الرقم الوظيفي *</Label>
                      <Input
                        id="employee_id"
                        type="text"
                        value={formData.employee_id}
                        onChange={(e) => handleInputChange('employee_id', e.target.value)}
                        placeholder="مثال: 12345"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="national_id">الرقم القومي *</Label>
                      <Input
                        id="national_id"
                        type="text"
                        value={formData.national_id}
                        onChange={(e) => handleInputChange('national_id', e.target.value)}
                        placeholder="14 رقم"
                        maxLength={14}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="example@paris-center.gov.eg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employee_role">نوع الموظف *</Label>
                      <Select onValueChange={(value) => handleInputChange('employee_role', value)} value={formData.employee_role} required>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الموظف" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="doctor">طبيب</SelectItem>
                          <SelectItem value="nurse">ممرضة</SelectItem>
                          <SelectItem value="receptionist">موظف دراسة</SelectItem>
                          <SelectItem value="administrator">مدير</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="01xxxxxxxxx"
                      maxLength={11}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">كلمة المرور *</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute left-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generatePassword}
                      >
                        توليد كلمة مرور
                      </Button>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>ملاحظة:</strong> سيتم إنشاء الإيميل تلقائياً كالتالي:
                      <br />
                      <code className="bg-blue-100 px-2 py-1 rounded">
                        {formData.employee_id || 'الرقم_الوظيفي'}@paris-center.gov.eg
                      </code>
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="flex-1"
                    >
                      {submitting ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1"
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Employees List */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة الموظفين</CardTitle>
            <CardDescription>
              جميع الموظفين المسجلين في النظام
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم</TableHead>
                  <TableHead>الرقم الوظيفي</TableHead>
                  <TableHead>الرقم القومي</TableHead>
                  <TableHead>الهاتف</TableHead>
                  <TableHead>الإيميل</TableHead>
                  <TableHead>تاريخ الإنشاء</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      {employee.first_name} {employee.last_name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{employee.employee_id}</Badge>
                    </TableCell>
                    <TableCell>{employee.national_id}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {employee.employee_id}@paris-center.gov.eg
                      </code>
                    </TableCell>
                    <TableCell>
                      {new Date(employee.created_at).toLocaleDateString('ar-EG')}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteEmployee(employee.id, employee.user_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {employees.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">لا يوجد موظفين مسجلين حالياً</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ManageEmployees;