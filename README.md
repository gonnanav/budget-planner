# Even App

A personal monthly budget planning application that stores data locally in the browser.

**Live App:** [even.gonnanav.com](https://even.gonnanav.com/)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/gonnanav/budget-planner.git
   cd budget-planner
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:5173](http://localhost:5173)

## CI/CD Pipeline

This project uses GitHub Actions for automated validation and Vercel for deployment.

### Automated Checks

Every push to the `main` branch triggers:

- Prettier formatting validation
- ESLint code quality checks
- TypeScript type checking
- Unit test execution
- Vite build validation
