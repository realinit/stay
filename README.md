# MyRoom - Next.js TypeScript Atomic Design

A modern Next.js application built with TypeScript and Tailwind CSS using atomic design principles.

## 🏗️ Atomic Design Structure

This project follows the atomic design methodology, organizing components into five distinct levels:

### 1. Atoms
Basic building blocks of the interface. These are the smallest functional units.

**Location:** `src/components/atoms/`
- `Button.tsx` - Reusable button component with variants
- `Input.tsx` - Form input component with validation
- `Typography.tsx` - Text components with different styles

### 2. Molecules
Simple combinations of atoms that form more complex UI components.

**Location:** `src/components/molecules/`
- `Card.tsx` - Content container with title and subtitle
- `FormField.tsx` - Input field with label and error handling
- `ButtonGroup.tsx` - Group of buttons with consistent styling

### 3. Organisms
Complex UI components composed of molecules and/or atoms.

**Location:** `src/components/organisms/`
- `Header.tsx` - Navigation header with branding and auth buttons
- `ContactForm.tsx` - Complete contact form with validation

### 4. Templates
Page-level components that define the structure and layout.

**Location:** `src/components/templates/`
- `MainLayout.tsx` - Main application layout with header and footer
- `FormLayout.tsx` - Centered form layout with consistent styling

### 5. Pages
Complete pages that use templates and organisms.

**Location:** `src/components/pages/`
- `HomePage.tsx` - Landing page with hero section and features
- `ContactPage.tsx` - Contact page with form

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd myroom
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # Atomic Design Components
│   ├── atoms/             # Basic building blocks
│   ├── molecules/         # Simple combinations
│   ├── organisms/         # Complex components
│   ├── templates/         # Page layouts
│   ├── pages/             # Complete pages
│   └── index.ts           # Main export file
```

## 🎨 Component Usage

### Importing Components

```typescript
// Import specific components
import { Button, Input, Typography } from '@/components/atoms';
import { Card, FormField } from '@/components/molecules';
import { Header, ContactForm } from '@/components/organisms';
import { MainLayout, FormLayout } from '@/components/templates';
import { HomePage, ContactPage } from '@/components/pages';

// Or import all components
import * as Components from '@/components';
```

### Using Atoms

```typescript
import { Button, Typography } from '@/components/atoms';

function MyComponent() {
  return (
    <div>
      <Typography variant="h1">Hello World</Typography>
      <Button variant="primary" size="lg" onClick={() => console.log('clicked')}>
        Click Me
      </Button>
    </div>
  );
}
```

### Using Molecules

```typescript
import { Card, FormField } from '@/components/molecules';

function MyForm() {
  return (
    <Card title="User Information" subtitle="Please fill in your details">
      <FormField
        label="Name"
        placeholder="Enter your name"
        required
      />
    </Card>
  );
}
```

### Using Organisms

```typescript
import { Header } from '@/components/organisms';

function App() {
  return (
    <Header
      title="MyApp"
      onLogin={() => console.log('login')}
      onSignup={() => console.log('signup')}
    />
  );
}
```

### Using Templates

```typescript
import { MainLayout } from '@/components/templates';

function App() {
  return (
    <MainLayout title="MyApp">
      <h1>Page Content</h1>
    </MainLayout>
  );
}
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎯 Key Features

- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Atomic Design** - Scalable component architecture
- **Next.js 14** - React framework with App Router
- **ESLint** - Code linting and formatting
- **Responsive Design** - Mobile-first approach

## 📝 Component Guidelines

### Creating New Components

1. **Atoms**: Create the smallest functional unit
2. **Molecules**: Combine 2-3 atoms
3. **Organisms**: Combine multiple molecules
4. **Templates**: Define page structure
5. **Pages**: Complete page implementations

### Best Practices

- Use TypeScript interfaces for all props
- Implement proper error handling
- Follow Tailwind CSS conventions
- Keep components focused and single-purpose
- Use consistent naming conventions
- Export components through index files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following atomic design principles
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
