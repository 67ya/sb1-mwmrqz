import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  FolderTree, 
  Tags, 
  Users,
  LogOut
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: '总览', path: '/dashboard' },
  { icon: FileText, label: '文章管理', path: '/dashboard/articles' },
  { icon: FolderTree, label: '分类管理', path: '/dashboard/categories' },
  { icon: Tags, label: '标签管理', path: '/dashboard/tags' },
  { icon: Users, label: '用户管理', path: '/dashboard/users' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-card border-r">
      <div className="p-6">
        <h1 className="text-2xl font-bold">管理后台</h1>
      </div>
      <nav className="space-y-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                location.pathname === item.path
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-4 w-full px-6">
        <button className="flex items-center text-destructive hover:text-destructive/80 transition-colors">
          <LogOut className="mr-3 h-4 w-4" />
          退出登录
        </button>
      </div>
    </div>
  );
}