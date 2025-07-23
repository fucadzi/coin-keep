# Coin Keep

Demo app with HeroUI data table with infinte scroll that shows mock list of balances in various currencies.
Site: https://coin-keep.netlify.app/

Login data:
- Member:
  - Email: member@valid.email
  - Password: Member123!
  - OTP: 151588
- Partner:
  - Email: partner@valid.email
  - Password: Partner123!
  - OTP: 262699

## Technologies Used

- [React](https://react.dev/)
- [Next.js](https://nextjs.org/docs/getting-started)
- [HeroUI v2](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)

## Getting started

### Installation

1. **Clone repository**

```bash
git clone git@github.com:fucadzi/coin-keep.git
cd coin-keep
```

2. **Install packages**

```bash
npm install
```

3. **Create .env.local file with API base URL**

```js
NEXT_PUBLIC_API_URL=http://your-base-url
```

4. **Run the development server**

```bash
npm run dev
```

## Testing

The project uses Jest and React Testing Library for testing. Tests are located next to their components in `__tests__` directories.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Code Quality Tools

This project uses several tools to maintain code quality:

### Auto-formatting Setup

The project uses Prettier for code formatting and ESLint for code quality. Here's how to set it up in your editor:

1. **VS Code Setup**
   - Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   - Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   - Add this to your VS Code settings.json:
     ```json
     {
       "editor.formatOnSave": true,
       "editor.defaultFormatter": "esbenp.prettier-vscode",
       "editor.codeActionsOnSave": {
         "source.fixAll.eslint": true
       }
     }
     ```

2. **Git Hooks**
   The project uses Husky to run formatting checks before commits:
   - Prettier runs on staged files
   - ESLint checks for code quality issues
   - These run automatically when you commit

3. **Manual Commands**
   ```bash
   # Format all files
   npm run format:all

   # Check formatting without fixing
   npm run format:check

   # Run ESLint with auto-fix
   npm run lint

   # Run both lint and format
   npm run lint-format
   ```


## Architectural decisions

### Project Structure
- `app/` - app router pages and layouts
- `components/` - UI components (in case of a bigger project components could be moved to corresponding page folders)
- `lib/` - Core application logic
  - `api/` - API client and services
  - `store/` - Zustand state management
- `types/` - TypeScript type definitions
- `styles/` - Global styles and Tailwind config

### State Management
Despite the project's small size, global state management with Zustand was chosen to handle shared authentication state across components and manage interdependent data (balances requiring currency information) while avoiding unnecessary refetches during navigation.

This project uses Zustand for state management due to:
- Minimal boilerplate and simple API (similar to Pinia/Vue)
- Built-in TypeScript support
- Small bundle size (~1KB)
- Easy integration with React DevTools

### API Layer
- Centralized API client chosen for simplicity and shared error handling across a small number of related endpoints
- Service-based architecture for domain-specific API calls
- Mock data and mock login service for demonstration purposes
- TypeScript interfaces for API responses

### Component Design
- Business logic isolated in page components for better testing and reusability of UI components
- Presentational components in `components/`
- Shared types for domain models and API responses
- Dark mode support with next-themes
- Considered setting primary theme color based on user type, meanwhile settled on user type indication in menu
