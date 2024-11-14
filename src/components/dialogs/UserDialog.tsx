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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit' | 'permission';
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

export function UserDialog({ open, onOpenChange, mode, user }: UserDialogProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(user?.avatar);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    toast.success(
      mode === 'create' 
        ? '用户创建成功' 
        : mode === 'edit' 
        ? '用户信息已更新' 
        : '用户权限已更新'
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? '新建用户' : mode === 'edit' ? '编辑用户信息' : '修改用户权限'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {mode !== 'permission' && (
            <>
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarPreview} />
                  <AvatarFallback>{user?.name?.[0] || '用户'}</AvatarFallback>
                </Avatar>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="avatar">头像</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">用户名</Label>
                <Input
                  id="name"
                  defaultValue={user?.name}
                  placeholder="请输入用户名"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                  placeholder="请输入邮箱"
                />
              </div>
              {mode === 'create' && (
                <div className="grid gap-2">
                  <Label htmlFor="password">密码</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="请输入密码"
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="phone">手机号码</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="请输入手机号码"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">所属部门</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择部门" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">技术部</SelectItem>
                    <SelectItem value="product">产品部</SelectItem>
                    <SelectItem value="design">设计部</SelectItem>
                    <SelectItem value="operation">运营部</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">个人简介</Label>
                <Textarea
                  id="bio"
                  placeholder="请输入个人简介"
                  rows={3}
                />
              </div>
            </>
          )}
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>用户角色</Label>
              <Select defaultValue={user?.role}>
                <SelectTrigger>
                  <SelectValue placeholder="选择角色" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">管理员</SelectItem>
                  <SelectItem value="editor">编辑</SelectItem>
                  <SelectItem value="author">作者</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === 'permission' && (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>文章管理权限</Label>
                    <div className="text-sm text-muted-foreground">
                      允许创建和管理文章
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>用户管理权限</Label>
                    <div className="text-sm text-muted-foreground">
                      允许管理其他用户
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>数据统计权限</Label>
                    <div className="text-sm text-muted-foreground">
                      允许查看系统数据统计
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleSubmit}
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}