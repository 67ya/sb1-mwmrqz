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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ArticleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  article?: any;
}

export function ArticleDialog({ open, onOpenChange, mode, article }: ArticleDialogProps) {
  const [tags, setTags] = useState<string[]>(article?.tags || []);
  const [newTag, setNewTag] = useState("");
  const [date, setDate] = useState<Date | undefined>(
    article?.date ? new Date(article.date) : undefined
  );

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? '新建文章' : '编辑文章'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">文章标题</Label>
            <Input
              id="title"
              defaultValue={article?.title}
              placeholder="请输入文章标题"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="content">文章内容</Label>
            <Textarea
              id="content"
              defaultValue={article?.content}
              placeholder="请输入文章内容"
              className="min-h-[200px]"
            />
          </div>

          <div className="grid gap-2">
            <Label>标签</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            <Input
              placeholder="输入标签后按回车添加"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>分类</Label>
              <Select defaultValue={article?.category}>
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="技术">技术</SelectItem>
                  <SelectItem value="设计">设计</SelectItem>
                  <SelectItem value="产品">产品</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>会员等级</Label>
              <Select defaultValue={article?.memberLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="选择会员等级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">免费会员</SelectItem>
                  <SelectItem value="basic">基础会员</SelectItem>
                  <SelectItem value="premium">高级会员</SelectItem>
                  <SelectItem value="vip">VIP会员</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>单价</Label>
              <Input
                type="number"
                placeholder="请输入单价"
                defaultValue={article?.price}
              />
            </div>

            <div className="grid gap-2">
              <Label>发布日期</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "选择日期"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label>区域</Label>
              <Input
                placeholder="请输入区域"
                defaultValue={article?.region}
              />
            </div>

            <div className="grid gap-2">
              <Label>数据格式</Label>
              <Input
                placeholder="请输入数据格式"
                defaultValue={article?.dataFormat}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>状态</Label>
            <Select defaultValue={article?.status}>
              <SelectTrigger>
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">草稿</SelectItem>
                <SelectItem value="published">已发布</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}