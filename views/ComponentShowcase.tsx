
import React, { useState } from 'react';
import Button from '../components/Button';
import { ButtonVariant, ButtonSize } from '../types';
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import Modal from '../components/Modal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Icon } from '../components/Icon';

const ShowcaseSection: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <Card className="mb-8">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

const ComponentShowcase: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Component Showcase</h1>
        <p className="text-muted-foreground mt-2">A live demonstration of the custom component library.</p>
      </div>

      <ShowcaseSection title="Buttons" description="A versatile button component with multiple variants, sizes, and states.">
        <div className="space-y-4">
            <div>
                <h3 className="font-semibold mb-2">Variants</h3>
                <div className="flex flex-wrap gap-2">
                    <Button variant={ButtonVariant.Primary}>Primary</Button>
                    <Button variant={ButtonVariant.Secondary}>Secondary</Button>
                    <Button variant={ButtonVariant.Destructive}>Destructive</Button>
                    <Button variant={ButtonVariant.Outline}>Outline</Button>
                    <Button variant={ButtonVariant.Ghost}>Ghost</Button>
                </div>
            </div>
            <div>
                <h3 className="font-semibold mb-2">Sizes</h3>
                <div className="flex items-center flex-wrap gap-2">
                    <Button size={ButtonSize.Small}>Small</Button>
                    <Button size={ButtonSize.Default}>Default</Button>
                    <Button size={ButtonSize.Large}>Large</Button>
                </div>
            </div>
            <div>
                <h3 className="font-semibold mb-2">With Icon</h3>
                <div className="flex flex-wrap gap-2">
                    <Button><Icon name="plus" className="mr-2 h-4 w-4" /> Add Item</Button>
                    <Button variant={ButtonVariant.Outline} size={ButtonSize.Icon}><Icon name="trash" className="h-4 w-4" /></Button>
                </div>
            </div>
             <div>
                <h3 className="font-semibold mb-2">States</h3>
                <div className="flex flex-wrap gap-2">
                    <Button loading>Loading...</Button>
                    <Button disabled>Disabled</Button>
                </div>
            </div>
        </div>
      </ShowcaseSection>
      
      <ShowcaseSection title="Inputs" description="A styled and accessible input field with label and error message support.">
        <div className="max-w-md space-y-4">
            <Input label="Your Name" placeholder="John Doe" />
            <Input label="Email Address" type="email" placeholder="john.doe@example.com" error="Please enter a valid email." />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Input label="Disabled Input" placeholder="Can't touch this" disabled/>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Checkbox" description="A custom-styled checkbox component.">
        <div className="space-y-2">
            <Checkbox id="showcase-check" label="Accept terms and conditions" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
            <Checkbox id="showcase-check-2" label="This is another checkbox" />
            <Checkbox id="showcase-check-3" label="This one is checked by default" defaultChecked />
            <Checkbox id="showcase-check-4" label="This one is disabled" disabled />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Card" description="A container component for grouping related content.">
        <Card className="max-w-md">
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>This is a description inside the card header.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This is the main content area of the card. You can place any elements you like in here.</p>
            </CardContent>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="Modal" description="An accessible modal dialog for displaying information or forms.">
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        <Modal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
        >
            <p className="text-muted-foreground">This is the content of the modal. Press Escape or click the backdrop to close.</p>
            <div className="flex justify-end gap-2 mt-4">
                <Button variant={ButtonVariant.Outline} onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
            </div>
        </Modal>
      </ShowcaseSection>
    </div>
  );
};

export default ComponentShowcase;
