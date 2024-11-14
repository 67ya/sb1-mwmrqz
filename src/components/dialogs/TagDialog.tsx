import { useState } from "react";
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
import { toast } from "sonner";

interface TagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  tag?: {
    name: string;
    color: string;
  };
}

export function TagDialog({ open, onOpenChange, mode, tag }: TagDialogProps) {
  const [tagName, setTagName] = useState(tag?.name || '');
  const [tagColor, setTagColor] = useState(tag?.color || '#3b82f6');

  const handleSubmit = () => {
    if (!tagName.trim()) {
      toast.error('请输入标签名称');
      return;
    }
    
    toast.success(`${mode === 'create' ? '创建' : '更新'}标签成功`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? '新建标签' : '编辑标签'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">标签名称</Label>
            <Input
              id="name"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="请输入标签名称"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color">标签颜色</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                id="color"
                value={tagColor}
                onChange={(e) => setTagColor(e.target.value)}
                className="w-20 h-10 p-1"
              />
              <Input
                value={tagColor}
                onChange={(e) => setTagColor(e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>预览：</span>
            <span
              className="px-2 py-1 rounded-full text-white text-sm"
              style={{ backgroundColor: tagColor }}
            >
              {tagName || '标签预览'}
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600"
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}