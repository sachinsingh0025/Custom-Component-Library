
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Destructive = 'destructive',
  Outline = 'outline',
  Ghost = 'ghost',
}

export enum ButtonSize {
  Default = 'default',
  Small = 'sm',
  Large = 'lg',
  Icon = 'icon',
}
