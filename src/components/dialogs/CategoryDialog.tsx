import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  category?: {
    name: string;
    description: string;
    slug: string;
  };
}

export function CategoryDialog({ open, onOpenChange, mode, category }: CategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? '新建分类' : '编辑分类'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">分类名称</Label>
            <Input
              id="name"
              defaultValue={category?.name}
              placeholder="请输入分类名称"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slug">分类标识</Label>
            <Input
              id="slug"
              defaultValue={category?.slug}
              placeholder="请输入分类标识（英文）"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">分类描述</Label>
            <Textarea
              id="description"
              defaultValue={category?.description}
              placeholder="请输入分类描述"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button type="submit">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}