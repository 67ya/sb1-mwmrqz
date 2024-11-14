import { useState } from 'react';
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
import { Plus, Edit, Trash2 } from 'lucide-react';
import { CategoryDialog } from '@/components/dialogs/CategoryDialog';
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

const categories = [
  { id: 1, name: '技术', slug: 'tech', articleCount: 25, description: '技术相关文章' },
  { id: 2, name: '设计', slug: 'design', articleCount: 18, description: '设计相关文章' },
  { id: 3, name: '产品', slug: 'product', articleCount: 12, description: '产品相关文章' },
];

export default function Categories() {
  const [categoryDialog, setCategoryDialog] = useState<{
    open: boolean;
    mode: 'create' | 'edit';
    category?: any;
  }>({ open: false, mode: 'create' });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    categoryId?: number;
  }>({ open: false });

  const handleDelete = () => {
    toast.success('分类已删除');
    setDeleteDialog({ open: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">分类管理</h2>
          <p className="text-muted-foreground mt-2">管理文章分类</p>
        </div>
        <Button onClick={() => setCategoryDialog({ open: true, mode: 'create' })}>
          <Plus className="mr-2 h-4 w-4" /> 新建分类
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>分类名称</TableHead>
              <TableHead>标识</TableHead>
              <TableHead>文章数量</TableHead>
              <TableHead>描述</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category.articleCount}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() =>
                      setCategoryDialog({
                        open: true,
                        mode: 'edit',
                        category,
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
                      setDeleteDialog({ open: true, categoryId: category.id })
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

      <CategoryDialog
        open={categoryDialog.open}
        onOpenChange={(open) =>
          setCategoryDialog({ ...categoryDialog, open })
        }
        mode={categoryDialog.mode}
        category={categoryDialog.category}
      />

      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              此操作将永久删除该分类，是否继续？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>确认</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}