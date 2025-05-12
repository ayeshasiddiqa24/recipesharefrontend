# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Recipe Sharing Platform - Frontend
This is the React frontend for the Recipe Sharing Platform. It provides a responsive
user interface for viewing, creating, and managing recipes, with image uploads and
secure user authentication.
## Features
- User login and registration
- View public and personal recipes
- Upload recipes with image (to S3 via backend)
- Delete own recipes
- Responsive and modern UI using Tailwind CSS
- Deployed on AWS Amplify with CI/CD from GitHub
## Technology Stack
- React.js (React Router v6)
- Tailwind CSS
- Axios (for API requests)
- AWS Amplify (Hosting)
- Route 53 (Custom Domain)
## Installation (Local Development)
1. Clone the repo
```bash
git clone https://github.com/yourname/recipe-frontend.git
cd recipe-frontend
```
2. Install dependencies
```bash
npm install
```
3. Set environment variables
Create a `.env` file:
```env
REACT_APP_API_URL=http://<backend-ec2-ip>:5000/api
```
4. Run the development server
```bash
npm start
```
## Deployment Guide (AWS Amplify)
### Prerequisites
- GitHub repository
- Backend running on EC2
### Steps
1. Go to AWS Amplify -> Host Web App
2. Connect your GitHub repo
3. Set build settings:
```yaml
version: 1
frontend:
 phases:
 preBuild:
 commands:
 - npm ci
 build:
 commands:
 - npm run build
 artifacts:
 baseDirectory: build
 files:
 - '**/*'
 cache:
 paths:
 - node_modules/**/*
```
4. Add environment variable:
```
REACT_APP_API_URL=http://<backend-ec2-ip>:5000/api
```
5. Deploy. Your app will be available at a public HTTPS Amplify URL.
## Optional: Custom Domain
- Add your domain in AWS Route 53
- Go to Amplify -> Domain management -> Add custom domain
- Use subdomain (e.g. `app.ayeshanuswa.com`)
