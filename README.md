# Budget Planner

A personal monthly budget planning application that stores data locally in the browser.

**Live App:** [https://budget-planner-gamma-flax.vercel.app/](https://budget-planner-gamma-flax.vercel.app/)

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

   Navigate to [http://localhost:3000](http://localhost:3000)

## CI/CD Pipeline

This project uses GitHub Actions for automated validation and Vercel for deployment.

### Automated Checks

Every push to the `main` branch triggers:

- Prettier formatting validation
- ESLint code quality checks
- TypeScript type checking
- Unit test execution
- Next.js build validation

### Vercel Deployment

1. **Connect your GitHub repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

2. **Automatic deployments**
   - Every successful CI run triggers a production deployment
   - Failed CI runs prevent deployment

## Storybook

This project includes Storybook for component development and documentation.

### Running Storybook Development Server

```bash
npm run storybook
```

This will start the Storybook development server on [http://localhost:6006](http://localhost:6006)
