
import React, { useState } from 'react';
import TaskManager from './views/TaskManager';
import ComponentShowcase from './views/ComponentShowcase';
import { Icon } from './components/Icon';

type View = 'app' | 'showcase';

const App: React.FC = () => {
  const [view, setView] = useState<View>('app');

  const NavButton: React.FC<{
    currentView: View;
    targetView: View;
    onClick: (view: View) => void;
    icon: 'tasks' | 'components';
    children: React.ReactNode;
  }> = ({ currentView, targetView, onClick, icon, children }) => {
    const isActive = currentView === targetView;
    return (
      <button
        onClick={() => onClick(targetView)}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        }`}
      >
        <Icon name={icon} className="h-4 w-4" />
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-secondary text-primary-foreground font-sans">
      <header className="sticky top-0 z-40 w-full border-b bg-card backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Icon name="logo" className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">ComponentCraft</h1>
          </div>
          <nav className="flex items-center gap-2 rounded-lg border bg-muted p-1">
            <NavButton
              currentView={view}
              targetView="app"
              onClick={setView}
              icon="tasks"
            >
              Task Manager
            </NavButton>
            <NavButton
              currentView={view}
              targetView="showcase"
              onClick={setView}
              icon="components"
            >
              Showcase
            </NavButton>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        {view === 'app' ? <TaskManager /> : <ComponentShowcase />}
      </main>

       <footer className="py-6 md:px-8 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by a world-class senior frontend React engineer.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
