export {};

// Create a type for the roles
export type Roles = "admin" | "moderator";

// Extend the CustomJwtSessionClaims interface to include the role in metadata
// This allows us to access the role from the session claims
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
