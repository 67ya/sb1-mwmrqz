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
import { Plus, Edit, Trash2 } from 'lucide-react';
import { TagDialog } from '@/components/dialogs/TagDialog';
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

const tags = [
  { id: 1, name: 'React', articleCount: 15, color: '#61dafb' },
  { id: 2, name: 'Vue', articleCount: 12, color: '#42b883' },
  { id: 3, name: 'TypeScript', articleCount: 8, color: '#3178c6' },
];

export default function Tags() {
  const [tagDialog, setTagDialog] = useState<{
    open: boolean;
    mode: 'create' | 'edit';
    tag?: any;
  }>({ open: false, mode: 'create' });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    tagId?: number;
  }>({ open: false });

  const handleDelete = () => {
    toast.success('标签已删除');
    setDeleteDialog({ open: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">标签管理</h2>
          <p className="text-muted-foreground mt-2">管理文章标签</p>
        </div>
        <Button 
          onClick={() => setTagDialog({ open: true, mode: 'create' })}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" /> 新建标签
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标签名称</TableHead>
              <TableHead>文章数量</TableHead>
              <TableHead>颜色</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <span
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: tag.color }}
                    />
                    {tag.name}
                  </div>
                </TableCell>
                <TableCell>{tag.articleCount}</TableCell>
                <TableCell>
                  <code className="px-2 py-1 bg-muted rounded">{tag.color}</code>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() =>
                      setTagDialog({
                        open: true,
                        mode: 'edit',
                        tag,
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
                      setDeleteDialog({ open: true, tagId: tag.id })
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

      <TagDialog
        open={tagDialog.open}
        onOpenChange={(open) => setTagDialog({ ...tagDialog, open })}
        mode={tagDialog.mode}
        tag={tagDialog.tag}
      />

      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              此操作将永久删除该标签，是否继续？
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