import { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArticleDialog } from '@/components/dialogs/ArticleDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

const articles = [
  {
    id: 1,
    title: '示例文章1',
    category: '技术',
    tags: ['React', 'TypeScript'],
    status: '已发布',
    publishDate: '2024-03-20',
  },
  {
    id: 2,
    title: '示例文章2',
    category: '设计',
    tags: ['UI', 'UX'],
    status: '草稿',
    publishDate: '2024-03-19',
  },
];

export default function Articles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [articleDialog, setArticleDialog] = useState<{
    open: boolean;
    mode: 'create' | 'edit';
    article?: any;
  }>({ open: false, mode: 'create' });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    articleId?: number;
  }>({ open: false });

  const handleDelete = () => {
    toast.success('文章已删除');
    setDeleteDialog({ open: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">文章管理</h2>
          <p className="text-muted-foreground mt-2">管理所有文章内容</p>
        </div>
        <Button 
          onClick={() => setArticleDialog({ open: true, mode: 'create' })}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" /> 新建文章
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索文章..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Search className="h-4 w-4 mr-2" />
          搜索
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标题</TableHead>
              <TableHead>分类</TableHead>
              <TableHead>标签</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>发布日期</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={article.status === '已发布' ? 'default' : 'secondary'}
                  >
                    {article.status}
                  </Badge>
                </TableCell>
                <TableCell>{article.publishDate}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() =>
                      setArticleDialog({
                        open: true,
                        mode: 'edit',
                        article,
                      })
                    }
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() =>
                      setDeleteDialog({ open: true, articleId: article.id })
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ArticleDialog
        open={articleDialog.open}
        onOpenChange={(open) => setArticleDialog({ ...articleDialog, open })}
        mode={articleDialog.mode}
        article={articleDialog.article}
      />

      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              此操作将永久删除该文章，是否继续？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-blue-500 hover:bg-blue-600"
            >
              确认
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}