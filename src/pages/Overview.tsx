import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Users,
  FileText,
  Tags,
  FolderTree,
  TrendingUp,
  Eye
} from 'lucide-react';

const stats = [
  {
    title: '总用户数',
    value: '1,234',
    icon: Users,
    trend: '+12%',
  },
  {
    title: '文章数量',
    value: '567',
    icon: FileText,
    trend: '+23%',
  },
  {
    title: '标签数量',
    value: '89',
    icon: Tags,
    trend: '+5%',
  },
  {
    title: '分类数量',
    value: '45',
    icon: FolderTree,
    trend: '+8%',
  },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">总览</h2>
        <p className="text-muted-foreground">系统整体数据概览</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  {stat.trend} 较上月
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>最近访问</CardTitle>
            <CardDescription>过去7天的访问趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              图表区域
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>热门文章</CardTitle>
            <CardDescription>访问量最高的文章</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">示例文章标题 {i}</span>
                  <span className="ml-auto text-sm text-muted-foreground">
                    {1234 - i * 100} 次访问
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}