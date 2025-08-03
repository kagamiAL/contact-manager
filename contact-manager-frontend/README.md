# Contact Manager Frontend

A modern, sleek contact management application built with Next.js, TypeScript, and TailwindCSS. This frontend integrates seamlessly with your Spring Boot backend to provide a complete contact management solution.

## Features

### 🔐 Authentication

- **Login & Registration**: Secure user authentication with JWT tokens
- **Auto-redirect**: Automatic redirection based on authentication status
- **Persistent sessions**: Stay logged in across browser sessions

### 👥 Contact Management

- **CRUD Operations**: Create, read, update, and delete contacts
- **Essential Contact Information**: Store names, zip codes, and dates of birth with automatic age calculation
- **Visual Contact Cards**: Clean, intuitive contact display with avatars showing initials

### 🔍 Advanced Search

- **Multiple Search Types**: Search by first name, last name, or full name
- **Real-time Results**: Instant search results as you type
- **Clear Search**: Easy search reset functionality

### 📄 Pagination

- **Efficient Data Loading**: Paginated contact lists for better performance
- **Customizable Page Sizes**: Adjust how many contacts to display per page
- **Smart Navigation**: Easy navigation between pages with page numbers

### 🌓 Dark/Light Mode

- **Theme Toggle**: Switch between light and dark themes
- **System Preference**: Respects user's system theme preference
- **Persistent Theme**: Remembers your theme choice

### 🎨 Modern UI/UX

- **Clean Design**: Modern, minimalist interface
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Subtle transitions and hover effects
- **Toast Notifications**: User-friendly success and error messages

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **UI Components**: Custom components with Headless UI

## Getting Started

### Prerequisites

1. Node.js (version 18 or higher)
2. Your Spring Boot backend running on `http://localhost:8080`

### Installation

1. **Clone and setup** (if not already done):

   ```bash
   npm install
   ```

2. **Create environment file**:
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

## Environment Configuration

The application uses the following environment variables:

| Variable              | Description     | Default                 |
| --------------------- | --------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8080` |

## Application Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── auth/              # Authentication pages
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── dashboard/         # Main dashboard page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page with redirects
├── components/            # Reusable components
│   ├── contacts/          # Contact-specific components
│   │   ├── ContactCard.tsx
│   │   ├── ContactForm.tsx
│   │   └── SearchBar.tsx
│   ├── layout/            # Layout components
│   │   └── Header.tsx
│   ├── providers/         # Context providers
│   │   └── ThemeProvider.tsx
│   └── ui/                # Base UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Pagination.tsx
└── lib/                   # Utilities and configuration
    ├── api.ts             # API client and endpoints
    ├── store.ts           # Zustand stores
    ├── types.ts           # TypeScript interfaces
    └── utils.ts           # Utility functions
```

## API Integration

The application integrates with your Spring Boot backend using the following endpoints:

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/signIn` - User login

### Contacts

- `GET /api/contacts/all` - Get all contacts (paginated)
- `POST /api/contacts/add` - Add new contacts
- `POST /api/contacts/update` - Update existing contacts
- `DELETE /api/contacts/delete` - Delete contacts
- `GET /api/contacts/searchFirstName` - Search by first name
- `GET /api/contacts/searchLastName` - Search by last name
- `GET /api/contacts/searchFullName` - Search by full name

## Key Features in Detail

### Authentication Flow

1. Users land on the login page if not authenticated
2. Email-based authentication with secure password validation
3. JWT token stored for session persistence
4. Automatic logout on token expiration

### Contact Management

- **Add Contacts**: Modal form with first name, last name, zip code, and date of birth
- **Edit Contacts**: Pre-populated form for updates with optional field editing
- **Delete Contacts**: One-click deletion with confirmation
- **Age Calculation**: Automatic age calculation from date of birth
- **Search**: Multiple search criteria with instant results

### Responsive Design

- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

## Customization

### Theming

The application uses CSS variables for theming. You can customize colors in `globals.css`:

```css
:root {
  --toast-bg: #ffffff;
  --toast-color: #1f2937;
  --toast-border: #e5e7eb;
}

.dark {
  --toast-bg: #374151;
  --toast-color: #f9fafb;
  --toast-border: #4b5563;
}
```

### API Configuration

Update the API endpoints in `src/lib/api.ts` if your backend URLs differ.

## Building for Production

```bash
npm run build
npm start
```

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
