import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, Clock, Users, FileText, TrendingUp, LogOut, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  user_type: string;
  first_name: string;
  last_name: string;
  employee_id?: string;
}

type ComplaintStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: ComplaintStatus;
  created_at: string;
  user_id: string;
  profiles?: {
    first_name: string;
    last_name: string;
    national_id: string;
  } | null;
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

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

      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError || !profileData) {
        toast({
          title: "خطأ",
          description: "لا يمكن الوصول للملف الشخصي",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      setProfile(profileData);

      // Only admin can access dashboard
      if (profileData.user_type !== 'admin') {
        toast({
          title: "غير مصرح",
          description: "هذه الصفحة للمسؤول فقط",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      // Fetch complaints
      await fetchComplaints();
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name,
            national_id
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setComplaints((data as any[]) || []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الشكاوي",
        variant: "destructive",
      });
    }
  };

  const updateComplaintStatus = async (complaintId: string, newStatus: ComplaintStatus) => {
    try {
      const { error } = await supabase
        .from('complaints')
        .update({ 
          status: newStatus,
          resolved_at: newStatus === 'resolved' ? new Date().toISOString() : null
        })
        .eq('id', complaintId);

      if (error) throw error;

      toast({
        title: "تم التحديث",
        description: "تم تحديث حالة الشكوى بنجاح",
      });

      await fetchComplaints();
    } catch (error) {
      console.error('Error updating complaint:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث الشكوى",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      infrastructure: 'البنية التحتية',
      public_services: 'الخدمات العامة',
      health: 'الصحة',
      education: 'التعليم',
      environment: 'البيئة',
      security: 'الأمن',
      other: 'أخرى'
    };
    return labels[category] || category;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'قيد الانتظار',
      in_progress: 'قيد المعالجة',
      resolved: 'تم الحل',
      rejected: 'مرفوضة'
    };
    return labels[status] || status;
  };

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      urgent: 'عاجل',
      high: 'عالي',
      medium: 'متوسط',
      low: 'منخفض'
    };
    return labels[priority] || priority;
  };

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    inProgress: complaints.filter(c => c.status === 'in_progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
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
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                لوحة التحكم - {profile?.user_type === 'admin' ? 'المسؤول' : 'غير مصرح'}
              </h1>
              <p className="text-gray-600">
                مرحباً {profile?.first_name} {profile?.last_name}
              </p>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/manage-employees')} variant="outline">
                <Settings className="h-4 w-4 ml-2" />
                إدارة الموظفين
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="h-4 w-4 ml-2" />
                تسجيل خروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الشكاوي</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">قيد الانتظار</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">قيد المعالجة</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">تم الحل</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            </CardContent>
          </Card>
        </div>

        {/* Complaints Table */}
        <Card>
          <CardHeader>
            <CardTitle>الشكاوي</CardTitle>
            <CardDescription>
              إدارة جميع الشكاوي المقدمة من المواطنين
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>العنوان</TableHead>
                  <TableHead>مقدم الشكوى</TableHead>
                  <TableHead>الفئة</TableHead>
                  <TableHead>الأولوية</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.title}</TableCell>
                    <TableCell>
                      {complaint.profiles?.first_name} {complaint.profiles?.last_name}
                      <br />
                      <span className="text-sm text-gray-500">
                        {complaint.profiles?.national_id}
                      </span>
                    </TableCell>
                    <TableCell>{getCategoryLabel(complaint.category)}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(complaint.priority)}>
                        {getPriorityLabel(complaint.priority)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(complaint.status)}>
                        {getStatusLabel(complaint.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(complaint.created_at).toLocaleDateString('ar-EG')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {complaint.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => updateComplaintStatus(complaint.id, 'in_progress')}
                          >
                            بدء المعالجة
                          </Button>
                        )}
                        {complaint.status === 'in_progress' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateComplaintStatus(complaint.id, 'resolved')}
                          >
                            تم الحل
                          </Button>
                        )}
                        {complaint.status !== 'rejected' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateComplaintStatus(complaint.id, 'rejected')}
                          >
                            رفض
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {complaints.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">لا توجد شكاوي حالياً</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;