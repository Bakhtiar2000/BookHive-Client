# BookHive - A Book Selling E-Commerce Website

## Features
### General
- **Responsive Design**: Fully responsive for both mobile and desktop users.
- **Role-Based User Access**:
  - **Buyer**: Browse, purchase, and manage wishlist and cart.
  - **Seller**: Add, edit, and manage products through a personalized dashboard.
  - **Admin**: Manage users, including promoting roles and deleting users.

### Pages
- **Home Page**:
  - Hero section with a welcoming message.
  - Featured products and categories.
  - Testimonials, FAQs, and contact information.
- **Products Page**:
  - Filter and sort products by price, category, and brand.
  - Search functionality by product name.
  - Detailed product pages.
- **About Page**:
  - Description of the business.
- **Contact Page**:
  - Contact form with fields for name, email, and message.

### Buyer Features
- **Wishlist Management**: Add and remove products.
- **Shopping Cart**: Add, update, and remove products.

### Seller Features
- **Dashboard**:
  - Add new products.
  - View, edit, or delete existing products.

### Admin Features
- **Dashboard**:
  - View all users.
  - Promote users (e.g., Buyer to Seller).
  - Delete any user.

---

## How to Run the Application Locally
### Prerequisites
1. Node.js (>= 14.x)
2. npm or yarn
3. Backend server running (refer to backend repository documentation).

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/bookhive-frontend.git
   cd bookhive-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` File**:
   Create a `.env` file in the root directory and add your environment variables:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   ```

4. **Start the Development Server**:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## User Credentials
### Buyer
- **Email**: user@gmail.com
- **Password**: User111**

### Seller
- **Email**: rakib@gmail.com
- **Password**: Rakib111**

### Admin
- **Email**: admin@bookhive.com
- **Password**: Admin111**

---

## Deployment
The application is deployed live at: [BookHive Live Link](https://your-live-app-url.vercel.app)

---

## Technologies Used
### Frontend
- React.js
- TailwindCSS for styling
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB
- Firebase Authentication
- JWT for secure routes

---

## Contribution
Feel free to fork the repository and submit pull requests for new features or bug fixes!

---

## License
This project is licensed under the MIT License.
