
import React, { useState } from 'react';
import { Task } from '../types';
import Button from '../components/Button';
import { ButtonSize, ButtonVariant } from '../types';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Checkbox from '../components/Checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Icon } from '../components/Icon';

const TaskItem: React.FC<{
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ task, onToggle, onDelete }) => (
    <div className="flex items-center p-4 border-b border-border last:border-b-0">
        <Checkbox 
            id={`task-${task.id}`}
            label={task.title}
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="mr-4"
        />
        <div className="flex-1">
            <label htmlFor={`task-${task.id}`} className={`font-medium cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : 'text-primary'}`}>
                {task.title}
            </label>
            <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>
        <Button 
            variant={ButtonVariant.Ghost} 
            size={ButtonSize.Icon} 
            onClick={() => onDelete(task.id)}
            aria-label={`Delete task: ${task.title}`}
        >
            <Icon name="trash" className="h-4 w-4" />
        </Button>
    </div>
);

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Build Component Library', description: 'Create reusable Button, Input, Modal components.', completed: true },
    { id: '2', title: 'Setup Storybook', description: 'Document components with Storybook-like showcase.', completed: true },
    { id: '3', title: 'Implement Task Manager UI', description: 'Use the new components to build the app.', completed: false },
    { id: '4', title: 'Add Accessibility Features', description: 'Ensure all components are ARIA compliant.', completed: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [titleError, setTitleError] = useState('');

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      setTitleError('Title is required.');
      return;
    }
    setTitleError('');
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDesc,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setIsModalOpen(false);
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
                <CardTitle>Task Manager</CardTitle>
                <CardDescription>You've completed {completedTasks} of {totalTasks} tasks.</CardDescription>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Icon name="plus" className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          ) : (
             <div className="text-center p-8">
                 <p className="text-muted-foreground">No tasks yet. Add one to get started!</p>
             </div>
          )}
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create a New Task"
      >
        <div className="space-y-4">
          <Input
            label="Task Title"
            value={newTaskTitle}
            onChange={(e) => {
              setNewTaskTitle(e.target.value);
              if (e.target.value.trim()) setTitleError('');
            }}
            placeholder="e.g., Deploy to production"
            error={titleError}
            autoFocus
          />
          <Input
            label="Description (Optional)"
            value={newTaskDesc}
            onChange={(e) => setNewTaskDesc(e.target.value)}
            placeholder="e.g., Update the server and run tests"
          />
          <div className="flex justify-end gap-2">
            <Button variant={ButtonVariant.Outline} onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskManager;
