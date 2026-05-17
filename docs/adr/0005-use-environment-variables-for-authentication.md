# ADR-005: Use environment variables for authentication

Date: ~2020
Status: Accepted
Category: auth
Confidence: 80%

## Context

The need for a secure and flexible authentication mechanism to protect sensitive data. The use of environment variables for authentication in server.ts indicates the use of environment variables for authentication.

## Decision

Environment variables were chosen as the authentication mechanism due to their simplicity and flexibility.

## Consequences

### Positive

- Simplicity
- Flexibility

### Negative

- Limited security

## Alternatives Considered

- **OAuth**: Not chosen due to increased complexity

## Evidence trail

- `server.ts`
