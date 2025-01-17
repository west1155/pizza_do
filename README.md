# Pizza Project

Welcome to the **Pizza Project**! This repository contains the codebase for a modern e-commerce pizza store built with cutting-edge web technologies. This project covers everything from product display and user authentication to order management and payment integration.
You can find the project on 
---

## 📚 What’s Included in the Project?

1. **Advanced Product Filtering**: Full-featured server-side rendering (SSR) filtering with parameter storage in the URI for seamless navigation.
2. **Product Management**: Display products and add them to the shopping cart.
3. **User Authentication**: Sign up and log in via email/password, GitHub, or Google. (in development).
4. **Account Verification**: Confirm accounts through email verification. (in development).
5. **Profile Editing**: Update user profiles easily. (in development).
6. **Payment Integration**: Purchase products using Yookassa payment gateway. (in development).
7. **Dynamic Product Pages**: View products in modal windows or dedicated pages using Parallel Routes.
8. **Email Notifications**: Automatically send emails for:
    - Registration
    - Order creation
    - Successful payment
   (in development).
9. **Deployment with Vercel**: Host the database and deploy the application seamlessly.
10. **Client-Server Interaction**: Understand how client and server components work through real-world examples (not just documentation).

---

## ⚙️ Technology Stack

This project is built with the following technologies:

1. **Next.js**: Features such as Parallel Routes, Group Routes, Server Actions, and API handling.
2. **TypeScript**: For robust and type-safe development.
3. **TailwindCSS + ShadCN**: Modern styling for a responsive and visually appealing UI.
4. **Prisma + PostgreSQL**: Database modeling and management.
5. **NextAuth**: Secure and flexible authentication.
6. **React Hook Form + Zod**: Form handling and validation.
7. **Zustand**: Lightweight state management.
8. **react-use**: Useful React hooks for enhanced functionality.
9. **nextjs-toploader**: Display a progress bar during navigation.
10. **react-hot-toast**: For notifications and alerts.
11. **react-insta-stories**: Add engaging stories to your app.
12. **lucide-react**: Elegant icons for your interface.
13. **Resend**: Simplified email sending.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **PostgreSQL**
- Yookassa account for payment integration (optional)
- Vercel account for deployment (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pizza-project.git
   cd pizza-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add your environment variables (see `.env.example` for reference).

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

---

## 🛠 Features

- **Dynamic Filtering**: Sort and filter products with server-side efficiency.
- **Secure Payments**: Complete transactions via Yookassa.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Real-time Notifications**: Toasts and email updates.
- **Modern UI/UX**: Built with TailwindCSS and ShadCN for a sleek interface.

---

## 🧑‍💻 Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

---

## 🌟 Acknowledgments

A big thank you to all the contributors and supporters of this project. Happy coding and enjoy your pizza!

