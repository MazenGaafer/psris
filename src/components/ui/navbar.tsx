import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { MessageSquare, User, LogOut, Settings, Building, Menu, ExternalLink, ChevronLeft, Info, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const NavBar = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
          fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        await fetchProfile(user.id);
      }
    } catch (error) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (!error) setProfile(data);
    } catch (error) {}
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({ title: "تم تسجيل الخروج", description: "تم تسجيل خروجك بنجاح" });
      setUser(null);
      setProfile(null);
      navigate("/");
    } catch (error) {
      toast({ title: "خطأ", description: "حدث خطأ أثناء تسجيل الخروج", variant: "destructive" });
    }
  };

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 hero-gradient rounded-full flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">مركز باريس</h1>
              <p className="text-sm text-muted-foreground">محافظة الوادي الجديد</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-foreground hover:text-primary transition-colors${location.pathname === '/' ? ' font-bold underline' : ''}`}>الرئيسية</Link>
            <Link to="/about" className={`text-muted-foreground hover:text-primary transition-colors${location.pathname.startsWith('/about') ? ' font-bold underline' : ''}`}>عن المركز</Link>
            <Link to="/services" className={`text-muted-foreground hover:text-primary transition-colors${location.pathname.startsWith('/services') ? ' font-bold underline' : ''}`}>الخدمات</Link>
            <Link to="/news" className={`text-muted-foreground hover:text-primary transition-colors${location.pathname.startsWith('/news') ? ' font-bold underline' : ''}`}>الأخبار</Link>
            <Link to="/contact" className={`text-muted-foreground hover:text-primary transition-colors${location.pathname.startsWith('/contact') ? ' font-bold underline' : ''}`}>تواصل معنا</Link>
            {loading ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {profile?.first_name || 'المستخدم'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {profile?.first_name} {profile?.last_name}
                  </div>
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                    {user.email}
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/submit-complaint" className="cursor-pointer">
                      <MessageSquare className="w-4 h-4 ml-2" />
                      تقديم شكوى
                    </Link>
                  </DropdownMenuItem>
                  {profile?.user_type === 'employee' && (
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        <Settings className="w-4 h-4 ml-2" />
                        لوحة التحكم
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="w-4 h-4 ml-2" />
                    تسجيل خروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">تسجيل الدخول</Button>
              </Link>
            )}
          </nav>
          {/* زرار القائمة الجانبية للموبايل */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-64 max-w-full">
                <div className="flex flex-col h-full relative">
                  {/* زر الإغلاق في الأعلى */}
                  <SheetClose asChild>
                    <button className="absolute left-3 top-3 z-20 bg-white/80 rounded-full p-1 shadow hover:bg-white transition md:left-auto md:right-3 rtl:right-3 rtl:left-auto">
                      <X className="w-6 h-6 text-gray-700" />
                      <span className="sr-only">إغلاق القائمة</span>
                    </button>
                  </SheetClose>
                  <div className="flex items-center gap-3 px-4 py-4 border-b">
                    <div className="w-10 h-10 hero-gradient rounded-full flex items-center justify-center">
                      <Building className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-foreground">مركز باريس</h1>
                      <p className="text-xs text-muted-foreground">محافظة الوادي الجديد</p>
                    </div>
                  </div>
                  <nav className="flex-1 flex flex-col gap-2 p-4">
                    <SheetClose asChild>
                      <Link to="/" className={`flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted transition ${location.pathname === '/' ? 'bg-muted font-bold' : ''}`}><ExternalLink className="w-4 h-4" /> الرئيسية</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/about" className={`flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted transition ${location.pathname.startsWith('/about') ? 'bg-muted font-bold' : ''}`}><Info className="w-4 h-4" /> عن المركز</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/services" className={`flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted transition ${location.pathname.startsWith('/services') ? 'bg-muted font-bold' : ''}`}><Settings className="w-4 h-4" /> الخدمات</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/news" className={`flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted transition ${location.pathname.startsWith('/news') ? 'bg-muted font-bold' : ''}`}><MessageSquare className="w-4 h-4" /> الأخبار</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/contact" className={`flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted transition ${location.pathname.startsWith('/contact') ? 'bg-muted font-bold' : ''}`}><User className="w-4 h-4" /> تواصل معنا</Link>
                    </SheetClose>
                    <div className="border-t my-2" />
                    {loading ? (
                      <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto my-2"></div>
                    ) : user ? (
                      <>
                        <SheetClose asChild>
                          <Link to="/submit-complaint" className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted transition"><MessageSquare className="w-4 h-4" /> تقديم شكوى</Link>
                        </SheetClose>
                        {profile?.user_type === 'employee' && (
                          <SheetClose asChild>
                            <Link to="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted transition"><Settings className="w-4 h-4" /> لوحة التحكم</Link>
                          </SheetClose>
                        )}
                        <SheetClose asChild>
                          <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted transition text-red-600"><LogOut className="w-4 h-4" /> تسجيل خروج</button>
                        </SheetClose>
                      </>
                    ) : (
                      <SheetClose asChild>
                        <Link to="/login" className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted transition"><User className="w-4 h-4" /> تسجيل الدخول</Link>
                      </SheetClose>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar; 