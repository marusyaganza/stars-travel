# Star Wars Chatbot Component

A React component that replicates the Star Wars chatbot functionality from the original HTML file. This component features a chat interface with Master Yoda and C-3PO characters, complete with their unique personalities and responses.

## Features

- **Authentication-Based Access**: Only registered users can access the full chat functionality
- **Character Switching**: Toggle between Master Yoda and C-3PO (authenticated users only)
- **Minimizable Interface**: Click the header to minimize/maximize the chatbot
- **Realistic Responses**: Each character has unique response patterns based on message content
- **Typing Indicators**: Shows typing animation while generating responses
- **Message History**: Maintains separate chat histories for each character
- **Login Integration**: Unauthenticated users see a login prompt with direct link to signin page
- **Responsive Design**: Mobile-friendly with responsive breakpoints
- **Smooth Animations**: CSS animations for messages and interactions

## Installation

The component is already included in your project. Simply import and use it:

```tsx
import StarWarsChatbot from '@/components/StarWarsChatbot';

// Use in your component
<StarWarsChatbot />
```

## Usage

### Basic Usage

```tsx
import StarWarsChatbot from '@/components/StarWarsChatbot';

function MyPage() {
  return (
    <div>
      <h1>My Star Wars Page</h1>
      <StarWarsChatbot />
    </div>
  );
}
```

### With Demo Page

For a complete Star Wars themed page with the chatbot, use the demo component:

```tsx
import StarWarsChatbotDemo from '@/components/StarWarsChatbot/StarWarsChatbotDemo';

function App() {
  return <StarWarsChatbotDemo />;
}
```

## Component Props

The component doesn't accept any props - it's self-contained with all functionality built-in.

## Authentication Behavior

The chatbot automatically checks the user's authentication status and displays different content based on their login state:

### For Authenticated Users
- Full access to chat functionality
- Character selection between Master Yoda and C-3PO
- Complete message history and interaction capabilities
- All original chatbot features are available

### For Unauthenticated Users
- Shows a welcome message from both characters explaining the requirement
- Displays a prominent "Sign In to Continue" button
- Links directly to the `/signin` page
- Chat functionality is disabled until authentication

### Loading State
- Shows "Checking authentication..." while verifying user status
- Prevents interaction until authentication check is complete

## Character Personalities

### Master Yoda 🐸
- **Greetings**: Welcomes users with Force-related wisdom
- **Force Questions**: Provides guidance about the Force and Jedi teachings
- **Wisdom**: Shares famous Yoda quotes and philosophical advice
- **Encouragement**: Motivates users to learn and grow
- **Default**: Mysterious, contemplative responses

### C-3PO 🤖
- **Greetings**: Polite, formal introductions with protocol awareness
- **Protocol**: Explains proper procedures and etiquette
- **Worry**: Expresses concern and caution about potential problems
- **Helpful**: Offers assistance with enthusiasm
- **Default**: Polite confusion with references to his programming

## Styling

The component uses CSS modules with the following key classes:

- `.chatbot` - Main container
- `.chatbotHeader` - Header with minimize functionality
- `.characterSelector` - Character dropdown
- `.chatbotMessages` - Message container
- `.message` - Individual message styling
- `.userMessage` - User message styling
- `.yodaMessage` - Yoda message styling
- `.c3poMessage` - C-3PO message styling
- `.typingIndicator` - Typing animation
- `.chatbotInput` - Input area

## Responsive Design

The component automatically adjusts for mobile devices:
- Desktop: 350px width, 500px height
- Mobile: 320px width, 500px height
- Minimized: 200px width, 60px height (desktop) / 180px width (mobile)

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS custom properties (CSS variables)
- CSS animations and transitions

## Dependencies

- React 18+ with hooks
- TypeScript (for type definitions)
- CSS modules support

## Customization

To customize the component:

1. **Colors**: Modify the CSS variables in the CSS module file
2. **Responses**: Edit the `characterResponses` object in the component
3. **Styling**: Override CSS classes or modify the CSS module
4. **Animations**: Adjust timing and effects in the CSS animations

## Example Customization

```tsx
// Add new character responses
const customResponses = {
  yoda: {
    ...characterResponses.yoda,
    custom: ["Your custom response here"]
  }
};
```

## License

This component is part of your project and follows the same licensing terms.
