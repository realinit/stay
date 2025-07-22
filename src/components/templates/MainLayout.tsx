import React from 'react';
import Header from '../organisms/Header';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  onLogin?: () => void;
  onSignup?: () => void;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'MyRoom',
  onLogin,
  onSignup,
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <Header
        title={title}
        onLogin={onLogin}
        onSignup={onSignup}
      />
      
      <main className="pt-20">
        {children}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className=" mx-auto px-6 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 {title}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 