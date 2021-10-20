## Recipe Browser

This is a personal project created with Next.js, integrating with a Node backend and MongoDB database. I also used Redux Toolkit for state management, NextAuth to provide OAuth 2.0 Authentication, and Styled-Components for CSS.

#### I learned a lot making this, and had a bit of fun too. I primarily focused on:

- Making the app easily extendable
- Using hooks and functional components
- Smooth performance

## Extendable design patterns

### I used a pattern of wrapping simple, dumb components inside smart components that handled state and data fetching.

The dumb components are easily reusable when needed, while the smart components are tailored to each use case.

Using hooks and storing data in Redux avoided the need for prop drilling, and makes adding new data-consuming components incredibly easy.

This pattern also seemed to create structure and code that was concise and easy to understand.

## Performance and avoiding re-renders

### Another benefit of this component design is it allows for memoization and minimizes unnecessary re-renders

Wherever possible dumb components are memoized and smart components only recieve the exact data they need. Because of this, only the parts of the page that are actively changing re-render, keeping the user experience incredibly smooth.

The recipe results are also both paginated and virtualized, ensuring resources are used only for exactly the information needed. This ensures infinte scroll is seamless and smooth even through thousands of results.
