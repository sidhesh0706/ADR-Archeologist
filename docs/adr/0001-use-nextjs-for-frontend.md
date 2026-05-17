# ADR-001: Use Next.js for frontend

Date: ~2020
Status: Accepted
Category: infrastructure
Confidence: 95%

## Context

The need for a fast and scalable frontend framework to handle a large number of requests. The presence of next.config.js and next in the dependencies in package.json indicates the use of Next.js for frontend.

## Decision

Next.js was chosen as the frontend framework due to its performance and scalability features.

## Consequences

### Positive

- Improved performance
- Scalability

### Negative

- Steep learning curve

## Alternatives Considered

- **React**: Not chosen due to lack of built-in server-side rendering

## Evidence trail

- `next.config.js`
- `package.json`
